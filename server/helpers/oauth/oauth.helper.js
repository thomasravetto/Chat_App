function googleAuthHelper (req, res, passport) {
    passport.authenticate('google', {
        scope: ['email'],
    })(req, res);
}

function googleCallbackHelper (req, res, passport) {
    passport.authenticate('google', {
        failureRedirect: '/auth/failure',
        successRedirect: '/',
        session: true
    })(req, res);
    console.log('google called back')
}

function googleLogoutHelper (req, res) {
    req.logout();
    return res.redirect('/');
}

function googleFailureHelper (req, res) {
    res.send('Failed to log in');
}

module.exports = {
    googleAuthHelper,
    googleCallbackHelper,
    googleLogoutHelper,
    googleFailureHelper
}