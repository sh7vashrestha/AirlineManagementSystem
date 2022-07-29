const flight = require('../models/flight');
const passenger = require('../models/passenger');
exports.getTicketBooking = (req, res, next) => {
    res.render('passenger/flight-search', { pageTitle: 'Ticket-Booking', 
    path: '/ticket-booking' });
  };

exports.getFlightSearch = (req, res, next) => {
    const s = req.query.start_loc; 
    const d = req.query.destination; 
    const depDate = req.query.depDate; 
    const qty = req.query.quantity;
    flight.fetchFlightinfo(s,d,depDate,qty)
    .then(([rows, fieldData]) =>{
      res.render('flights', {
         pageTitle: 'Flight-Search',
         f_info : rows,
         path: '/flight-search' });
    });
  };



exports.getFlightBook = (req, res, next) => {
    const f_id = req.query.id;
    flight.fetchFlightSeatinfo(f_id)
    .then(([rows, fieldData])=>{
    res.render('passenger/flight-book',
     { pageTitle: 'Ticket-Book', 
      s_info: rows,
      f: f_id,
      path: '/ticket-booking' });
     });
  };
exports.getTicketCancelation = (req, res, next) => {
    res.render('passenger/ticket-cancelation', { pageTitle: 'Ticket-Cancelation', 
    path: '/ticket-cancelation' });
  };
exports.getSeatInfo = (req, res, next) => {
    const a= req.query;
    passenger.passengerInfo(a)
    .then(([rows, fieldData])=>{
      res.render('passenger/ticket-cancelation', { pageTitle: 'Ticket-Cancelation', 
    path: '/ticket-cancelation' });
    });
    
  };