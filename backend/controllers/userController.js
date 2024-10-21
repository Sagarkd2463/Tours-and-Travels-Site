const User = require('../models/User');

const createUser = async (req, res) => {

    const newUser = new User(req.body);

    try {
        const savedUser = await newUser.save();

        res.status(201).json({
            success: true,
            message: 'Successfully created new user!!',
            data: savedUser,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to create. Try again!',
            data: err.message,
        });
    }
};

const updateUser = async (req, res) => {

    const id = req.params.id;

    try {
        const updatedUser = await User.findByIdAndUpdate(id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                photo: req.body.photo,
                role: req.body.role,
            },
        }, { new: true });

        res.status(200).json({
            success: true,
            message: 'Successfully updated the user!',
            data: updatedUser,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to update your data!',
            data: err.message,
        });
    }
};

const deleteUser = async (req, res) => {

    const id = req.params.id;

    try {
        await User.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'Successfully deleted the user!',
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete your data!',
            data: err.message,
        });
    }
};

const getSingleUser = async (req, res) => {

    const id = req.params.id;

    try {
        const getUser = await User.findById(id);

        res.status(200).json({
            success: true,
            message: 'Successfully retrieved a user!',
            data: getUser,
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: 'Failed to find your desired user!',
            data: err.message,
        });
    }
};

const getAllUsers = async (req, res) => {

    try {
        const getUsers = await User.find({});

        res.status(200).json({
            success: true,
            count: getUsers.length,
            message: 'Successfully retrieved all your users!!',
            data: getUsers,
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: 'Could not fetch all your users!',
            data: err.message,
        });
    }
};

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getAllUsers,
    getSingleUser
};