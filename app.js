const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const isValidJwt = (header) => {
  const token = header.split(process.env.SPL)[1];
  if (token === process.env.UGIH) {
    return true;
  } else {
    return false;
  }
};

app.get('/api/teams', (req, res) => {
    res.json({ username: 'test' })
});


io.use((socket, next) => {
  const header = socket.handshake.headers['authorization'];
  if (isValidJwt(header)) {
    return next();
  }
  return next(new Error('authentication error'));
});

io.on('connection', (socket) => {
  
  socket.on('room', room => {
    console.log(room);
    socket.join(room);
  });

});

setInterval(() => {
  io.sockets.to('room1').emit('message', 'what is going on, party people?');
}, 3000);

setInterval(() => {
  io.sockets.to('room2').emit('message', 'anyone in this room yet?');
}, 3000);


server.listen(3000, () => {
    console.log('listening on *:3000');
  });