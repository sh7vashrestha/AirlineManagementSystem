const db = require('../util/database');

module.exports = class flight{
    constructor(s, des, depDate, qty, seatType){
        this.start_location = s;
        this.destination = des;
        this.date = depDate;
        this.qty = qty;
        this.seatType = seatType;
    }
    static fetchAll() {
        return db.execute('SELECT * FROM FLIGHT NATURAL JOIN ROUTE');
    }
}