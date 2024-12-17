const Booking = require('../models/Booking');

const createBooking = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required!",
            });
        }

        const bookingData = {
            ...req.body,
            userId: req.user._id,
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

const getBooking = (req, res) => {
    console.log("Params in getBooking:", req.params);
    const bookingId = req.params.id;

    if (!bookingId) {
        return res.status(400).json({
            success: false,
            message: "Booking ID is required!",
        });
    }

    Booking.findById(bookingId)
        .then((booking) => {
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
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: "Failed to retrieve booking!",
                error: err.message,
            });
        });
};

const getAllBooking = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized access. Please sign in to view your bookings.",
            });
        }

        // Fetch all bookings for the signed-in user
        const userBookings = await Booking.find({ userId: req.user._id });

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

module.exports = {
    createBooking,
    getBooking,
    getAllBooking
};