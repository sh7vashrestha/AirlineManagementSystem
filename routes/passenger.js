const path = require('path');

const express = require('express');

const passengerController = require('../controllers/passenger');

const router = express.Router();
//exporting controllers
router.get('/ticket-booking', passengerController.ticketBooking);
router.get('/ticket-cancelation', passengerController.ticketCancelation);

module.exports = router;