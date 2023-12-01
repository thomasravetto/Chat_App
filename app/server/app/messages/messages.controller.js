const express = require('express');

const { loadMessagesHelper, sendMessageHelper } = require('../../helpers/messages/messages.helper');

async function loadMessages (req, res) {
    const { chatId } = req.body;

    try {
        const messagesData = await loadMessagesHelper(chatId);

        res.status(200).json(messagesData);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function sendMessage (req, res) {
    const { chatId, senderId, content } = req.body;

    try {
        const sentMessage = await sendMessageHelper(chatId, senderId, content);

        res.status(200).json(sentMessage);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    loadMessages,
    sendMessage
}