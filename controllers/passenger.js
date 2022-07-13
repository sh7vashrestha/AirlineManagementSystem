const flight = require('../models/flight');
exports.getTicketBooking = (req, res, next) => {
    res.render('passenger/ticket-booking', { pageTitle: 'Ticket-Booking', 
    path: '/ticket-booking' });
  };

exports.postTicketBooking = (req, res, next) => {
    const s = req.body.start_loc; 
    const d = req.body.destiantion; 
    const depDate = req.body.depDate; 
    const qty = req.body.quantity; 
    const seatType= req.body.seatType; 
    const f = (s, d, depDate, qty, seatType);
    f.save();
    res.redirect('/flight-info');
  };



exports.getTicketCancelation = (req, res, next) => {
    res.render('passenger/ticket-cancelation', { pageTitle: 'Ticket-Cancelation', 
    path: '/ticket-cancelation' });
  };