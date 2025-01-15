const express = require('express');
const { createBookingForEmail, getAllBookingForEmail, getBookingForEmail, updateBookingForEmail, deleteBookingForEmail } =
    require('../controllers/bookingControllerForEmail');
const { verifyUser } = require('../utils/verifyToken');
const { createBookingForFirebase, getAllBookingForFirebase, getBookingForFirebase } = require('../controllers/bookingControllerForFirebase');
const { verifyFirebaseToken } = require('../utils/verifyFirebaseToken');

const router = express.Router();

router.post('/create', verifyUser, createBookingForEmail);
router.get('/user_bookings', verifyUser, getAllBookingForEmail);
router.get('/:id', verifyUser, getBookingForEmail);
router.put('/:id', verifyUser, updateBookingForEmail);
router.delete('/:id', verifyUser, deleteBookingForEmail);

router.post('/firebase-create', verifyFirebaseToken, createBookingForFirebase);
router.get('/firebase-bookings', verifyFirebaseToken, getAllBookingForFirebase);
router.get('/firebase-booking/:id', verifyFirebaseToken, getBookingForFirebase);

module.exports = router;
