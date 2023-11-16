const express = require('express');

const loginRouter = require('./login/login.api');
const registerRouter = require('./register/register.api');
const oauthRouter = require('./oauth/oauth.api');
const userRouter = require('./user/user.api');
const friendsRouter = require('./friends/friends.api');
const chatRouter = require('./chat/chat.api');
const messagesRouter = require('./messages/messages.api');

const { sessionChecker } = require('../helpers/session/session_checker.helper');

const api = express.Router();

api.use('/login', loginRouter);
api.use('/register', registerRouter);
api.use('/auth', oauthRouter);
api.use('/user', userRouter);
api.use('/friends', friendsRouter);
api.use('/chat', chatRouter);
api.use('/messages', messagesRouter);

api.get('/check_session', sessionChecker);

module.exports = api;
