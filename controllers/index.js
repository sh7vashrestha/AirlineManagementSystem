exports.getHome = (req, res, next) => {
    res.render('index', { pageTitle: 'Home', path: '/' });
  };
  exports.getFlight = (req, res, next) => {
    res.render('flights', { pageTitle: 'Flight', path: '/flight' });
  };
