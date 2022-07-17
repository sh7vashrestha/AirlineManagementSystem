const db = require('../util/database');

module.exports = class adminAuth{
    static fetchAdminID(){
        return db.execute('select * from admin');
    }
}