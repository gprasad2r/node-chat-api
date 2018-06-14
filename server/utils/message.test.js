const expect = require('expect');
var generateMessage = require('./message');

describe('generateMessage', () =>{
	it('should pass from ,to values', ()=>{
		var from = 'admin';
		var to='new user';
		var message = generateMessage(from, to);
		expect(message.createdAt).toBeA('number');
		expect(message).toInclude({from, to});
	});
});