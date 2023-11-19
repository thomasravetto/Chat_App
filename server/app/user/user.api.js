const express = require('express');

const userRouter = express.Router();

const { findUsersByUsername, getUserInfo, checkFriendship, sendFriendshipRequest, handleIncomingRequests, getIncomingRequests } = require('./user.controller');

userRouter.post('/search_user', findUsersByUsername);
userRouter.post('/get_user_data', getUserInfo);
userRouter.post('/check_friendship', checkFriendship);
userRouter.post('/send_friendship_request', sendFriendshipRequest);
userRouter.post('/handle_friendship_request', handleIncomingRequests);
userRouter.post('/get_incoming_requests', getIncomingRequests);

module.exports = userRouter;