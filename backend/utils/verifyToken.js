const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith('Bearer ')
        ? authHeader.split(' ')[1]
        : req.cookies?.accessToken;

    if (!token) {
        return res.status(401).json({ success: false, message: "Authentication required: Token missing!" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded; // Attach decoded user info to the request
        next();
    } catch (err) {
        console.error("Token verification error:", err.message);
        return res.status(403).json({ success: false, message: "Invalid or expired token!" });
    }
};

const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user && (req.user.id || req.user._id)) {
            next();
        } else {
            console.error("Authentication failed. User not found in token payload.");
            return res.status(401).json({ success: false, message: "Authentication required: User invalid!" });
        }
    });
};

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user && req.user.role === "admin") {
            next();
        } else {
            console.error("Admin access denied. User role:", req.user?.role);
            return res.status(403).json({
                success: false,
                message: "Admin access only!",
            });
        }
    });
};

module.exports = { verifyToken, verifyUser, verifyAdmin };