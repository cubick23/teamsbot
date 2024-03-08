const io = require('socket.io-client');

const socket = io('http://localhost:3000', {
  transportOptions: {
    polling: {
      extraHeaders: {
        'Authorization': 'Bearer8djfnbkskdf',
      },
    },
  },
});

socket.on('connect', () => {
  console.log('connected!');
  socket.emit('room', 'room1');
});

socket.on('message', data => {
  console.log(data);
});