
const admin = require('firebase-admin');

const serviceAccount = require('../config/mern-tour-booking-firebase-adminsdk-9aljm-ea6bdf5793.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;