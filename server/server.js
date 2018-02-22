const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = 3000;

const messages = [];

io.on('connect', (socket) => {
    socket.broadcast.emit('message', {
        text: `${socket.id} connected`,
        author: "Socket Chat"
    });
    console.log("Connected ", socket.id);
    socket.on('message', (message) => {
        messages.push(message);
        console.log('message ', JSON.stringify(message));
        socket.broadcast.emit('message', message);
    });
});

http.listen(port, () => { console.log(`Server started on ${port}`)});