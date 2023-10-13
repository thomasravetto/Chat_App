const express = require('express');

const { handleLogin } = require('../../helpers/authentication/auth.helper');

// Function to check if user exists in db, respond with token
async function loginUser (req, res) {
    try {
        const { email, password } = req.body;
            if (!email || !password) {
                res.json({ error: "Invalid credentials" })
            }
            const user = await handleLogin(email, password);

            res.json(user);
    } catch {
        return { error: error.message };
    }
}

module.exports = {
    loginUser
}