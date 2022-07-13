const flight = require('../models/flight');

exports.getHome = (req, res, next) => {
    res.render('index', { pageTitle: 'Home', path: '/' });
  };

  
exports.getFlight = (req, res, next) => {
    flight.fetchAll()
    .then(([rows, fieldData]) =>{
      res.render('flights', {
         pageTitle: 'Flight',
         f_info : rows,
         path: '/flight' });
    });
    
  };
