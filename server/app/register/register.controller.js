const express = require('express');

const { handleRegister } = require('../../helpers/register/register.helper');

async function registerUser (req, res) {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            res.json({ error: "Invalid credentials" });
            return;
        }

        const newUser = await handleRegister(username, email,  password);

        res.json(newUser);
    } catch (error) {
        return { error: error.message };
    }
}

module.exports = {
    registerUser
}