const admin = require('../utils/firebaseAdmin');
const fetch = require('node-fetch');

// Firebase token verification
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

        // Handle Firebase verification failure
        if (firebaseError.code !== 'auth/argument-error') {
            return res.status(403).json({
                success: false,
                message: "Invalid Firebase token!"
            });
        }

        // Fallback to custom JWT verification (if Firebase token verification fails)
        try {
            const publicKeyResponse = await fetch('https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com');
            const publicKeyData = await publicKeyResponse.json();
            const publicKey = publicKeyData['https://securetoken.google.com/' + process.env.FIREBASE_PROJECT_ID];

            // Verify the token using RS256 (Firebase custom JWT verification)
            const decodedCustomToken = jwt.verify(token, publicKey, {
                algorithms: ['RS256'],
                audience: process.env.FIREBASE_PROJECT_ID,
                issuer: `https://securetoken.google.com/${process.env.FIREBASE_PROJECT_ID}`,
            });

            req.user = decodedCustomToken;
            next();
        } catch (err) {
            console.error("Custom JWT token verification failed:", err.message);
            return res.status(403).json({ success: false, message: "Invalid token!" });
        }
    }
};

module.exports = { verifyFirebaseToken };