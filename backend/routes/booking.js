const express = require('express');
const { createBooking, getBooking, getAllBooking } = require('../controllers/bookingController');
const { verifyUser } = require('../utils/verifyToken');

const router = express.Router();

router.post('/', verifyUser, async (req, res) => {
    try {
        await createBooking(req, res);
    } catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

router.get('/', verifyUser, async (req, res) => {
    try {
        await getAllBooking(req, res);
    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

router.get('/:id', verifyUser, async (req, res) => {
    try {
        await getBooking(req, res);
    } catch (error) {
        console.error("Error fetching booking:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

module.exports = router;