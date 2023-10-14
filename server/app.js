const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const api = require('./app/api');

const app = express();

app.use(express.json());
app.use(morgan('combined'));
app.use(helmet())

app.use('/v1', api);

module.exports = app;