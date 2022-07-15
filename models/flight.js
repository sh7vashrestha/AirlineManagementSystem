const db = require('../util/database');

module.exports = class flight{
    static fetchAll() {
        return db.execute('SELECT * FROM FLIGHT NATURAL JOIN ROUTE');
    }
    static fetchFlightinfo(s, d, depDate, qty){
        return db.execute("SELECT * FROM FLIGHT NATURAL JOIN ROUTE WHERE origin = '"+s+"'AND destination = '"+d+"'AND Date = '"+depDate+"' AND empty_seats>="+qty);
    }
    static fetchFlightSeatinfo(id)
    {
        return db.execute("SELECT * FROM FLIGHT NATURAL JOIN SEAT")
    }
}