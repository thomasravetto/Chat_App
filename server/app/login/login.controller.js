const express = require('express');

const { authenticateUser } = require('../../helpers/authentication/auth.helper');

// Function to check if user exists in db, respond with token
async function loginUser (req, res) {
    const { email, password } = req.body;
    const user = await authenticateUser(email, password);
    res.send(user);
}

module.exports = {
    loginUser
}


// Function to register user in db