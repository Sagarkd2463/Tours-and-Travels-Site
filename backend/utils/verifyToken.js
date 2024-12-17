const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1] || req.cookies.accessToken;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "You're not authorized!",
        });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({
                success: false,
                message: "Invalid token!",
            });
        }

        console.log("Decoded User:", user);
        req.user = user; // Attach user payload to req
        next();
    });
};

const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        console.log("Authenticated User:", req.user);

        if (req.user.id) {
            next();
        } else {
            return res.status(401).json({
                success: false,
                message: "You're not authenticated!",
            });
        }
    });
};

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role === "admin") {
            next();
        } else {
            return res.status(403).json({
                success: false,
                message: "Admin access only!",
            });
        }
    });
};

module.exports = { verifyToken, verifyUser, verifyAdmin };