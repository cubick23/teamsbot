const express = require('express');
const app = express();
const http = require('http');

app.use(express.json());

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.json({ hello: 'world' })
});

app.post('/api/teams', (req, res) => {
  console.log(req.body)
  //TODO do validations
  io.emit('teams_message',req.body);
  res.json({ result: 'ok' })
});


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
  
});

server.listen(10000,'0.0.0.0', () => {
    console.log('listening on *:10000');
});



