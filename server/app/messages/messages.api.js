const express = require('express');

const messagesRouter = express.Router();

const { loadMessages, sendMessage } = require('./messages.controller');

messagesRouter.post('/get_messages', loadMessages);
messagesRouter.post('/send_message', sendMessage);

module.exports = messagesRouter;