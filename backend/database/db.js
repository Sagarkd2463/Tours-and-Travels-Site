const mongoose = require('mongoose');
require('dotenv').config();

const URL = process.env.MONGODB_URI;

mongoose.connect(URL, {
    serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds if MongoDB server is unreachable
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
})
    .then(() => {
        console.log("MongoDB Connected Successfully...");
    })
    .catch((err) => {
        console.log("No DB Connected", err);
    });

