const express = require('express');
const { createBooking, getBooking, getAllBooking } = require('../controllers/bookingController');
const { verifyUser, verifyAdmin } = require('../utils/verifyToken');
const { check, validationResult } = require('express-validator');
const Booking = require('../models/Booking');

const router = express.Router();

// Create a booking
router.post('/', verifyUser, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        await createBooking(req, res);
    } catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
);

// Get all bookings for a user
router.get('/', verifyUser, async (req, res) => {
    try {
        await getAllBooking(req, res);
    } catch (error) {
        console.error("Error fetching user bookings:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// Get a specific booking
router.get('/:id', verifyUser, async (req, res) => {
    try {
        await getBooking(req, res);
    } catch (error) {
        console.error("Error fetching specific booking:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// Get all bookings (admin only)
router.get('/all', verifyAdmin, async (req, res) => {
    try {
        const bookings = await Booking.find(); // Fetch all bookings
        res.status(200).json({ success: true, data: bookings });
    } catch (error) {
        console.error("Error fetching all bookings:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

module.exports = router;