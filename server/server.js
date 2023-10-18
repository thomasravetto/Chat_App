require('dotenv').config();
const fs = require('fs');
const https = require('https');

const appRouter = require('./appRouter');

const PORT = process.env.PORT || 3500;

const options = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
}

const server = https.createServer(options, appRouter);

function startServer () {
    server.listen(PORT, () => {
        console.log('Server listening on port: ', PORT);
    })
}

startServer();
