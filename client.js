const io = require('socket.io-client');

var socket = io('https://teamsbot.onrender.com/', {
  //transports: ['websocket'],
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
    //socket.emit('room', 'channel1');
});

socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });
  
socket.on('message', data => {
    console.log(data);
});

socket.on('teamsId', data => {
    console.log(data);
});

/*
setInterval(() => {
    socket.emit('message', 'message from client Ines');
}, 3000);*/