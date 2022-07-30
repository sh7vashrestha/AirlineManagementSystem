const db = require('../util/database');

module.exports = class passenger{
    static passengerInfoUpdate(a)
    {
        const zip = parseInt(a.zip);
        //Seat update
        // Seat eauta matra ahuda string ma ahuxa
        if(typeof(a.seat)==='string'){
            db.query(`UPDATE seat SET seat_status ='o' WHERE seat_num ='${a.seat}'`);
            db.query(`UPDATE flight SET empty_seats=empty_seats-1 WHERE f_id ='${a.f_id}'`);
        }
        else{
        for(let s of a.seat){
            db.query(`UPDATE seat SET seat_status ='o' WHERE seat_num ='${s}'`);
            db.query(`UPDATE flight SET empty_seats=empty_seats-1 WHERE f_id ='${a.f_id}'`);
        }}
        // Passenger data Inserted
        db.execute( `SELECT * from passenger where name ='${a.name}' AND city='${a.city}' AND state='${a.state}' AND zip='${zip}' AND gender='${a.gender}' AND dob='${a.dob}' AND email ='${a.email}' AND contact ='${a.contact}'`)
        .then( ([result, fieldData])=>{
            if(result.length === 0){
                db.query(`INSERT INTO passenger(name, city, state, zip, gender, dob, email, contact) VALUES ('${a.name}','${a.city}','${a.state}',${zip},'${a.gender}','${a.dob}','${a.email}','${a.contact}')`);
            }
        });
        // Ticket added
        setTimeout(() => {db.execute(`SELECT * from passenger where name ='${a.name}' AND city='${a.city}' AND state='${a.state}' AND zip='${zip}' AND gender='${a.gender}' AND dob='${a.dob}' AND email ='${a.email}' AND contact ='${a.contact}'`)
        .then(([rows, fieldData])=>{
                const p_id = rows[0].p_id;
                db.query(`INSERT INTO ticket(p_id, f_id) VALUES ('${p_id}','${a.f_id}')`);
        });}, 200);

        // Ticket and Seats are connected
        setTimeout(() => {db.execute(`select t_num from passenger NATURAL JOIN ticket where name ='${a.name}' AND city='${a.city}' AND state='${a.state}' AND dob='${a.dob}' AND email ='${a.email}' AND contact ='${a.contact}'`)
        .then(([rows, fieldData])=>{
                const t_num = rows[0].t_num;
                if(typeof(a.seat)==='string'){
                    db.query(`INSERT INTO  ticket_seat VALUES('${t_num}', '${a.seat}')`);
                }
                else{
                for(let s of a.seat){
                        db.query(`INSERT INTO  ticket_seat VALUES('${t_num}', '${s}')`);
                    }
                }
        });}, 500);
    }
    static getpID(a){
        return db.execute(`SELECT t_num from passenger NATURAL JOIN ticket where name ='${a.name}' AND city='${a.city}' AND state='${a.state}' AND dob='${a.dob}' AND email ='${a.email}' AND contact ='${a.contact}'`);
    }
};
