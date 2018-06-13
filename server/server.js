const http = require('http');
const express = require('express');
const app =express();
const path =require('path');
const socketIO = require('socket.io');
const server = http.createServer(app);
const io = socketIO(server);


const port = process.env.PORT || 3000;
var publicpath = path.join(__dirname, '../public');
app.use(express.static(publicpath));

io.on('connection', (socket)=>{
	console.log('new user connected');

	socket.emit('newMessage', {
		from:'gprasad2r@gmail.com',
		to:'google@gmail.com',
		cratedAt:944	
	});

	socket.on('createMessage', (message)=>{
		console.log(message);
	});

	socket.on('disconnect', ()=>{
	console.log('user disconnected')
});
});

server.listen(port, () => {
	console.log(`server is up on port ${port}`);
});