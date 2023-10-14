const express = require('express');

const oauthRouter = express.Router();

const { googleAuth, googleCallback, googleLogout, googleFailure } = require('./oauth.controller');

oauthRouter.get('/auth/google', googleAuth);

oauthRouter.get('/auth/google/callback', googleCallback);

oauthRouter.get('/auth/logout', googleLogout);

oauthRouter.get('/failure', googleFailure);

module.exports = oauthRouter;