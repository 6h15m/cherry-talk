const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js');

const PORT = process.env.PORT || 3001;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.emit('message', { user: 'admin', text: `${user.name}님, ${user.room}에 오신 것을 환영합니다.` });
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}님이 입장하셨습니다!` });

    socket.join(user.room);

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });

  socket.on('disconnect', () => {
    console.log('User had left!');
  });
});

app.use(router);

server.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
