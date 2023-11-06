function sessionChecker (req, res) {
    if ((req.session.userid && req.session.username && req.session.email) || (req.session.passport && req.session.passport.user)) {
        console.log("User found!");

        const id = req.session.userid || req.session.passport.user.userid;
        const username = req.session.username || req.session.passport.user.username;
        const email = req.session.email || req.session.passport.user.email;

        res.json({ isAuthenticated: true, id:id, username: username, email: email });
    } else {
        console.log("User Not found");
        res.json({ isAuthenticated: false });
    }
}

module.exports = { sessionChecker };