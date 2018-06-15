const expect = require('expect');
const {Users} = require('./users');
var users;

describe('User', () => {
beforeEach(()=>{
	users = new Users();
	users.users=[{
		id:'2',
		name:'pro',
		room:'node'
	},
	{
		id:'124',
		name:'pro1',
		room:'react'
	},{
		id:'125',
		name:'pro2',
		room:'node'
	}];
});

	it('should add user', () =>{
		var users = new Users();
		var user ={
			id:'123',
			name:'prasad',
			room:'node'
		};
		var resUser = users.addUser(user.id, user.name, user.room);
		expect(users.users).toEqual([user]);
	});

	it('should remove user', () => {
		var userId ='124';
		var user = users.removeUser(userId);

		expect(user.id).toBe(userId);
		// expect(users.users.length).toBe(2);
	});
	it(' shuld not remove user', () => {
		var userId ='99';
		var user = users.removeUser(userId);

		expect(user).toNotExist();
		expect(users.users.length).toBe(3);
	});
	it('should find user', () => {
		var userId = '2';
		var user = users.getUser(userId);
		expect(user.id).toEqual(userId);
	});
	it('should not find user', () => {
		var userId = '99';
		var user = users.getUser(userId);
		expect(user).toNotExist();
	});
	it('should return names for node course', () => {
		var userList = users.getList('node');
		expect(userList).toEqual(['pro','pro2']);
	});

	it('should return names for react course', () => {
		var userList = users.getList('react');
		expect(userList).toEqual(['pro1']);
	});
});