const express = require('express');

const userRouter = express.Router();

const { findUserByUsername, sendRequestToUser, handleIncomingRequests } = require('./user.controller');

userRouter.post('/search_user', findUserByUsername);
// userRouter.post('/send_request_to_user', sendRequestToUser);
// userRouter.post('/handle_request', handleIncomingRequests);

module.exports = userRouter;