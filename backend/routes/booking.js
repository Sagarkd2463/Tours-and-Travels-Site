const express = require('express');
const { createBookingForEmail, getAllBookingForEmail, getBookingForEmail } = require('../controllers/bookingControllerForEmail');
const { verifyUser } = require('../utils/verifyToken');
const { createBookingForFirebase, getAllBookingForFirebase, getBookingForFirebase } = require('../controllers/bookingControllerForFirebase');
const { verifyFirebaseToken } = require('../utils/verifyFirebaseToken');

const router = express.Router();

// Route-level middleware allows chaining multiple handlers
router.post('/create', verifyUser, createBookingForEmail);
router.get('/user_bookings', verifyUser, getAllBookingForEmail);
router.get('/:id', verifyUser, getBookingForEmail);

router.post('/firebase-create', verifyFirebaseToken, createBookingForFirebase);
router.get('/firebase-bookings', verifyFirebaseToken, getAllBookingForFirebase);
router.get('/firebase-booking/:id', verifyFirebaseToken, getBookingForFirebase);

module.exports = router;
