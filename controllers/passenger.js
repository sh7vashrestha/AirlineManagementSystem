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
      
    res.render('passenger/flight-book',
     { pageTitle: 'Ticket-Book', 
      s_info: rows,
      fc : fc,
      bc:bc,
      ec:ec,
      f: f_id,
      path: '/ticket-booking' });
     });
};


exports.getTicketCancelation = (req, res, next) => {
    res.render('passenger/ticket-cancelation', { 
      pageTitle: 'Ticket-Cancelation', 
      info: req.query.info,
      path: '/ticket-cancelation' });
  };


exports.getSeatInfo = (req, res, next) => {
    const a= req.query;
    passenger.passengerInfoAdd(a);
    setTimeout(() => {
      passenger.TicketInfoAdd(a);
    }, 50);
    
    setTimeout(() => {
      passenger.getpID(a)
      .then(([rows, fieldData])=>{
      res.render('passenger/payment', { pageTitle: 'Payment-Info', 
      pData: a.name,
      f_id: a.f_id,
      tData: rows[0].t_num,
      p_id: rows[0].p_id,
      seat: a.seat,
      path: '/ticket-booking' });
     });
    }, 700);
  };

  
exports.getPaymentInfo = (req, res, next) => {
  a= req.query;
  const seat =a.seat.split(',');
  passenger.paymentInfoAdd(a);
  setTimeout(() => {
    passenger.getPaymentInfo(a)
    .then(([rows, fieldData])=>{
      const payData = rows[rows.length-1];
      //redirected as the paynum gets updated for each refresh..
      res.redirect(`/payinfo?p_id='${payData.p_id}'&seat=${seat}`);
  //     res.render('passenger/payInfo', { 
  //       pageTitle: 'Payment-Info',
  //       p: payData,
  //       seat: seat, 
  //       path: '/ticket-booking' });
    });
  }, 200);
};
exports.getPayInfo = (req, res, next) => {
  a=req.query;
  const seat =a.seat.split(',');
  passenger.getPaymentInfo(a)
    .then(([rows, fieldData])=>{
      const payData = rows[rows.length-1];
        res.render('passenger/payInfo', { 
          pageTitle: 'Payment-Info',
        p: payData,
        seat: seat, 
        path: '/ticket-booking' });
    });
};

exports.getCancelInfo = (req, res, next) => {
  a=req.body;
  passenger.getCancelInfo(a)
  .then(([rows, fieldData])=>{
    if(rows.length != 0){
    let seat=[];
    for(let s of rows){
      seat.push(s.seat_num);
    }
    res.render('passenger/cancelConfirm', {
      pageTitle: 'Ticket-Cancelation', 
      path: '/ticket-cancelation',
      seat: seat,
      p: rows[0]
    });}
    else res.redirect('/ticket-cancelation/?info=wrong');
  });
};

exports.deletePayment = (req, res, next) => {
  a=req.query;
  passenger.getCancelInfo(a)
  .then(([rows, fieldData])=>{
    passenger.deleteSeat(rows);
    res.redirect('/');
  });
};