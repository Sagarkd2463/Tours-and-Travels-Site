const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith('Bearer ')
        ? authHeader.split(' ')[1]
        : req.cookies.accessToken;

    if (!token) {
        return res.status(401).json({ success: false, message: "You're not authorized!" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ success: false, message: "Invalid or expired token!" });
    }
};

// Verify the user using the JWT token
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

// Verify if the user has admin rights
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