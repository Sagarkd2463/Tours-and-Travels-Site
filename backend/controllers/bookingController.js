const Booking = require('../models/Booking');

const createBooking = async (req, res) => {
    try {
        // Ensure the user is authenticated (OAuth or email/password)
        if (!req.user || !req.user.mongoId) {
            return res.status(401).json({
                success: false,
                message: "Authentication required!",
            });
        }

        const bookingData = {
            ...req.body,
            userId: req.user.mongoId, // Use MongoDB user ID
            userEmail: req.user.email,
            bookedAt: new Date(req.body.bookedAt),
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
            data: error.message,
        });
    }
};

const getBooking = async (req, res) => {
    try {
        const bookingId = req.params.id;

        if (!bookingId) {
            return res.status(400).json({
                success: false,
                message: "Booking ID is required!",
            });
        }

        // Fetch the booking and populate the user's email
        const booking = await Booking.findById(bookingId).populate('userId', 'email');

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

const getAllBooking = async (req, res) => {
    try {
        // Ensure the user is authenticated (OAuth or email/password)
        if (!req.user || (!req.user.id && !req.user._id && !req.user.mongoId)) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized access. Please sign in to view your bookings.",
            });
        }

        const userBookings = await Booking.find({ userId: req.user.mongoId }).populate('userId', 'email');

        res.status(200).json({
            success: true,
            message: "Successfully fetched your booked tours!",
            data: userBookings,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch your bookings.",
            error: error.message,
        });
    }
};

module.exports = { createBooking, getBooking, getAllBooking };