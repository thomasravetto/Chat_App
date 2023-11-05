const express = require('express');

const userRouter = express.Router();

const { findUsersByUsername, getUserInfo, checkFriendship, sendFriendshipRequest } = require('./user.controller');

userRouter.post('/search_user', findUsersByUsername);
userRouter.post('/get_user_data', getUserInfo);
userRouter.post('/check_friendship', checkFriendship);
userRouter.post('/send_friendship_request', sendFriendshipRequest);
// userRouter.post('/handle_request', handleIncomingRequests);

module.exports = userRouter;