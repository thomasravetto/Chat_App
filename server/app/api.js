const express = require('express');

const loginRouter = require('./login/login.api');
const registerRouter = require('./register/register.api');
const oauthRouter = require('./oauth/oauth.api');

const api = express.Router();

api.use('/login', loginRouter);
api.use('/register', registerRouter)
api.use('/auth', oauthRouter);

module.exports = api;
