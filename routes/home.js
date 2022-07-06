const path = require('path');

const express = require('express');

const homeController = require('../controllers/index');

const router = express.Router();

router.get('/', homeController.getHome);
router.get('/flight', homeController.getFlight);

module.exports = router;