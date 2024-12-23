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
        return res.status(401).json({ success: false, message: "You're not authorized!" });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;

        next();
    } catch (firebaseError) {
        console.error("Firebase token verification failed:", firebaseError.message);

        if (firebaseError.code !== 'auth/argument-error') {
            return res.status(403).json({
                success: false,
                message: "Invalid Firebase token!"
            });
        }
    }

    // Fallback: Custom JWT verification (use appropriate secret/public key)
    try {
        const publicKeyResponse = await fetch('https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com');
        const decodedToken = jwt.verify(token, publicKeyResponse.data, {
            algorithms: ['RS256'],
            audience: process.env.FIREBASE_PROJECT_ID,
            issuer: `https://securetoken.google.com/${process.env.FIREBASE_PROJECT_ID}`,
        });
        req.user = decodedToken;
        next();
    } catch (err) {
        console.error("Custom JWT token verification failed:", err.message);
        return res.status(403).json({ success: false, message: "Invalid token!" });
    }
};

module.exports = { verifyToken, verifyUser, verifyAdmin, verifyFirebaseToken };