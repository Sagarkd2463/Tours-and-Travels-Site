require('dotenv').config();
require('./database/db');

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const tourRoute = require('./routes/tours');
const userRoute = require('./routes/user');
const authRoute = require('./routes/authUser');
const reviewRoute = require('./routes/reviews');
const bookingRoute = require('./routes/booking');

const app = express();

const corsOptions = {
    origin: true,
    credential: true,
};

app.use(express.json());
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/review', reviewRoute);
app.use('/api/v1/booking', bookingRoute);

app.use(cors(corsOptions));
app.use(cookieParser());

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server running successfully on http://localhost:${PORT} `);
});