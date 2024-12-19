const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.split(' ')[1]
        : req.cookies.accessToken;

    if (!token) {
        console.error("Token missing");
        return res.status(401).json({ success: false, message: "You're not authorized!" });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            console.error("Token verification failed:", err.message);
            return res.status(403).json({ success: false, message: "Invalid token!" });
        }

        console.log("Decoded user:", user);
        req.user = user;
        next();
    });
};

const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        console.log("Authenticated User:", req.user);
        if (req.user && (req.user.id || req.user._id)) {
            next();
        } else {
            return res.status(401).json({ success: false, message: "You're not authenticated!" });
        }
    });
};

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user && req.user.role === "admin") {
            next();
        } else {
            console.error("Admin access denied. User:", req.user);
            return res.status(403).json({
                success: false,
                message: "Admin access only!",
            });
        }
    });
};

module.exports = { verifyToken, verifyUser, verifyAdmin };