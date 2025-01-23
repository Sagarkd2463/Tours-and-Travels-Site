const admin = require('../utils/firebaseAdmin');

const verifyFirebaseToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.split(' ')[1]
        : req.cookies?.access_Token;

    if (!token) {
        return res.status(401).json({ success: false, message: "You're not authorized!" });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next();
    } catch (firebaseError) {
        console.error("Firebase token verification failed:", firebaseError.message);
        return res.status(403).json({ success: false, message: "Invalid Firebase token!" });
    }
};

const verifyFirebaseUser = async (req, res, next) => {
    await verifyFirebaseToken(req, res, () => {
        if (req.user && (req.user.firebaseUid || req.user.email)) {
            next();
        } else {
            return res.status(401).json({
                success: false,
                message: "Authentication required: User validation failed!",
            });
        }
    });
};

module.exports = { verifyFirebaseToken, verifyFirebaseUser };