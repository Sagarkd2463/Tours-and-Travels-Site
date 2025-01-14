const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false,
        },
        firebaseUid: {
            type: String,
            required: false,
        },
        userEmail: {
            type: String,
            required: true,
            index: true,
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
            type: String,
            required: true,
        },
        bookedAt: {
            type: Date,
            required: true,
            validate: {
                validator: (value) => !isNaN(Date.parse(value)),
                message: "Invalid date format",
            },
        },
    },
    { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;