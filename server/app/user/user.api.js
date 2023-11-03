const express = require('express');

const userRouter = express.Router();

const { findUsersByUsername, getUserInfo, sendRequestToUser, handleIncomingRequests } = require('./user.controller');

userRouter.post('/search_user', findUsersByUsername);
userRouter.post('/get_user_data', getUserInfo);
// userRouter.post('/send_request_to_user', sendRequestToUser);
// userRouter.post('/handle_request', handleIncomingRequests);

module.exports = userRouter;