function googleAuthHelper (req, res, passport) {
    passport.authenticate('google', {
        scope: ['email' ,'profile'],
    })(req, res);
}

function googleCallbackHelper (req, res, passport) {
    passport.authenticate('google', {
        failureRedirect: '/auth/failure',
        successRedirect: '/',
        session: true
    })(req, res, (err) => {
        if (err) {
            console.log(err);
            return res.redirect('/auth/failure');
        }

        console.log('User:');
        res.redirect('/');
    });
}

function googleLogoutHelper (req, res, next) {
    req.logout((err) => {
        if (err) {
        return next(err);
    }
    res.redirect('/authentication');
    });
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