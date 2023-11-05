const express = require('express');

const { findUserHelper, getUserInfoHelper, checkFriendshipHelper } = require('../../helpers/user/user.helper');

async function findUsersByUsername (req, res) {
    const { username } = req.body;

    const usersData = await findUserHelper(username);

    if (usersData.users) {

        const usersList = usersData.users;

        res.status(200).json({
            usersList,
            usersFound: usersList.length
        });
    } else if (usersData.error) {
        const error = usersData.error;
        res.status(400).json({ error });
    }
}

async function getUserInfo (req, res) {
    const {username} = req.body;

    try {
        const userData = await getUserInfoHelper(username);

        if (userData) {
            res.status(200).json(userData);
        } else {
            throw new Error('Error while getting user data');
        }
    } catch (error) {
        res.status(400).json({error: error.message});
    }

}

async function checkFriendship (req, res) {
    const { viewerUserId, profileUserId } = req.body;
    try {
        const friendshipData = await checkFriendshipHelper(viewerUserId, profileUserId);

        res.json(friendshipData);
    } catch (error) {
        return { error: error.message };
    }
}

async function sendFriendshipRequest (req, res) {

}

module.exports = {
    findUsersByUsername,
    getUserInfo,
    checkFriendship,
    sendFriendshipRequest
}