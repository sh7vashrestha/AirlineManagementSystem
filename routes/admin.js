const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/admin', adminController.getAdminLogin);

module.exports = router;