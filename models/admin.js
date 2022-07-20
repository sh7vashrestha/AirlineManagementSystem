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
}