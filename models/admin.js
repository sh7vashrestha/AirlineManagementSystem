const { INSERT } = require('sequelize/types/query-types');
const db = require('../util/database');

module.exports = class adminAuth{
    static fetchAdminID(){
        return db.execute('select * from admin');
    }
    static fetchFlightInfo(){
        return db.execute('select * from flight NATURAL JOIN ROUTE');
    }
    static fetchFlight(id){
        return db.execute('select * from flight NATURAL JOIN ROUTE WHERE f_id ='+id);
    }
    static edited(id, s, o, d, date, time){
        db.query(`UPDATE flight SET f_status ='${s}' WHERE f_id =${id}`);
        db.query(`UPDATE route SET origin ='${o}', destination='${d}',date='${date}', time='${time}' WHERE f_id =${id}`);
    }
    static deleteFlight(id){
        db.query(`DELETE FROM flight WHERE f_id =${id}`);
    }
    static postPassenger(){
        return db.execute(`select * from passenger`);
    }
    static postPassengerInfo(a){
        return db.execute(`select * from passenger Natural Join payment WHERE p_id =${a}` );
    }
    static getFair(a){
        return db.execute(`select * from Flight Natural Join Seat WHERE f_id =${a}` );
    }
    static fairEdit(f, b, e, f_id){
        db.execute(`select * from Flight Natural Join Seat WHERE f_id =${f_id}` )
        .then(([rows, fieldData])=>{
            for(let s of rows){
                if(s.s_type =='f'){
                    db.query(`UPDATE seat SET rate=${f} WHERE s_type ='f'`);
                }
                else if(s.s_type == 'b'){
                    db.query(`UPDATE seat SET rate=${b} WHERE s_type ='b'`);
                }
                else if(s.s_type == 'e'){
                    db.query(`UPDATE seat SET rate=${e} WHERE s_type ='e'`);
                }
        }
        });
    }
    static flightAdd(a){
        db.query(`UPDATE seat SET rate=${f} WHERE s_type ='f'`);
    }
}