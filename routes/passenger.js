const path = require('path');

const express = require('express');

const homeController = require('../controllers/passenger');

const router = express.Router();
//exporting controllers
router.get('/ticket-booking', homeController.ticketBooking);
router.get('/ticket-cancelation', homeController.ticketCancelation);

module.exports = router;