const express = require('express');

const { getFriendsOfUserIdHelper } = require('../../helpers/friends/friends.helper');

async function getFriendsOfUserId (req, res) {
    try {
        const { userId } = req.body;

        const friendsList = await getFriendsOfUserIdHelper(userId);

        res.status(200).json(friendsList);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getFriendsOfUserId,
}