/*
Script: Function.js
	Specs for Function.js

License:
	MIT-style license.
*/

describe("Function Methods 1.3", {

	// Function.bind

	'should return the function bound to an object': function(){
		var spy = jasmine.createSpy();
		var f = spy.bind('MooTools');
		expect(spy).not.toHaveBeenCalled();
		f();
		expect(spy).toHaveBeenCalledWith();
		f('foo', 'bar');
		expect(spy).toHaveBeenCalledWith('foo', 'bar');
	},

	'should return the function bound to an object with specified argument': function(){
		var binding = {some: 'binding'};
		var spy = jasmine.createSpy().andReturn('something');
		var f = spy.bind(binding, 'arg');

		expect(spy).not.toHaveBeenCalled();
		expect(f('additional', 'arguments')).toEqual('something');
		expect(spy).toHaveBeenCalledWith('arg');
		expect(spy.mostRecentCall.object).toEqual(binding);
	},

	'should return the function bound to an object with multiple arguments': function(){
		var binding = {some: 'binding'};
		var spy = jasmine.createSpy().andReturn('something');
		var f = spy.bind(binding, ['foo', 'bar']);

		expect(spy).not.toHaveBeenCalled();
		expect(f('additional', 'arguments')).toEqual('something');
		expect(spy).toHaveBeenCalledWith('foo', 'bar');
		expect(spy.mostRecentCall.object).toEqual(binding);
	},

	// Function.pass

	'should return a function that when called passes the specified arguments to the original function': function(){
		var spy = jasmine.createSpy().andReturn('the result');
		var fnc = spy.pass('an argument');
		expect(spy).not.toHaveBeenCalled();
		expect(fnc('additional', 'arguments')).toBe('the result');
		expect(spy).toHaveBeenCalledWith('an argument');
		expect(spy.callCount).toBe(1);
	},

	'should pass multiple arguments and bind the function to a specific object when it is called': function(){
		var spy = jasmine.createSpy().andReturn('the result');
		var binding = {some: 'binding'};
		var fnc = spy.pass(['multiple', 'arguments'], binding);
		expect(spy).not.toHaveBeenCalled();
		expect(fnc('additional', 'arguments')).toBe('the result');
		expect(spy.mostRecentCall.object).toEqual(binding);
		expect(spy).toHaveBeenCalledWith('multiple', 'arguments');
	},

	// Function.run

	'should run the function': function(){
		var spy = jasmine.createSpy().andReturn('something');
		expect(spy.run()).toEqual('something');
		expect(spy).toHaveBeenCalledWith();
	},

	'should run the function with a single argument': function(){
		var spy = jasmine.createSpy().andReturn('something');
		expect(spy.run('arg')).toEqual('something');
		expect(spy).toHaveBeenCalledWith('arg');
	},

	'should run the function with multiple arguments': function(){
		var spy = jasmine.createSpy().andReturn('something');
		expect(spy.run(['foo', 'bar'])).toEqual('something');
		expect(spy).toHaveBeenCalledWith('foo', 'bar');
	},

	'should run the function with multiple arguments and bind the function to an object': function(){
		var spy = jasmine.createSpy().andReturn('something');
		var binding = {some: 'binding'};
		expect(spy.run(['foo', 'bar'], binding)).toEqual('something');
		expect(spy).toHaveBeenCalledWith('foo', 'bar');
		expect(spy.mostRecentCall.object).toEqual(binding);
	},

	// Function.extend

	"should extend the function's properties": function(){
		var fnc = (function(){}).extend({a: 1, b: 'c'});
		value_of(fnc.a).should_be(1);
		value_of(fnc.b).should_be('c');
	},

	// Function.attempt

	'should call the function without raising an exception': function(){
		var fnc = function(){
			throw 'up';
		};
		fnc.attempt();
	},

	"should return the function's return value": function(){
		var spy = jasmine.createSpy().andReturn('hello world!');
		value_of(spy.attempt()).should_be('hello world!');
	},

	'should return null if the function raises an exception': function(){
		var fnc = function(){
			throw 'up';
		};
		expect(fnc.attempt()).toBeNull();
	},

	// Function.delay

	'should return a timer pointer': function(){
		var spyA = jasmine.createSpy('Alice');
		var spyB = jasmine.createSpy('Bob');

		var timerA = spyA.delay(200);
		var timerB = spyB.delay(200);

		waits(100);
		runs(function(){
			expect(spyA).not.toHaveBeenCalled();
			expect(spyB).not.toHaveBeenCalled();
			clearTimeout(timerB);
		});
		waits(150);
		runs(function(){
			expect(spyA.callCount).toBe(1);
			expect(spyB.callCount).toBe(0);
		});
	},

	'should pass parameter 0 [Function.delay]': function(){
		var spy = jasmine.createSpy();
		spy.delay(50, null, 0);
		waits(100);
		runs(function(){
			expect(spy).toHaveBeenCalledWith(0);
		});
	},

	// Function.periodical

	'should return an interval pointer': function(){
		var spy = jasmine.createSpy('Bond');

		var interval = spy.periodical(10);
		expect(spy).not.toHaveBeenCalled();

		waits(100);
		runs(function(){
			expect(spy.callCount).toBeGreaterThan(2);
			expect(spy.callCount).toBeLessThan(15);
			clearInterval(interval);
			spy.reset();
		});
		waits(100);
		runs(function(){
			expect(spy).not.toHaveBeenCalled();
		});
	},

	'should pass parameter 0 [Function.periodical]': function(){
		var spy = jasmine.createSpy();
		var timer = spy.periodical(10, null, 0);
		waits(100);
		runs(function(){
			expect(spy).toHaveBeenCalledWith(0);
			clearInterval(timer);
		});
	}

});
