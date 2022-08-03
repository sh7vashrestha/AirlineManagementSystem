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

exports.postPassenger = (req, res, next) => {
    adminAuth.postPassenger()
    .then(([rows, fieldData]) =>{
      res.render('admin/admin-passenger', {
         pageTitle: 'Passenger',
         p_info : rows,
         path: '/admin-passenger' });
    });
};
exports.postPassengerInfo = (req, res, next) => {
    adminAuth.postPassengerInfo(req.body.p_id)
    .then(([rows, fieldData]) =>{
        console.log(rows);
      res.render('admin/passenger-info', {
         pageTitle: 'Passenger',
         p : rows,
         path: '/admin-passenger' });
    });
};
exports.fair = (req, res, next) => {
    adminAuth.fetchFlightInfo()
    .then(([rows, fieldData]) =>{
      res.render('admin/admin-fair', {
         pageTitle: 'Fair',
         f_info : rows,
         path: '/admin-fair' });
    });
};
exports.fairEdit = (req, res, next) => {
    adminAuth.getFair(req.body.f_id)
    .then(([rows, fieldData]) =>{
        var fc = 0;
        var bc = 0;
        var ec = 0;
            for(let s of rows){
                if(s.s_type =='f'){
                    fc = s.rate;
                }
                else if(s.s_type =='b'){
                    bc = s.rate;
                }
                else if(s.s_type =='e'){
                    ec = s.rate;
                }
        }
      res.render('admin/fair', {
         pageTitle: 'Fair_edit',
         f : fc,
         b : bc,
         e : ec,
         f_id:req.body.f_id,
         path: '/admin-fair' });
    });
};
exports.fairPost = (req, res, next) => {
    const f = req.body.frate;
    const b = req.body.brate;
    const e = req.body.erate;
    const f_id = req.body.f_id;
    adminAuth.fairEdit(f, b, e, f_id)
    setTimeout(()=>{adminAuth.fetchFlightInfo()
        .then(([rows, fieldData])=>{
            adminAuth.fetchFlightInfo()
            .then(([rows, fieldData]) =>{
              res.render('admin/admin-fair', {
                 pageTitle: 'Fair',
                 f_info : rows,
                 path: '/admin-fair' });
            });
        });}, 50);
      
};
exports.flightAdd = (req, res, next) => {
    res.render('admin/admin-tadd', {
        pageTitle: 'Flight-Add',
        path: '/admin-flight' })
      
};
exports.flightAdded = (req, res, next) => {
    const a= req.body;
    adminAuth.flightAdd(a);
    setTimeout(() => {
        res.render('admin/admin-tadd', {
            pageTitle: 'Flight-Add',
            path: '/admin-flight' })
    }, 500);
};