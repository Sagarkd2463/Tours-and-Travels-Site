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
            data: err,
        });
    }
};

const updateTour = async (req, res) => {

    const id = req.params.id;

    try {
        const updatedTour = await Tour.findByIdAndUpdate(id, {
            $set: req.body
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
            data: err,
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
            data: err,
        });
    }
};

const getSingleTour = async (req, res) => {

    const id = req.params.id;

    try {
        const getSingledTour = await Tour.findById(id);

        res.status(200).json({
            success: true,
            message: 'Successfully retrieved a tour',
            data: getSingledTour,
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: 'Failed to find your desired tour!',
            data: err,
        });
    }
};

const getAllTour = async (req, res) => {

    try {
        const getAllTours = await Tour.find({});

        res.status(200).json({
            success: true,
            message: 'Successfully retrieved all your tours',
            data: getAllTours,
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: 'Could not fetch all your tours!',
            data: err,
        });
    }
};

module.exports = {
    createTour,
    getSingleTour,
    getAllTour,
    updateTour,
    deleteTour,
};