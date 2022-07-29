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

module.exports = router;