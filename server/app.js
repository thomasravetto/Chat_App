const express = require('express');
const morgan = require('morgan');

const api = require('./app/api');

const app = express();

app.use(express.json());
app.use(morgan('combined'));

app.use('/v1', api);

module.exports = app;