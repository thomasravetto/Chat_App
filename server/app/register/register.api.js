const express = require('express');

const registerRouter = express.Router();

const { registerUser } = require('./register.controller');

// handle user registration
registerRouter.post('/', registerUser);

module.exports = registerRouter;