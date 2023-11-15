const express = require('express');

const { getChatForUsersIdsHelper, createChatForUsersIdsHelper } = require('../../helpers/chat/chat.helper');

async function getChatForUsersIds (req, res) {
    try {
        const { userId, friendId } = req.body;

        const chatData = await getChatForUsersIdsHelper(userId, friendId);

        res.status(200).json(chatData);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function createChatForUsersIds (req, res) {
    try {
        const { userId, friendId } = req.body;

        const newChatData = await createChatForUsersIdsHelper(userId, friendId);

        res.status(200).json(newChatData);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getChatForUsersIds,
    createChatForUsersIds
}