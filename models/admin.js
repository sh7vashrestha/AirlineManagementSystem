const db = require('../util/database');

module.exports = class adminAuth{
    static fetchAdminID(){
        return db.execute('select * from admin');
    }
    static fetchFlightInfo(){
        return db.execute('select * from flight NATURAL JOIN ROUTE');
    }
}