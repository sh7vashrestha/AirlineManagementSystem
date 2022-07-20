const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/admin', adminController.getAdminLogin);

router.post('/admin-info', adminController.postAdminLoginInfo);
router.post('/admin-flight', adminController.postAdminFlight);

module.exports = router;