const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/admin', adminController.getAdminLogin);

router.post('/admin-info', adminController.postAdminLoginInfo);

router.post('/admin-flight', adminController.postAdminFlight);

router.post('/admin-edit', adminController.postEditFlight);

router.post('/admin-edited', adminController.postEditedInfo);

router.post('/admin-delete', adminController.deleteFlight);

router.post('/admin-passenger', adminController.postPassenger);

router.post('/admin-passengerInfo', adminController.postPassengerInfo);

router.post('/admin-fair', adminController.fair);

router.post('/admin-fairEdit', adminController.fairEdit);

router.post('/admin-fairPost', adminController.fairPost);

router.post('/admin-fadd', adminController.flightAdd);

router.post('/admin-added', adminController.flightAdded);

module.exports = router;