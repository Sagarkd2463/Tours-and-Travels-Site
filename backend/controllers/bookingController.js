const Booking = require('../models/Booking');

const createBooking = async (req, res) => {

    const newBooking = new Booking(req.body);

    try {

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

    const id = req.params.id;

    try {
        const booking = await Booking.findById(id);

        res.status(200).json({
            success: true,
            message: "Successfully fetched your booking!",
            data: booking,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Failed to get your booked tour!",
            data: error.message,
        });
    }
};

const getAllBooking = async (req, res) => {

    try {
        const allBookings = await Booking.find();

        res.status(200).json({
            success: true,
            message: "Successfully fetched all your booked tours!",
            data: allBookings,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to get all your booked tours!",
            data: error.message,
        });
    }
};

module.exports = {
    createBooking,
    getBooking,
    getAllBooking
}