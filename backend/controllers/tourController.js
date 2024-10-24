const Tour = require('./../models/Tour');

const createTour = async (req, res) => {

    const newTour = new Tour(req.body);

    try {
        const savedTour = await newTour.save();

        res.status(201).json({
            success: true,
            message: 'Successfully created',
            data: savedTour,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to create. Try again!',
            data: err.message,
        });
    }
};

const updateTour = async (req, res) => {

    const id = req.params.id;

    try {
        const updatedTour = await Tour.findByIdAndUpdate(id, {
            $set: {
                title: req.body.title,
                city: req.body.city,
                address: req.body.address,
                distance: req.body.distance,
                photo: req.body.photo,
                desc: req.body.desc,
                price: req.body.price,
                maxGroupSize: req.body.maxGroupSize,
                reviews: req.body.reviews,
                featured: req.body.featured,
            },
        }, { new: true });

        res.status(200).json({
            success: true,
            message: 'Successfully updated',
            data: updatedTour,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to update your data!',
            data: err.message,
        });
    }
};

const deleteTour = async (req, res) => {

    const id = req.params.id;

    try {
        await Tour.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'Successfully deleted',
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete your data!',
            data: err.message,
        });
    }
};

const getSingleTour = async (req, res) => {

    const id = req.params.id;

    try {
        const getSingledTour = await Tour.findById(id)
            .populate('reviews');

        res.status(200).json({
            success: true,
            message: 'Successfully retrieved a tour',
            data: getSingledTour,
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: 'Failed to find your desired tour!',
            data: err.message,
        });
    }
};

const getAllTour = async (req, res) => {

    const page = parseInt(req.query.page);

    try {
        const getAllTours = await Tour.find({})
            .populate('reviews')
            .skip(page * 8)
            .limit(8);

        res.status(200).json({
            success: true,
            count: getAllTours.length,
            message: 'Successfully retrieved all your tours',
            data: getAllTours,
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: 'Could not fetch all your tours!',
            data: err.message,
        });
    }
};

const getTourBySearch = async (req, res) => {

    const city = new RegExp(req.query.city, 'i');
    const distance = parseInt(req.query.distance);
    const maxGroupSize = parseInt(req.query.maxGroupSize);

    try {
        const getTourSearch = await Tour.find({

            city,
            distance: {
                $gte: distance
            },
            maxGroupSize: {
                $gte: maxGroupSize
            },
        }).populate('reviews');

        res.status(200).json({
            success: true,
            message: 'Successfully retrieved your tour by search',
            data: getTourSearch,
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: 'Could not fetch the tour through your search!',
            data: err.message,
        });
    }
};

const getFeaturedTour = async (req, res) => {

    try {
        const getFeatured = await Tour.find({ featured: true })
            .populate('reviews')
            .limit(8);

        res.status(200).json({
            success: true,
            count: getFeatured.length,
            message: 'Successfully retrieved all your featured tours',
            data: getFeatured,
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: 'Could not fetch all your featured tours!',
            data: err.message,
        });
    }
};

const getTourCount = async (req, res) => {

    try {
        const tourCount = await Tour.estimatedDocumentCount();

        res.status(200).json({
            success: true,
            message: 'Fetched all your tours!',
            data: tourCount,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            data: err.message,
        });
    }
};

module.exports = {
    createTour,
    getSingleTour,
    getAllTour,
    updateTour,
    deleteTour,
    getTourBySearch,
    getFeaturedTour,
    getTourCount
};