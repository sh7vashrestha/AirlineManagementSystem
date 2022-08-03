const db = require('../util/database');

module.exports = class passenger{
    static passengerInfoAdd(a){
        const zip = parseInt(a.zip);
        db.execute( `SELECT * from passenger where name ='${a.name}' AND city='${a.city}' AND state='${a.state}' AND zip='${zip}' AND gender='${a.gender}' AND dob='${a.dob}' AND email ='${a.email}' AND contact ='${a.contact}'`)
        .then( ([result, fieldData])=>{
            if(result.length === 0){
                db.query(`INSERT INTO passenger(name, city, state, zip, gender, dob, email, contact) VALUES ('${a.name}','${a.city}','${a.state}',${zip},'${a.gender}','${a.dob}','${a.email}','${a.contact}')`);
            }
        });
    }

    static TicketInfoAdd(a)
    {
        const zip = parseInt(a.zip);
        //Seat update
        // Seat eauta matra ahuda string ma ahuxa
        // if(typeof(a.seat)==='string'){
        //     db.query(`UPDATE seat SET seat_status ='o' WHERE seat_num ='${a.seat}'`);
        //     db.query(`UPDATE flight SET empty_seats=empty_seats-1 WHERE f_id ='${a.f_id}'`);
        // }
        // else{
        // for(let s of a.seat){
        //     db.query(`UPDATE seat SET seat_status ='o' WHERE seat_num ='${s}'`);
        //     db.query(`UPDATE flight SET empty_seats=empty_seats-1 WHERE f_id ='${a.f_id}'`);
        // }}
        // Ticket added
        db.execute(`SELECT * from passenger where name ='${a.name}' AND city='${a.city}' AND state='${a.state}' AND zip='${zip}' AND gender='${a.gender}' AND dob='${a.dob}' AND email ='${a.email}' AND contact ='${a.contact}'`)
        .then(([rows, fieldData])=>{
                const p_id = rows[0].p_id;
                db.execute(`SELECT * from ticket where p_id='${p_id}' AND f_id='${a.f_id}'`)
                .then(([r, f])=>{
                    if(r.length == 0){ db.query(`INSERT INTO ticket(p_id, f_id) VALUES ('${p_id}','${a.f_id}')`);}
                });
        });
        //Ticket Added Without checking
        // setTimeout(() => {db.execute(`SELECT * from passenger where name ='${a.name}' AND city='${a.city}' AND state='${a.state}' AND zip='${zip}' AND gender='${a.gender}' AND dob='${a.dob}' AND email ='${a.email}' AND contact ='${a.contact}'`)
        // .then(([rows, fieldData])=>{
        //         const p_id = rows[0].p_id;
        //         db.query(`INSERT INTO ticket(p_id, f_id) VALUES ('${p_id}','${a.f_id}')`);
        // });}, 200);

        // Ticket and Seats are connected

        // setTimeout(() => {db.execute(`select t_num from passenger NATURAL JOIN ticket where name ='${a.name}' AND city='${a.city}' AND state='${a.state}' AND dob='${a.dob}' AND email ='${a.email}' AND contact ='${a.contact}'`)
        // .then(([rows, fieldData])=>{
        //         const t_num = rows[0].t_num;
        //         if(typeof(a.seat)==='string'){
        //             db.query(`INSERT INTO  ticket_seat VALUES('${t_num}', '${a.seat}')`);
        //         }
        //         else{
        //         for(let s of a.seat){
        //                 db.query(`INSERT INTO  ticket_seat VALUES('${t_num}', '${s}')`);
        //             }
        //         }
        // });}, 500);
    }
    static getpID(a){
        return db.execute(`SELECT p_id, t_num from passenger NATURAL JOIN ticket where name ='${a.name}' AND city='${a.city}' AND state='${a.state}' AND dob='${a.dob}' AND email ='${a.email}' AND contact ='${a.contact}'`);
        // return db.execute(`SELECT p_id from passenger where name ='${a.name}' AND city='${a.city}' AND state='${a.state}' AND dob='${a.dob}' AND email ='${a.email}' AND contact ='${a.contact}'`);
    }
    static paymentInfoAdd(a){
            //Seat update
        // Seat eauta matra ahuda string ma ahuxa
        const seat =a.seat.split(',');
        const cc_num = a.cc1+a.cc2+a.cc3+a.cc4;
        var total = 0;
        //For Seat and Ticket-Seat

        for(let s of seat){
            db.query(`UPDATE seat SET seat_status ='o' WHERE seat_num ='${s}'`);
            db.query(`UPDATE flight SET empty_seats=empty_seats-1 WHERE f_id ='${a.f_id}'`);
            db.query(`INSERT INTO  ticket_seat VALUES('${a.t_num}', '${s}')`);
            db.execute(`select * from seat WHERE seat_num = '${s}'`)
            .then(([rows, fieldData])=>{
                total+=parseInt(rows[0].rate);
            });
        }


        setTimeout(() => {
            db.query(`INSERT INTO payment( p_id, t_num, amount, card_num, card_type) VALUES ('${a.p_id}', '${a.t_num}', '${total}', '${cc_num}', '${a.c_type}')`)
        }, 100);
    }
    static getPaymentInfo(a){
        return db.execute(`SELECT * from payment natural join ticket natural join passenger natural join route where p_id = ${a.p_id}`);
    }

    static getCancelInfo(a){
        return db.execute(`SELECT distinct * from payment natural join ticket natural join ticket_seat natural join passenger natural join FLIGHT where p_num = ${a.p_num}`);
    }
    static deleteSeat(a){
        for(let s of a){
            db.query(`UPDATE seat SET seat_status ='u' WHERE seat_num ='${s.seat_num}'`);
            db.query(`UPDATE flight SET empty_seats=empty_seats+1 WHERE f_id ='${s.f_id}'`);
            db.query(`Delete from ticket_seat WHERE seat_num ='${s.seat_num}'`);
        }   
        db.query(`Delete FROM payment WHERE p_num = '${a[0].p_num}'`);
    }

};
