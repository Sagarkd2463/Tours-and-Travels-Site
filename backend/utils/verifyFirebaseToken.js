const admin = require('../utils/firebaseAdmin');

const verifyFirebaseToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Authorization header is missing or malformed.",
            });
        }

        // Extract the token
        const token = authHeader.split(' ')[1];

        // Verify the token using Firebase Admin SDK
        const decodedToken = await admin.auth().verifyIdToken(token);

        // Attach user data to the request object
        req.user = decodedToken;

        next();
    } catch (error) {
        console.error("Error verifying Firebase token:", error);

        let errorMessage = "Invalid Firebase token. Authentication failed."
        if (error.code === 'auth/id-token-expired') {
            errorMessage = "Firebase token has expired. Please log in again.";
        }

        return res.status(403).json({
            success: false,
            message: errorMessage,
        });
    }
};

const verifyFirebaseUser = (req, res, next) => {
    verifyFirebaseToken(req, res, () => {
        if (req.user && (req.user.uid || req.user.email)) {
            next();
        } else {
            return res.status(401).json({
                success: false,
                message: "Authentication required: User validation failed.",
            });
        }
    });
};

module.exports = { verifyFirebaseToken, verifyFirebaseUser };