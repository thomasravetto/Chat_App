const express = require('express');

const { findUserHelper } = require('../../helpers/user/user.helper');
const { getUserInfoHelper } = require('../../helpers/user/user.helper');

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

module.exports = {
    findUsersByUsername,
    getUserInfo,
}