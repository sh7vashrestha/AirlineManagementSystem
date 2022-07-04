exports.get404 = (req, res, next) => {
    res.status(404).render('error/error', { pageTitle: 'Page Not Found', path: '/error' });
  };