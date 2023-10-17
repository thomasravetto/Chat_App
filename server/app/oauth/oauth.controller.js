const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');
const cookieSession = require('cookie-session');
const app = require('../../helpers/express_server/app');

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

function verifyCallback (accessToken, refreshToken, profile, done) {
    console.log("Google profile", profile);
    done(null, profile);
}

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    done(null, id);
});

// Not sure it works from here

app.use(cookieSession({
    name: 'session',
    maxAge: 24 * 60 * 60 * 1000, // One 24 hours day
    keys: [config.COOKIE_KEY_1, config.COOKIE_KEY_2]
}))

app.use(passport.initialize());
app.use(passport.session());

// To here

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