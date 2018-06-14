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

	socket.emit('newMessage',{from:'admin',text :'welcome to chat api'});
		socket.broadcast.emit('newMessage',{from:'admin',text :'new user joined'});
	socket.on('createMessage', (message)=>{
		// io.emit('newMessage', {
		// 	from:message.from,
		// 	to:message.to,
		// 	cratedAt:new Date().getTime()
		// });
		socket.broadcast.emit('newMessage', {
			from:message.from,
			to:message.to,
			cratedAt:new Date().getTime()
		});
	});

	socket.on('disconnect', ()=>{
	console.log('user disconnected')
});
});

server.listen(port, () => {
	console.log(`server is up on port ${port}`);
});