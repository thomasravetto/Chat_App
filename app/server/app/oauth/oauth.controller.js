const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');
const cookieSession = require('cookie-session');
const session = require('express-session');
const app = require('../../helpers/express_server/app');

const { googleAuthHelper, googleCallbackHelper, googleLogoutHelper, googleFailureHelper } = require('../../helpers/oauth/oauth.helper');
const {registerGoogleUserIntoDatabase} = require('./oauth.data-access');

const config = {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
}

const AUTH_OPTIONS = {
    callbackURL: '/v1/auth/google/callback',
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET
}
async function verifyCallback (accessToken, refreshToken, profile, done) {
    const username = profile._json.name;
    const email = profile._json.email;

    const user = await registerGoogleUserIntoDatabase(username, email, done);

    if (user && user.id) {
        done(null, user);
    } else {
        done(new Error("User object is missing 'id'"));
    }
}

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

passport.serializeUser((user, done) => {
    const userid = user.id;
    const username = user.username;
    const email = user.email;
    done(null, { userid: userid, username: username, email: email});
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

// Not sure it works from here

app.use(passport.initialize());
app.use(passport.session());

// To here

function googleAuth (req, res) {
    googleAuthHelper(req, res, passport);
}

function googleCallback (req, res) {
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