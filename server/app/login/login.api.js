// Router to handle HTTP requests
const express = require('express');

const loginRouter = express.Router();

const { loginUser } = require('./login.controller');

// TODO: function to handle login auth
loginRouter.post('/', loginUser);

// TODO: function to handle Oauth2

// TODO: function to register user

module.exports = loginRouter;