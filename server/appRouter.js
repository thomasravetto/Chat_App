const path = require('path');
const express = require('express');

const api = require('./app/api');
const appRouter = require('./helpers/express_server/app');

appRouter.use('/v1', api);

appRouter.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

module.exports = appRouter;