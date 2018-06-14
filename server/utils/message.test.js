const expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () =>{
	it('should pass from ,to values', ()=>{
		var from = 'admin';
		var to='new user';
		var message = generateMessage(from, to);
		expect(message.createdAt).toBeA('number');
		expect(message).toInclude({from, to});
	});

	
});
describe('generateLocationMessage', () =>{
	it('should pass from ,lat ,longi values', ()=>{
		var from = 'admin';
		var latitude=23;
		var longtude=26;
		var url ="https://www.google.com/maps?q=23,26";
		var message = generateLocationMessage(from, latitude,longtude);
		expect(message.createdAt).toBeA('number');
		expect(message).toInclude({from, url});
	});
	});