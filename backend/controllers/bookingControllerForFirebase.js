const Booking = require('../models/Booking');

const createBookingForFirebase = async (req, res) => {
    try {
        if (!req.user || !req.user.uid) {
            return res.status(401).json({
                success: false,
                message: "Authentication required!",
            });
        }

        const { bookedAt, tourName, fullName, phone, guestSize, totalAmount } = req.body;

        const parsedDate = bookedAt ? new Date(bookedAt) : new Date();
        if (isNaN(parsedDate.getTime())) {
            return res.status(400).json({
                success: false,
                message: "Invalid 'bookedAt' date format!",
            });
        }

        const bookingData = {
            userId: req.user.uid,
            userEmail: req.user.email || req.body.userEmail,
            tourName,
            fullName,
            phone,
            guestSize,
            totalAmount,
            bookedAt: parsedDate,
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
        });
    }
};

module.exports = { createBookingForFirebase, getAllBookingForFirebase, getBookingForFirebase };