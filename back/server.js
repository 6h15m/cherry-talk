const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const port = 4001;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
  socket.on('send messsage', (item) => {
    const msg = item.name + ':' + item.message;
    console.log(msg);
    io.emit('receive message', { name: item.name, message: item.message });
  });
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}!`));
