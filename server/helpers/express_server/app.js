const express = require('express');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', '..', 'public')));

app.use(helmet());
app.use(morgan('combined'));

module.exports = app;