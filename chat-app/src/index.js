const path = require('path');
const http = require('http');
const express = require('express');
const app = express();
const socketio = require('socket.io');

const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketio(server);

const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

io.on('connection', () => {
  console.log('connection perfect!');
});

server.listen(port, () => {
  console.log(`Starting server on port: ${port}`);
});