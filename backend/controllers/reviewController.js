const Tour = require('../models/Tour');
const Review = require('../models/Review');

const createReview = async (req, res) => {

    const tourId = req.params.tourId;

    const newReview = new Review({ ...req.body });

    try {

        const savedReview = await newReview.save();

        await Tour.findByIdAndUpdate(tourId, {
            $push: { reviews: savedReview._id },
        });

        res.status(200).json({
            success: true,
            message: "Review Submitted!!",
            data: savedReview,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to submit your review!!",
            data: error.message,
        });
    }
};


module.exports = {
    createReview
};