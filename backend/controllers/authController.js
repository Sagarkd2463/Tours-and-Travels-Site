const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {

    try {

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            photo: req.body.photo,
        });

        await newUser.save();

        res.status(201).json({
            success: true,
            message: 'Successfully created new user!!',
            data: newUser,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to create. Try again!',
            data: err.message,
        });
    }
};

const login = async (req, res) => {
    const email = req.body.email;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found!!'
            });
        }

        const checkPassword = await bcrypt.compare(req.body.password, user.password);

        if (!checkPassword) {
            return res.status(401).json({
                success: false,
                message: 'Incorrect email or password!'
            });
        }

        const { password, role, ...info } = user._doc;

        const token = jwt.sign({
            id: user._id,
            role: user.role
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: '15d'
        });

        res.cookie('accessToken', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        })
            .status(200)
            .json({
                success: true,
                message: 'Successfully logged in...',
                token,
                role,
                data: { ...info }
            });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to login!'
        });
    }
};

module.exports = {
    register,
    login
};