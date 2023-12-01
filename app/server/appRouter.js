const path = require('path');

const api = require('./app/api');
const appRouter = require('./helpers/express_server/app');

appRouter.use('/v1', api);

appRouter.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/authentication')
    })
})

appRouter.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

module.exports = appRouter;