

exports.ticketBooking = (req, res, next) => {
  console.log(req.body.random);
    res.render('passenger/ticket-booking', { pageTitle: 'Ticket-Booking', 
    path: '/ticket-booking' });
  };

  exports.ticketCancelation = (req, res, next) => {
   
    res.render('passenger/ticket-cancelation', { pageTitle: 'Ticket-Cancelation', 
    path: '/ticket-cancelation' });
  };