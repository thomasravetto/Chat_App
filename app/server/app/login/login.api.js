const express = require('express');

const loginRouter = express.Router();

const { loginUser } = require('./login.controller');

// Handle user Login
loginRouter.post('/', loginUser);

module.exports = loginRouter;