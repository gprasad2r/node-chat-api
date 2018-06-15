const expect =require('expect');
const isRealString = require('./validation');

describe('validation test', ()=>{
	it('should be string and no white spaces', ()=>{
		var str = isRealString('string');
		expect(str).toBe(true);
	});
	it('should reject string with non string spaces', ()=>{
		var str = isRealString(94);
		expect(str).toBe(false);
	});
	it('should reject string with  white spaces', ()=>{
		var str = isRealString("  " );
		expect(str).toBe(false);
	});
});