const express = require('express');
const { createBookingForEmail, getAllBookingForEmail, getBookingForEmail, updateBookingForEmail, deleteBookingForEmail } =
    require('../controllers/bookingControllerForEmail');
const { verifyUser } = require('../utils/verifyToken');
const { createBookingForFirebase, getAllBookingForFirebase, getBookingForFirebase } = require('../controllers/bookingControllerForFirebase');
const { verifyFirebaseUser } = require('../utils/verifyFirebaseToken');

const router = express.Router();

router.post('/create', verifyUser, createBookingForEmail);
router.get('/user_bookings', verifyUser, getAllBookingForEmail);
router.get('/:id', verifyUser, getBookingForEmail);
router.put('/:id', verifyUser, updateBookingForEmail);
router.delete('/:id', verifyUser, deleteBookingForEmail);

router.post('/firebase/create', verifyFirebaseUser, createBookingForFirebase);
router.get('/firebase/user_bookings', verifyFirebaseUser, getAllBookingForFirebase);
router.get('/firebase/booking/:id', verifyFirebaseUser, getBookingForFirebase);

module.exports = router;
