
describe('Fx.Tween', function(){

	it('should tween the style of an element', function(){

		var element = new Element('div', {
			styles: {
				height: 100
			}
		}).inject(document.body);

		var fx = new Fx.Tween(element, {
			duration: 100,
			property: 'height'
		});

		fx.start(10, 50);

		waits(130);

		runs(function(){
			expect(element.getStyle('height').toInt()).toEqual(50);
			element.destroy();
		});

	});

	it('should fade an element', function(){

		var element = new Element('div', {
			styles: { opacity: 0 }
		}).inject(document.body);

		element.set('tween', {
			duration: 100
		});

		element.fade('in');

		waits(130);

		runs(function(){
			expect(element.getStyle('opacity').toInt()).toEqual(1);
			element.destroy();
		});

	});

	it('should set tween options with the element getter en setter', function(){

		var element = new Element('div');

		element.set('tween', {
			duration: 100
		});

		expect(element.get('tween').options.duration).toEqual(100);


	});

});
