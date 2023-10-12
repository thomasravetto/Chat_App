const http = require('http');
require('dotenv').config();

const app = require('./app');

const PORT = process.env.PORT || 3500;

const server = http.createServer(app);

function startServer () {
    server.listen(PORT, () => {
        console.log('Server listening on port: ', PORT);
    })
}

startServer();