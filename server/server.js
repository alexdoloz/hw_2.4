const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = 3000;

const messages = [];

io.on('connect', (socket) => {
    console.log("Connected ", socket.id);
    socket.on('message', (message) => {
        messages.push(message);
        console.log('message ', JSON.stringify(message));
        socket.broadcast.emit('message', message);
    });
    socket.on('login', (message) => {
        const { nickname } = message;
        console.log('login ', nickname);
        socket.broadcast.emit('message', {
            text: `${nickname} connected`,
            author: "Socket Chat",
            isServiceMessage: true
        });
    });
});

http.listen(port, () => { console.log(`Server started on ${port}`)});