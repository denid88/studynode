const path = require('path');
const http = require('http');
const express = require('express');
const app = express();
const socketio = require('socket.io');

const { generateMessage, generateLocateMessage } = require('./utils/messages');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users');

const port = process.env.PORT || 3030;
const server = http.createServer(app);
const io = socketio(server);

const Filter = require('bad-words');

const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

let count = 0;

io.on('connection', (socket) => {
  console.log('connection perfect!');

  socket.on('sendMessage', function(message, callback) {
    
    const user = getUser(socket.id);
    
    const filter = new Filter();

    if(filter.isProfane(message)) {
      return callback('Profanity is no allow');
    }

    io.to(user.room).emit('message', generateMessage(user.username, message));
    callback();
  });

  socket.on('setGeoposition', function(coords, callback) {
    const user = getUser(socket.id);
    io.to(user.room).emit('locationMessage', generateLocateMessage(user.username, `https://google.com/maps?q=${coords.latitude},${coords.longitude}`));
    callback();
  });


  socket.on('join', function(options, callback) {
    
    console.log(options);
    
    const { error, user } = addUser({id: socket.id, ...options });

    console.log(user);
    
    if (error) {
      return callback(error);
    }

    socket.join(user.room);

    socket.emit('message', generateMessage('Admin', 'Welcome'));
    socket.broadcast.to(user.room).emit('message', generateMessage('Admin', `${user.username} has joined`));

    callback();
  });


  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    console.log('disconnecting');
    console.log(user);
    if (user) {
      io.to(user.room).emit('message', generateMessage('Admin', `A ${user.username} have left!`));
    }
  });
});


server.listen(port, () => {
  console.log(`Starting server on port: ${port}`);
});