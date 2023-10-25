const express = require('express');
const session = require('express-session');

function sessionChecker (req, res) {
    if (req.session.username && req.session.email) {
        console.log("user found!");
        res.json({ isAuthenticated: true, username: req.session.username, email: req.session.email });
    } else {
        console.log("User Not found");
        res.json({ isAuthenticated: false });
    }
}


module.exports = sessionChecker;