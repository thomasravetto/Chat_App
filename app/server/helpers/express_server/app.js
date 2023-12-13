const express = require('express');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');
const session = require('express-session');
const cors = require('cors');

const app = express();

const config = {
    COOKIE_KEY_1: process.env.COOKIE_KEY_1,
    COOKIE_KEY_2: process.env.COOKIE_KEY_2,
}

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', '..', 'public')));

app.use(session({
    secret: config.COOKIE_KEY_1,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,  // Set back to true if using HTTPS
        maxAge: 24 * 60 * 60 * 1000,  // 24 hours in milliseconds
    },
}))

app.use(cors());

app.use(helmet());
app.use(morgan('combined'));

module.exports = app;