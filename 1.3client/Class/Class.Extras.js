describe('setOptions', function(){

	it('should allow to pass the document', function(){

		var A = new Class({

			Implements: Options,

			initialize: function(options){
				this.setOptions(options);
			}

		});

		expect(new A({document: document}).options.document == document).toBeTruthy();
	});

});

(function(){

var Local = Local || {};

var fire = 'triggerEvent';

var runEventSpecs = function(type, create){
	describe('1.3 Events API: ' + type.capitalize(), {

		'before each': function(){
			Local.called = 0;
			Local.fn = function(){
				return Local.called++;
			};
		},

		'should add an Event to the Class': function(){
			var object = create();

			object.addEvent('event', Local.fn)[fire]('event');

			value_of(Local.called).should_be(1);
		},

		'should add multiple Events to the Class': function(){
			create().addEvents({
				event1: Local.fn,
				event2: Local.fn
			})[fire]('event1')[fire]('event2');

			value_of(Local.called).should_be(2);
		},

		// TODO 2.0only
		/*'should be able to remove event during firing': function(){
			create().addEvent('event', Local.fn).addEvent('event', function(){
				Local.fn();
				this.removeEvent('event', arguments.callee);
			}).addEvent('event', function(){ Local.fn(); })[fire]('event')[fire]('event');

			value_of(Local.called).should_be(5);
		},*/

		'should remove a specific method for an event': function(){
			var object = create();
			var x = 0, fn = function(){ x++; };

			object.addEvent('event', Local.fn).addEvent('event', fn).removeEvent('event', Local.fn)[fire]('event');

			value_of(x).should_be(1);
			value_of(Local.called).should_be(0);
		},

		'should remove an event and its methods': function(){
			var object = create();
			var x = 0, fn = function(){ x++; };

			object.addEvent('event', Local.fn).addEvent('event', fn).removeEvents('event')[fire]('event');

			value_of(x).should_be(0);
			value_of(Local.called).should_be(0);
		},

		'should remove all events': function(){
			var object = create();
			var x = 0, fn = function(){ x++; };

			object.addEvent('event1', Local.fn).addEvent('event2', fn).removeEvents();
			object[fire]('event1')[fire]('event2');

			value_of(x).should_be(0);
			value_of(Local.called).should_be(0);
		},

		'should remove events with an object': function(){
			var object = create();
			var events = {
				event1: Local.fn,
				event2: Local.fn
			};

			object.addEvent('event1', function(){ Local.fn(); }).addEvents(events)[fire]('event1');
			value_of(Local.called).should_be(2);

			object.removeEvents(events);
			object[fire]('event1');
			value_of(Local.called).should_be(3);

			object[fire]('event2');
			value_of(Local.called).should_be(3);
		},

		'should remove an event immediately': function(){
			var object = create();

			var methods = [];

			var three = function(){
				methods.push(3);
			};

			object.addEvent('event', function(){
				methods.push(1);
				this.removeEvent('event', three);
			}).addEvent('event', function(){
				methods.push(2);
			}).addEvent('event', three);

			object[fire]('event');
			value_of(methods).should_be([1, 2]);

			object[fire]('event');
			value_of(methods).should_be([1, 2, 1, 2]);
		},

		'should be able to remove itself': function(){
			var object = create();

			var methods = [];

			var one = function(){
				object.removeEvent('event', one);
				methods.push(1);
			};
			var two = function(){
				object.removeEvent('event', two);
				methods.push(2);
			};
			var three = function(){
				methods.push(3);
			};

			object.addEvent('event', one).addEvent('event', two).addEvent('event', three);

			object[fire]('event');
			value_of(methods).should_be([1, 2, 3]);

			object[fire]('event');
			value_of(methods).should_be([1, 2, 3, 3]);
		}

	});
};

runEventSpecs('mixin', function(){
	return new Events
});

runEventSpecs('element', function(){
	return new Element('div');
});

})();