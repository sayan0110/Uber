const dotenv = require('dotenv');
require('dotenv').config(); // Put this at the top of your main file (e.g., app.js)
const cors = require('cors');
const express = require('express');
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.route')
const captainRoutes = require('./routes/captain.route');
const cookieParser = require('cookie-parser');

connectToDb();
const app = express();





app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());





app.get('/', (req, res) => {
    res.send('Hello World');
})

app.use('/users',userRoutes)
app.use('/captains', captainRoutes)

module.exports = app;