require('dotenv').config();
const fs = require('fs');
const https = require('https'); // set back to https
const { Server } = require('socket.io');

const appRouter = require('./appRouter');

const PORT = process.env.PORT || 3500;

const options = {
    key: fs.readFileSync(process.env.KEY_LOCATION),
    cert: fs.readFileSync(process.env.CERT_LOCATION)
}

const server = https.createServer(options, appRouter); // Creating HTTPS server

const io = new Server(server); // Creating Socket server

io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('send_message', (data) => {
        const {chatId, message} = data;
        socket.to(chatId).emit('receive_message', {
            message: message
        });
    })

    socket.on('join', (room) => {
        socket.join(room);
        socket.to(room).emit('user_connected', {
            message: `User connected to chat: ${room}`
        });
    });
});

function startServer () {
    server.listen(PORT, () => { // Change back to normal
        console.log('Server listening on port: ', PORT);
    })
}

startServer();

module.exports = { io }; // Exporting Socket server
