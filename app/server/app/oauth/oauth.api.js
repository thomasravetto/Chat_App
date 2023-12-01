const express = require('express');

const oauthRouter = express.Router();

const { googleAuth, googleCallback, googleLogout, googleFailure } = require('./oauth.controller');

oauthRouter.get('/google', googleAuth);

oauthRouter.get('/google/callback', googleCallback);

oauthRouter.get('/logout', googleLogout);

oauthRouter.get('/failure', googleFailure);

module.exports = oauthRouter;