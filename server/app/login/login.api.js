// Router to handle HTTP requests
const express = require('express');

const loginRouter = express.Router();

const { loginUser } = require('./login.controller');

// TODO: function to handle login auth
loginRouter.post('/', loginUser);

// // TODO: function to handle Oauth2
// loginRouter.post('/oauth', loginUserOauth);

// // TODO: function to register user
// loginRouter.post('/', registerUser);

module.exports = loginRouter;