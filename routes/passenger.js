const path = require('path');

const express = require('express');

const passengerController = require('../controllers/passenger');

const router = express.Router();
//exporting controllers
router.get('/ticket-booking', passengerController.getTicketBooking);
router.post('/ticket-booking', passengerController.postTicketBooking);

router.get('/ticket-cancelation', passengerController.getTicketCancelation);

module.exports = router;