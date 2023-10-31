const express = require('express');

const registerRouter = express.Router();

const { registerUser } = require('./register.controller');

// handle user Registration
registerRouter.post('/', registerUser);

module.exports = registerRouter;