const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { username, email, password, photo } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email!',
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            photo,
        });

        await newUser.save();

        const { _id } = newUser;
        res.status(201).json({
            success: true,
            message: 'Successfully created new user!',
            data: { _id, username, email, photo },
        });
    } catch (err) {
        console.error("Error creating user:", err.message);
        res.status(500).json({
            success: false,
            message: 'Failed to create user. Try again!',
            error: err.message,
        });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found!',
            });
        }

        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            return res.status(401).json({
                success: false,
                message: 'Incorrect email or password!',
            });
        }

        const { password: pwd, role, ...info } = user._doc;

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role,
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '15d' }
        );

        res.cookie('accessToken', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        });

        return res.status(200).json({
            success: true,
            message: 'Successfully logged in.',
            token,
            role,
            data: { ...info },
        });
    } catch (err) {
        console.error("Login error:", err.message);
        res.clearCookie('accessToken').status(500).json({
            success: false,
            message: 'Failed to login!',
        });
    }
};

const oauthHandler = async (req, res, platform) => {
    try {
        const { name, email, photo, firebaseUid } = req.body;

        if (!name || !email || !firebaseUid) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: name, email, or firebaseUid.',
            });
        }

        let user = await User.findOne({ email });

        if (user) {
            // Check if the auth provider matches
            if (user.authProvider !== platform) {
                return res.status(400).json({
                    success: false,
                    message: `This email is already registered with ${user.authProvider}. Please use another email with other provider.`,
                });
            }

            // Generate JWT token for existing user
            const token = jwt.sign(
                { id: user._id, email: user.email, role: user.role },
                process.env.JWT_SECRET_KEY,
                { expiresIn: '15d' }
            );

            return res
                .cookie('accessToken', token, {
                    httpOnly: true,
                    expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
                })
                .status(200)
                .json({
                    success: true,
                    message: `Successfully logged in with ${platform}.`,
                    data: {
                        id: user._id,
                        username: user.username,
                        email: user.email,
                        photo: user.photo,
                        role: user.role,
                    },
                });
        }

        // Create new user
        const usernameBase = name.split(' ').join('').toLowerCase();
        const uniqueUsername = `${usernameBase}${Math.random().toString(36).slice(-4)}`;

        const newUser = new User({
            username: uniqueUsername,
            email,
            photo,
            authProvider: platform,
            firebaseUid,
        });

        await newUser.save();

        // Generate JWT token for the new user
        const token = jwt.sign(
            { id: newUser._id, email: newUser.email, role: newUser.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '15d' }
        );

        res
            .cookie('accessToken', token, {
                httpOnly: true,
                expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
            })
            .status(201)
            .json({
                success: true,
                message: `Successfully created a new user via ${platform}.`,
                data: {
                    id: newUser._id,
                    username: newUser.username,
                    email: newUser.email,
                    photo: newUser.photo,
                    role: newUser.role,
                },
            });
    } catch (err) {
        console.error(`${platform} OAuth Error:`, err.message);
        res.status(500).json({
            success: false,
            message: `Failed to authenticate with ${platform}.`,
            error: err.message,
        });
    }
};

const googleOAuth = async (req, res) => {
    await oauthHandler(req, res, 'google');
};

const facebookOAuth = async (req, res) => {
    await oauthHandler(req, res, 'facebook');
};

const githubOAuth = async (req, res) => {
    await oauthHandler(req, res, 'github');
};

module.exports = { register, login, googleOAuth, facebookOAuth, githubOAuth };