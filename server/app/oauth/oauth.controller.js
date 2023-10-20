const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');
const cookieSession = require('cookie-session');
const session = require('express-session');
const app = require('../../helpers/express_server/app');

const { googleAuthHelper, googleCallbackHelper, googleLogoutHelper, googleFailureHelper } = require('../../helpers/oauth/oauth.helper');

const config = {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
}

const AUTH_OPTIONS = {
    callbackURL: 'https://localhost:3500/v1/auth/google/callback',
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET
}

function verifyCallback (accessToken, refreshToken, profile, done) {

    const user = {
        id: profile.id,
        displayName: profile.displayName,
        email: profile.emails[0].value,
    }

    done(null, user);
}

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    done(null, id);
});

// Not sure it works from here

app.use(passport.initialize());
app.use(passport.session());

// To here

function googleAuth (req, res) {
    googleAuthHelper(req, res, passport);
}

function googleCallback (req, res) {
    console.log(req, req.query, req.user)
    googleCallbackHelper(req, res, passport);
}

function googleLogout (req, res) {
    googleLogoutHelper(req, res, passport);
}

function googleFailure (req, res) {
    googleFailureHelper(req, res, passport);
}

module.exports = {
    googleAuth,
    googleCallback,
    googleLogout,
    googleFailure
}