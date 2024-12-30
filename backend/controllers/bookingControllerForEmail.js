const Booking = require('../models/Booking');

const createBookingForEmail = async (req, res) => {
    try {
        if (!req.user || !req.user.mongoId) {
            return res.status(401).json({
                success: false,
                message: "Authentication required!",
            });
        }

        const bookingData = {
            userId: req.user.mongoId,
            userEmail: req.user.email,
            tourName: req.body.tourName,
            fullName: req.body.fullName,
            phone: req.body.phone,
            guestSize: req.body.guestSize,
            totalAmount: req.body.totalAmount,
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
            error: error.message,
        });
    }
};

const getBookingForEmail = async (req, res) => {
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

const getAllBookingForEmail = async (req, res) => {
    try {
        if (!req.user || !req.user.id || !req.user._id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized access. Please sign in to view your bookings.",
            });
        }

        const bookings = await Booking.find({ userId: req.user.id }).populate('userId', 'email');

        res.status(200).json({
            success: true,
            data: bookings,
        });
    } catch (error) {
        console.error("Error fetching bookings:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to fetch bookings.",
        });
    }
};

module.exports = { createBookingForEmail, getBookingForEmail, getAllBookingForEmail };