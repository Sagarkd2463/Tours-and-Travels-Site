const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.startsWith('Bearer ')
            ? authHeader.split(' ')[1]
            : req.cookies?.accessToken;

        if (!token) {
            return res.status(401).json({ success: false, message: "Authentication required: Token missing!" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.user = decoded;
        next();
    } catch (err) {
        const errorMessage = err.name === "TokenExpiredError"
            ? "Authentication required: Token has expired!"
            : "Authentication required: Invalid token!";
        return res.status(401).json({ success: false, message: errorMessage });
    }
};

const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user && req.user?.id || req.user?._id || req.user?.email) {
            next();
        } else {
            return res.status(401).json({ success: false, message: "Authentication required: User validation failed!" });
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