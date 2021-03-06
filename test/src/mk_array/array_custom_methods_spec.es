import MK from 'matreshka';

describe('MK.Array custom methods', () => {
	it('pulls', () => {
		let arr = new MK.Array(),
			removed;
		arr.push('a', 'b', 'c');
		removed = arr.pull(1);

		expect(removed).toEqual('b');
		expect(arr.toArray()).toEqual(['a', 'c']);
		expect(arr.length).toEqual(2);
	});

	it('pulls object', () => {
		let arr = new MK.Array(),
			object1 = {},
			object2 = {},
			object3 = {},
			removed;

		arr.push(object1, object2, object3);

		removed = arr.pull(object2);

		expect(removed === object2).toBe(true);

		expect(arr.length).toEqual(2);
	});

	it('recreates', () => {
		let arr = new MK.Array(),
			object1 = {},
			object2 = {},
			object3 = {};

		arr.recreate([object1, object2, object3]);

		expect(arr.length).toEqual(3);
		expect(arr[0] === object1).toBe(true);
		expect(arr[1] === object2).toBe(true);
		expect(arr[2] === object3).toBe(true);

		arr.recreate();

		expect(arr.length).toEqual(0);
		expect(arr[0] === undefined).toBe(true);
		expect(arr[1] === undefined).toBe(true);
		expect(arr[2] === undefined).toBe(true);
	});

	it('emptifies', () => {
		let arr = new MK.Array(),
			object1 = {},
			object2 = {},
			object3 = {};

		arr.recreate([object1, object2, object3]);

		expect(arr.length).toEqual(3);
		arr.recreate();

		expect(arr.length).toEqual(0);
		expect(arr[0] === undefined).toBe(true);
		expect(arr[1] === undefined).toBe(true);
		expect(arr[2] === undefined).toBe(true);
	});

	it('tracks by _id', () => {
		let arr = new MK.Array(),
			object0 = {_id: 0, a: 0},
			object1 = {_id: 1, a: 1},
			object2 = {_id: 2, a: 2},
			object3 = {_id: 0, a: 3},
			object4 = {_id: 1, a: 4},
			object5 = {_id: 3, a: 5};

		arr.trackBy = '_id';

		arr.recreate([object0, object1, object2]);

		expect(arr[0] === object0).toBe(true);
		expect(arr[1] === object1).toBe(true);
		expect(arr[2] === object2).toBe(true);

		arr.recreate([object4, object5, object3]);

		expect(arr[0] === object1).toBe(true);
		expect(arr[1] === object5).toBe(true);
		expect(arr[2] === object0).toBe(true);
	});

	it('tracks by _id', () => {
		let arr = new MK.Array(),
			object0 = {_id: 0, a: 0},
			object1 = {_id: 1, a: 1},
			object2 = {_id: 2, a: 2},
			object3 = {_id: 0, a: 3},
			object4 = {_id: 1, a: 4},
			object5 = {_id: 3, a: 5};

		arr.trackBy = '_id';

		arr.recreate([object0, object1, object2]);

		expect(arr[0] === object0).toBe(true);
		expect(arr[1] === object1).toBe(true);
		expect(arr[2] === object2).toBe(true);

		arr.recreate([object4, object5, object3]);

		expect(arr[0] === object1).toBe(true);
		expect(arr[1] === object5).toBe(true);
		expect(arr[2] === object0).toBe(true);


		expect(arr[0].a).toEqual(4);
		expect(arr[1].a).toEqual(5);
		expect(arr[2].a).toEqual(3);


	});


	it('tracks by $index', () => {
		let arr = new MK.Array(),
			object0 = {a: 0},
			object1 = {a: 1},
			object2 = {a: 2},
			object3 = {a: 3},
			object4 = {a: 4},
			object5 = {a: 5},
			object6 = {a: 6};

		arr.trackBy = '$index';

		arr.recreate([object0, object1, object2]);

		expect(arr[0] === object0).toBe(true);
		expect(arr[1] === object1).toBe(true);
		expect(arr[2] === object2).toBe(true);

		arr.recreate([object3, object4, object5, object6]);

		expect(arr[0] === object0).toBe(true);
		expect(arr[1] === object1).toBe(true);
		expect(arr[2] === object2).toBe(true);
		expect(arr[3] === object6).toBe(true);


		expect(arr[0].a).toEqual(3);
		expect(arr[1].a).toEqual(4);
		expect(arr[2].a).toEqual(5);
		expect(arr[3].a).toEqual(6);
	});


	// tests for orderby is borrowed from lodash
   var objects = [
	 { 'a': 'x', 'b': 3 },
	 { 'a': 'y', 'b': 4 },
	 { 'a': 'x', 'b': 1 },
	 { 'a': 'y', 'b': 2 }
   ];

   it('should sort by a single property by a specified order', () => {
   	let actual = new MK.Array().recreate(objects).orderBy('a', 'desc').toArray();
   	expect(actual).toEqual([objects[1], objects[3], objects[0], objects[2]]);
   });

   it('should sort by multiple properties by specified orders', () => {
   	let actual = new MK.Array().recreate(objects).orderBy(['a', 'b'], ['desc', 'asc']).toArray();
   	expect(actual).toEqual([objects[3], objects[1], objects[2], objects[0]]);
   });

   it('should sort by a property in ascending order when its order is not specified', () => {
   	let falsey = [, '', 0, false, NaN, null, undefined],

   		expected = [objects[2], objects[0], objects[3], objects[1]],
   		actual = new MK.Array().recreate(objects).orderBy(['a', 'b']).toArray();

   	expect(actual).toEqual(expected);

   	falsey.forEach(function(order, index) {
   		actual = new MK.Array().recreate(objects).orderBy(['a', 'b'], index ? ['desc', order] : ['desc']).toArray();
   		expected = [objects[3], objects[1], objects[2], objects[0]];
   		expect(actual).toEqual(expected);
   	});

   });

   it('should work with `orders` specified as string objects', () => {
   	let actual = new MK.Array().recreate(objects).orderBy(['a'], [Object('desc')]).toArray();
   	expect(actual).toEqual([objects[1], objects[3], objects[0], objects[2]]);
   });


	it('converts to JSON', () => {
		var arr = new MK.Array(1, 2, new MK.Object({
			foo: 'bar'
		}));

		expect(arr.toJSON()).toEqual([1,2, {foo: 'bar'}])
	});


	it('checks properties via hasOwnProperty', () => {
		var arr = new MK.Array(1, 2);

		expect(arr.hasOwnProperty(0)).toEqual(true);
		expect(arr.hasOwnProperty(1)).toEqual(true);
		expect(arr.hasOwnProperty(2)).toEqual(false);
		expect(arr.hasOwnProperty('length')).toEqual(true);
		expect(arr.hasOwnProperty('foo')).toEqual(false);
	});
});
