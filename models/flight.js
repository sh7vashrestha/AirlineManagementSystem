const db = require('../util/database');

module.exports = class flight{
    constructor(start, des, depDate, qty, seatType){

    }
    static fetchAll() {
        return db.execute('SELECT * FROM FLIGHT');
    }
}