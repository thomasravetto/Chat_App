const express = require('express');

const chatRouter = express.Router();

const { getChatForUsersIds, createChatForUsersIds } = require('./chat.controller');

chatRouter.post('/get_chat', getChatForUsersIds);
chatRouter.post('/create_chat', createChatForUsersIds);

module.exports = chatRouter;