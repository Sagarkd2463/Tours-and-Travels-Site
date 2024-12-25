const express = require('express');
const { createBooking, getBooking, getAllBooking } = require('../controllers/bookingController');
const { verifyFirebaseToken } = require('../utils/verifyToken');

const router = express.Router();

router.post('/', verifyFirebaseToken, async (req, res) => {
    try {
        await createBooking(req, res);
    } catch (error) {
        console.error("Error creating booking:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

router.get('/', verifyFirebaseToken, async (req, res) => {
    if (!req.user || !req.user.mongoId) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized access. Please sign in.",
        });
    }

    try {
        await getAllBooking(req, res);
    } catch (error) {
        console.error("Error fetching user bookings:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

router.get('/:id', verifyFirebaseToken, async (req, res) => {
    try {
        await getBooking(req, res);
    } catch (error) {
        console.error("Error fetching specific booking:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

module.exports = router;