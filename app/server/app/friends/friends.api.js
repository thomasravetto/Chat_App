const express = require('express');

const friendsRouter = express.Router();

const { getFriendsOfUserId } = require('./friends.controller');

friendsRouter.post('/get_friends', getFriendsOfUserId);

module.exports = friendsRouter;