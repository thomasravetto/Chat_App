const express = require('express');

const { findUserHelper } = require('../../helpers/user/user.helper');

async function findUserByUsername (req, res) {
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

module.exports = {
    findUserByUsername,
}