const { googleAuthHelper, googleCallbackHelper, googleLogoutHelper, googleFailureHelper } = require('../../helpers/oauth/oauth.helper');

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