var socket = io();

	function scrollToBottom() {
		var messages = jQuery('#messages');
		var newMessage = messages.children('li:last-child')
		var clientHeight = messages.prop('clientHeight');
		var scrollTop = messages.prop('scrollTop');
		var scrollHeight = messages.prop('scrollHeight');
		var newMessageHeight = newMessage.innerHeight();
		console.log(newMessage.innerHeight());
		var lastMessageHeight = newMessage.prev().innerHeight();

		if (clientHeight + scrollTop <= scrollHeight) {
			messages.scrollTop(scrollHeight);
			console.log(`${clientHeight},${scrollTop},${newMessage.innerHeight()},${lastMessageHeight},${scrollHeight}`)
		}
	}
			socket.on('connect', function(){
				var params = jQuery.deparam(window.location.search);
				socket.emit('join',params, function(err){
					if(err){
						alert(err);
						window.location.href = '/';  
					}
					else{
						console.log('no errors');

					}
				});
			});

			socket.on('disconnect', function(){
				console.log('disconnected from server');
			});

			socket.on('newMessage', function(message){
				var formattedtime = moment(message.createdAt).format('h:mm a');
				var template = jQuery('#message-template').html();
				var html = Mustache.render(template, {
					from:message.from,
					to:message.to,
					createdAt:formattedtime
				});
				jQuery('#messages').append(html);
				scrollToBottom();
				// var li = jQuery('<li></li>');
				// li.text(`${message.from} ${formattedtime} : ${message.to}`);
				// jQuery('#messages').append(li);
			});

			jQuery('#message-form').on('submit', function (e) {
				e.preventDefault();

				socket.emit('createMessage', {
					from :'user',
					to:jQuery('[name=message]').val()
				}, function(){
					to:jQuery('[name=message]').val('');
				});
			});

			socket.on('newLocationMessage', function(message){
				var formattedtime = moment(message.createedAt).format('h: mm a')
				var template = jQuery('#location-message-template').html();
				var html = Mustache.render(template, {
					from:message.from,
					url:message.url,
					createdAt:formattedtime
				});
				jQuery('#messages').append(html);
				scrollToBottom();

				// var li = jQuery('<li></li>');
				// var a = jQuery('<a target="_blank">current location</a>');
				// a.attr('href',message.url);
				// li.text(`${message.from} ${formattedtime}`);
				// li.append(a);
				// jQuery('#messages').append(li);
				});

			var locationButton = jQuery('#send-location');
			locationButton.on('click', function () {
				if(!navigator.geolocation){
					return alert("yoour not supported");
				} 
				locationButton.attr('disabled', 'disabled').text('sending location');
				navigator.geolocation.getCurrentPosition(function(position){
						locationButton.removeAttr('disabled').text('send location');
					socket.emit('createLocation', {
						latitude:position.coords.latitude,
						longitude:position.coords.longitude
					});
				}, function(position){
					locationButton.removeAttr('disabled').text('send location');
					alert('unable to fetch position');

				});
			});