require('dotenv').config();
require('./database/db');

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const tourRoute = require('./routes/tours');
const userRoute = require('./routes/user');
const authRoute = require('./routes/authUser');

const app = express();

app.use(express.json());
app.use('/auth', authRoute);
app.use('/tours', tourRoute);
app.use('/users', userRoute);

app.use(cors());
app.use(cookieParser());

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server running successfully on http://localhost:${PORT} `);
});