const adminAuth= require('../models/admin');
exports.getAdminLogin = (req, res, next) => {
    res.render('admin/admin-login', { pageTitle: 'LOG-IN',
     path: '/admin', Message:''});
};
exports.postAdminLoginInfo = (req, res, next) => {
    const id = req.body.login;
    const password = req.body.password;
    adminAuth.fetchAdminID()
    .then(([rows, fieldData])=>{
        for (let i = 0; i < rows.length; i++) {
            if(id == rows[i].admin_id && password == rows[i].password){
                res.render('admin/admin-info', { pageTitle: 'LOG-IN',
                path: '/admin',
                userName: rows[i].admin_id});
            };
        }
        res.render('admin/admin-login', { pageTitle: 'LOG-IN',
        path: '/admin', Message:"Wrong Password"});
    });
    
};

exports.postAdminFlight = (req, res, next) => {
    adminAuth.fetchFlightInfo()
    .then(([rows, fieldData]) =>{
      res.render('admin/admin-flight', {
         pageTitle: 'Flight',
         f_info : rows,
         path: '/admin-flight' });
    });
};