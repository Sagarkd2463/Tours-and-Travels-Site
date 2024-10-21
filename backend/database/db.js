const mongoose = require('mongoose');
require('dotenv').config();

const URL = process.env.MONGODB_URI;

mongoose.connect(URL)
    .then(() => {
        console.log("MongoDB Connected Successfully...");
    })
    .catch((err) => {
        console.log("No DB Connected", err);
    });

