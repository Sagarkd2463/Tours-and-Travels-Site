const express = require('express');
const { createBookingForEmail, getAllBookingForEmail, getBookingForEmail } = require('../controllers/bookingControllerForEmail');
const { verifyUser } = require('../utils/verifyToken');
const { createBookingForFirebase, getAllBookingForFirebase, getBookingForFirebase } = require('../controllers/bookingControllerForFirebase');
const { verifyFirebaseToken } = require('../utils/verifyFirebaseToken');

const router = express.Router();

// Route-level middleware allows chaining multiple handlers
router.post('/', verifyUser, createBookingForEmail);
router.get('/', verifyUser, getAllBookingForEmail);
router.get('/:id', verifyUser, getBookingForEmail);

router.post('/firebase-create', verifyFirebaseToken, createBookingForFirebase);
router.get('/firebase-users', verifyFirebaseToken, getAllBookingForFirebase);
router.get('/firebase-user/:id', verifyFirebaseToken, getBookingForFirebase);

module.exports = router;
