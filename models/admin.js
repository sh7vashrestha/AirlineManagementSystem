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
}