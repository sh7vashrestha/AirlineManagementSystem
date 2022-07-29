const db = require('../util/database');

module.exports = class passenger{
    static passengerInfo(a)
    {
        const zip = parseInt(a.zip);
        db.query(`INSERT INTO passenger(name, city, state, zip, gender, dob, email, contact) VALUES ('${a.name}','${a.city}','${a.state}',${zip},'${a.gender}','${a.dob}','${a.email}','${a.contact}')`);
        
        setTimeout(() => {db.execute(`select p_id from passenger where name ='${a.name}' AND city='${a.city}' AND dob='${a.dob}' AND email ='${a.email}' AND contact ='${a.contact}'`)
        .then(([rows, fieldData])=>{
                const p_id = rows[0].p_id;
                db.query(`INSERT INTO ticket(p_id, f_id) VALUES ('${p_id}','${a.f_id}')`);
        });
        }, 5);
        return db.execute('SELECT p_id from Passenger');
    }
}