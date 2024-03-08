const io = require('socket.io-client');

const socket = io('https://teamsbot.onrender.com', {
  transportOptions: {
    polling: {
      extraHeaders: {
        'Authorization': 'Bearer tetutarui',
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