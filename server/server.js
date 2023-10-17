require('dotenv').config();
const http = require('http');

const appRouter = require('./appRouter');

const PORT = process.env.PORT || 3500;

const server = http.createServer(appRouter);

function startServer () {
    server.listen(PORT, () => {
        console.log('Server listening on port: ', PORT);
    })
}

startServer();
