const path = require('path');

const express = require('express');

const passengerController = require('../controllers/passenger');

const router = express.Router();
//exporting controllers
router.get('/ticket-booking', passengerController.getTicketBooking);

router.get('/flight-search', passengerController.getFlightSearch);

router.get('/flight-book', passengerController.getFlightBook);

router.get('/ticket-cancelation', passengerController.getTicketCancelation);

router.get('/passengerInfo', passengerController.getSeatInfo);

router.get('/confiramtion', (req, res)=>{
    res.render('passenger/ticket-cancelation', { pageTitle: 'Payment-Info', 
    path: '/ticket-booking' });
    });

module.exports = router;