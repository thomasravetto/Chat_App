const express = require('express');

const api = require('./app/api');
const appRouter = require('./helpers/express_server/app');

appRouter.use('/v1', api);

appRouter.get('/', (req, res) => {
    res.send('ciao')
})

module.exports = appRouter;