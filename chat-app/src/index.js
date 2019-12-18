const path = require('path');
const http = require('http');
const express = require('express');
const app = express();
const socketio = require('socket.io');

const { generateMessage, generateLocateMessage } = require('./utils/messages');

const port = process.env.PORT || 3030;
const server = http.createServer(app);
const io = socketio(server);

const Filter = require('bad-words');

const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

let count = 0;

io.on('connection', (socket) => {
  console.log('connection perfect!');

  socket.emit('message', generateMessage('Welcome'));
  socket.broadcast.emit('message', generateMessage('A new user has joined'));

  socket.on('sendMessage', function(message, callback) {
    const filter = new Filter();

    if(filter.isProfane(message)) {
      return callback('Profanity is no allow');
    }

    io.emit('message', generateMessage(message));
    callback();
  });

  socket.on('setGeoposition', function(coords, callback) {
    io.emit('locationMessage', generateLocateMessage(`https://google.com/maps?q=${coords.latitude},${coords.longitude}`));
    callback();
  });

  socket.on('disconnect', () => {
    console.log('disconnecting');
    io.emit('message', generateMessage('A user have left!'));
  });
});


server.listen(port, () => {
  console.log(`Starting server on port: ${port}`);
});