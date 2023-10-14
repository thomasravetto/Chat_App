const passport = require('passport');
const helmet = require('helmet');
const { Strategy } = require('passport-google-oauth20');
const cookieSession = require('cookie-session');

const { googleAuthHelper, googleCallbackHelper, googleLogoutHelper, googleFailureHelper } = require('../../helpers/oauth/oauth.helper');

const config = {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    COOKIE_KEY_1: process.env.CLIENT_KEY_1,
    COOKIE_KEY_2: process.env.CLIENT_KEY_2,
}

const AUTH_OPTIONS = {
    callbackURL: 'localhost:3500/v1/auth/google/callback',
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET
}

function googleAuth (req, res) {
    googleAuthHelper(req, res);
}

function googleCallback (req, res) {
    googleCallbackHelper(req, res);
}

function googleLogout (req, res) {
    googleLogoutHelper(req, res);
}

function googleFailure (req, res) {
    googleFailureHelper(req, res);
}

module.exports = {
    googleAuth,
    googleCallback,
    googleLogout,
    googleFailure
}