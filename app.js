const express = require('express');
const app = express();
const http = require('http');

app.use(express.json());

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const isValidJwt = (header) => {
  const token = header.split('8')[1];
  if (token === 'djfnbkskdf') {
    return true;
  } else {
    return false;
  }
};

io.use((socket, next) => {
  const header = socket.handshake.headers['authorization'];
  console.log(header);
  if (isValidJwt(header)) {
    return next();
  }
  return next(new Error('authentication error'));
});


io.on('connection', (socket) => {
  console.log("user connected!");
  /*
  socket.on('room', room => {
    console.log("new channel created: " +  room);
    socket.join(room);
  });*/
  /*
  socket.on('message', data => {
    console.log("Message from client: " + data);
    io.emit('message',data);
  });*/
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});


app.post('/api/teams', async (req, res) => {
  console.log(req.body)
  //TODO do validations
  io.emit('teams_message',req.body);
  res.json({ result: 'ok' })
});



/*
socket.emit('message', "this is a test"); //sending to sender-client only

socket.broadcast.emit('message', "this is a test"); //sending to all clients except sender

socket.broadcast.to('game').emit('message', 'nice game'); //sending to all clients in 'game' room(channel) except sender

socket.to('game').emit('message', 'enjoy the game'); //sending to sender client, only if they are in 'game' room(channel)

socket.broadcast.to(socketid).emit('message', 'for your eyes only'); //sending to individual socketid

io.emit('message', "this is a test"); //sending to all clients, include sender

io.in('game').emit('message', 'cool game'); //sending to all clients in 'game' room(channel), include sender

io.of('myNamespace').emit('message', 'gg'); //sending to all clients in namespace 'myNamespace', include sender

socket.emit(); //send to all connected clients

socket.broadcast.emit(); //send to all connected clients except the one that sent the message

socket.on(); //event listener, can be called on client to execute on server

io.sockets.socket(); //for emiting to specific clients

io.sockets.emit(); //send to all connected clients (same as socket.emit)

io.sockets.on() ; //initial connection from a client.

*/