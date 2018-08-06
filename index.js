const express = require('express');  
const app = express();  
const server = require('http').createServer(app);  
const io = require('socket.io')(server);

const socket_server = require('./src/socket_server');

app.use(express.static(__dirname + '/node_modules'));  
app.use(express.static(__dirname + '/static'));

io.on('connection', socket_server(io));

server.listen(3000);  