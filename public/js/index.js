var socket = io();
			socket.on('connect', function(){
				console.log('connected to server');
			});

			socket.on('disconnect', function(){
				console.log('disconnected from server');
			});

			socket.on('newMessage', function(message){
				var li = jQuery('<li></li>');
				li.text(`${message.from} : ${message.to}`);
				jQuery('#messages').append(li);
			});

			jQuery('#message-form').on('submit', function (e) {
				e.preventDefault();

				socket.emit('createMessage', {
					from :'user',
					to:jQuery('[name=message]').val()
				}, function(){
					console.log('from the form');
				});
			});

			socket.on('newLocationMessage', function(message){
				var li = jQuery('<li></li>');
				var a = jQuery('<a target="_blank">current location</a>');
				a.attr('href',message.url);
				li.text(`${message.from}`);
				li.append(a);
				jQuery('#messages').append(li);
				});

			var locationButton = jQuery('#send-location');
			locationButton.on('click', function () {
				if(!navigator.geolocation){
					return alert("yoour not supported");
				}
				navigator.geolocation.getCurrentPosition(function(position){
					socket.emit('createLocation', {
						latitude:position.coords.latitude,
						longitude:position.coords.longitude
					});
				}, function(position){
					alert('unable to fetch position');

				});
			});