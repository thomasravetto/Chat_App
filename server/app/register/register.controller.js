const express = require('express');

const { handleRegister } = require('../../helpers/register/register.helper');

async function registerUser (req, res) {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            res.json({ error: "Missing credentials" });
            return;
        }

        const newUser = await handleRegister(username, email,  password);

        if (newUser && newUser.email) {
            req.session.user = newUser.email

            res.json(newUser);
        } else {
            res.status(400).json({error: 'Authentication failed'});
        }
    } catch (error) {
        return { error: error.message };
    }
}

module.exports = {
    registerUser
}