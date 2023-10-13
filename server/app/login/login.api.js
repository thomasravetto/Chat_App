// Router to handle HTTP requests
const express = require('express');

const loginRouter = express.Router();

const { loginUser } = require('./login.controller');

// TODO: handle login authentication
loginRouter.post('/', loginUser);

// // TODO: function to handle Oauth2
// loginRouter.post('/oauth', loginUserOauth);

module.exports = loginRouter;