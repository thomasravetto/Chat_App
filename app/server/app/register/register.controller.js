const express = require('express');

const { handleRegister, validateEmail } = require('../../helpers/register/register.helper');

async function registerUser (req, res) {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            res.json({ error: "Email or Password not provided" });
            return;
        }

        if (!validateEmail(email)) {
            res.status(400).json({error: 'The Email format is invalid'});
            return;
        }

        const newUser = await handleRegister(username, email,  password);

        console.log('controller', newUser);

        if (newUser && newUser.email) {
            req.session.userid = newUser.id;
            req.session.username = newUser.username;
            req.session.email = newUser.email;

            res.json(newUser);
        } else {
            res.status(400).json({error: 'This User already exists'});
        }
    } catch (error) {
        return { error: error.message };
    }
}

module.exports = {
    registerUser
}