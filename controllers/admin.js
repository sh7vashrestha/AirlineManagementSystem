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
exports.postEditFlight = (req, res, next) => {
    
    adminAuth.fetchFlight(req.body.f_id)
    .then(([rows, fieldData])=>{
            res.render('admin/admin-edit', {
                pageTitle: 'Edit',
                f : rows[0],
                path: '/admin-flight' })
    });
    
};
exports.deleteFlight = (req, res, next) => {
    adminAuth.deleteFlight(req.body.f_id);
    setTimeout(()=>{adminAuth.fetchFlightInfo()
        .then(([rows, fieldData])=>{
                res.render('admin/admin-flight', {
                    pageTitle: 'Info',
                    f_info : rows,
                    path: '/admin-flight' })
        });}, 50);
    
};
exports.postEditedInfo = (req, res, next) => {
    const s = req.body.status;
    const o = req.body.origin;
    const d = req.body.destination;
    const date = req.body.depDate;
    const time = req.body.depTime;
    id = req.body.f_id;
    adminAuth.edited(id, s, o, d, date, time);

    //Update hudaina sangai rakhyo vane soo timeout rakhna parxa cause it is async function

    setTimeout(()=>{adminAuth.fetchFlightInfo()
    .then(([rows, fieldData])=>{
            res.render('admin/admin-flight', {
                pageTitle: 'Info',
                f_info : rows,
                path: '/admin-flight' })
    });}, 50);
    
};