require('dotenv').config();
require('./database/db');

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const tourRoute = require('./routes/tours');

const app = express();

app.use(express.json());
app.use('/tours', tourRoute);

app.use(cors());
app.use(cookieParser());

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server running successfully on http://localhost:${PORT} `);
});