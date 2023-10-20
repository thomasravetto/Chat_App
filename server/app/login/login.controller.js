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

            if (user && user.length > 0) {
                req.session.user = user[0].email

                res.json(user[0]);
            } else {
                return res.status(400).json({error: 'Authentication failed'})
            }

    } catch (error) {
        return { error: error.message };
    }
}

module.exports = {
    loginUser
}