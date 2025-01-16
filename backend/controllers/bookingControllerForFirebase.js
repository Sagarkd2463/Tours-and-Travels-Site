const Booking = require('../models/Booking');

const createBookingForFirebase = async (req, res) => {
    try {
        if (!req.user || !req.user.uid) {
            return res.status(401).json({
                success: false,
                message: "Authentication required!",
            });
        }

        const bookingData = {
            ...req.body,
            userId: req.user.uid, // Firebase UID
            bookedAt: new Date(req.body.bookedAt), // Validate date if needed
        };

        const newBooking = new Booking(bookingData);
        const savedBooking = await newBooking.save();

        res.status(201).json({
            success: true,
            message: "Your tour is booked!",
            data: savedBooking,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to book your tour!",
            error: error.message,
        });
    }
};

const getAllBookingForFirebase = async (req, res) => {
    try {
        if (!req.user || !req.user.uid) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized access. Please sign in to view your bookings.",
            });
        }

        const bookings = await Booking.find({ userId: req.user.uid });

        res.status(200).json({
            success: true,
            data: bookings,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch bookings.",
            error: error.message,
        });
    }
};

const getBookingForFirebase = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found!",
            });
        }

        res.status(200).json({
            success: true,
            data: booking,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve booking!",
            error: error.message,
        });
    }
};

module.exports = { createBookingForFirebase, getAllBookingForFirebase, getBookingForFirebase };
