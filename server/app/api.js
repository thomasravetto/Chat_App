const express = require('express');

const loginRouter = require('./login/login.api');

const api = express.Router();

api.use('/login', loginRouter);

module.exports = api;
