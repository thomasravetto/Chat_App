const express = require('express');

const { handleRegister } = require('../../helpers/register/register.helper');

async function registerUser (req, res) {
    try {
        const { username, email, password, confirmation } = req.body;

        if (!username || !email || !password || !confirmation) {
            res.json({ error: "Invalid credentials" });
            return;
        }
        if (password !== confirmation) {
            res.json({ error: "Invalid credentials" });
            return;
        }

        const newUser = await handleRegister(username, email,  password);

        console.log("controller",newUser);

        res.json(newUser);
    } catch (error) {
        return { error: error.message };
    }
}

module.exports = {
    registerUser
}