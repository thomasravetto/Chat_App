const express = require('express');

const loginRouter = require('./login/login.api');

const router = express.Router();

router.use('/login', apiRouter)
