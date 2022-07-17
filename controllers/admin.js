exports.getAdminLogin = (req, res, next) => {
    res.render('admin/admin-login', { pageTitle: 'LOG-IN',
     path: '/admin' });
};
exports.postAdminLoginInfo = (req, res, next) => {
    const id = req.body.login;
    const password = req.body.password;
    console.log(req.body);
    res.send("<h1>Hello WOrld</h1>");
};