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
                res.send("Success-Login");
            };
        }
        res.render('admin/admin-login', { pageTitle: 'LOG-IN',
        path: '/admin', Message:"Wrong Password"});
    });
    
};