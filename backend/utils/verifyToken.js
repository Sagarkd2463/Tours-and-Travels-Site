const jwt = require('jsonwebtoken');
const admin = require('../utils/firebaseAdmin');

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

const verifyFirebaseToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.split(' ')[1]
        : null;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "You're not authorized!"
        });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        return next(); // Firebase ID token verified successfully
    } catch (firebaseError) {
        // If the error is not related to argument error (e.g., token format issue), proceed with custom JWT verification
        if (firebaseError.code !== 'auth/argument-error') {
            console.error("Firebase token verification failed:", firebaseError.message);
            return res.status(403).json({
                success: false,
                message: "Invalid Firebase token!"
            });
        }
    }

    // If Firebase ID token verification fails, attempt to verify as a custom JWT token (HS256)
    jwt.verify(token, process.env.JWT_SECRET_KEY, { algorithms: ['RS256'] }, (err, user) => {
        if (err) {
            console.error("Custom JWT token verification failed:", err.message);
            return res.status(403).json({ success: false, message: "Invalid token!" });
        }

        console.log("Decoded user:", user);
        req.user = user;
        next();
    });
};

module.exports = { verifyToken, verifyUser, verifyAdmin, verifyFirebaseToken };