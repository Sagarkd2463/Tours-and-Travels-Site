const express = require('express');
const { createBooking, getBooking, getAllBooking } = require('../controllers/bookingController');
const { verifyUser, verifyAdmin } = require('../utils/verifyToken');

const router = express.Router();

router.post('/', verifyUser, createBooking);

router.get('/', verifyAdmin, getAllBooking);

router.get('/:id', verifyUser, getBooking);

module.exports = router;