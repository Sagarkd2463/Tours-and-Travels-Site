const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
        },
        userEmail: {
            type: String,
        },
        tourName: {
            type: String,
            required: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        guestSize: {
            type: Number,
            required: true,
        },
        phone: {
            type: Number,
            required: true,
        },
        bookedAt: {
            type: Date,
            required: true,
        },
    },
    { timestamps: true }
);

const booking = mongoose.model("Booking", bookingSchema);

module.exports = booking;
