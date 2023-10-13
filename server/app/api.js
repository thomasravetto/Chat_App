const express = require('express');

const loginRouter = require('./login/login.api');
const registerRouter = require('./register/register.api');

const api = express.Router();

api.use('/login', loginRouter);
api.use('/register', registerRouter)

module.exports = api;
