const mongoose = require('mongoose');
const Booking = require('../models/Booking');

const createBookingForEmail = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: "Authentication required!" });
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

        res.status(201).json({ success: true, message: "Your tour is booked!", data: savedBooking });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to book your tour!",
            error: error.message
        });
    }
};

const getAllBookingForEmail = async (req, res) => {
    try {
        const { email } = req.user;

        if (!email) {
            return res.status(401).json({ success: false, message: "Unauthorized access. Please sign in." });
        }

        const bookings = await Booking.find({ userEmail: email });

        if (!bookings.length) {
            return res.status(404).json({ success: false, message: "No bookings found for the user." });
        }

        res.status(200).json({ success: true, data: bookings });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch bookings.",
            error: error.message
        });
    }
};

const getBookingForEmail = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid or missing booking ID.",
            });
        }

        const booking = await Booking.findById(id);

        if (!booking) {
            return res.status(404).json({ success: false, message: "Booking not found!" });
        }

        res.status(200).json({ success: true, data: booking });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve booking!",
            error: error.message,
        });
    }
};

const updateBookingForEmail = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid or missing booking ID.",
            });
        }

        const updatedBooking = await Booking.findByIdAndUpdate(id, updatedData, {
            new: true,
        });

        if (!updatedBooking) {
            return res.status(404).json({ success: false, message: "Booking not found!" });
        }

        res.status(200).json({ success: true, message: "Booking updated successfully!", data: updatedBooking });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update booking!",
            error: error.message,
        });
    }
};

const deleteBookingForEmail = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid or missing booking ID.",
            });
        }

        const deletedBooking = await Booking.findByIdAndDelete(id);

        if (!deletedBooking) {
            return res.status(404).json({ success: false, message: "Booking not found!" });
        }

        res.status(200).json({ success: true, message: "Booking deleted successfully!" });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete booking!",
            error: error.message,
        });
    }
};

module.exports = { createBookingForEmail, getBookingForEmail, getAllBookingForEmail, updateBookingForEmail, deleteBookingForEmail };