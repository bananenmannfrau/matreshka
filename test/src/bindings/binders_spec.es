import magic from 'matreshka-magic';
import $ from 'bquery';
let q = (s, c) => $(s, c)[0] || null;

// TODO how to test file binder?
// TODO test DOM events too

describe('Binders', () => {
    it('Binds prop', () => {
        let node = $.create('div', {someProp: 42}),
            o = {};

        magic.bindNode(o, 'x', node, magic.binders.prop('someProp'));

        expect(o.x).toEqual(42);
        o.x = 43;
        expect(node.someProp).toEqual(43);
    });

    it('Binds attr', () => {
        let node = $.create('div', {attributes: {someattr: "42"}}),
            o = {};

        magic.bindNode(o, 'x', node, magic.binders.attr('someattr'));

        expect(o.x).toEqual('42');
        o.x = 43;
        expect(node.getAttribute('someattr')).toEqual('43');
    });

    it('Binds html', () => {
        let node = $.create('div', {innerHTML: '<i>42</i>'}),
            o = {};

        magic.bindNode(o, 'x', node, magic.binders.html());

        expect(o.x).toEqual('<i>42</i>');
        o.x = '<i>43</i>';
        expect(node.innerHTML).toEqual('<i>43</i>');
    });


    it('Binds text', () => {
        let node = $.create('div', {textContent: '<i>42</i>'}),
            o = {};

        magic.bindNode(o, 'x', node, magic.binders.text());

        expect(o.x).toEqual('<i>42</i>');
        o.x = '<i>43</i>';
        expect(node.textContent).toEqual('<i>43</i>');
    });


    it('Binds style', () => {
        let node = $.create('div', {style: {textAlign: 'center'}}),
            o = {};

        magic.bindNode(o, 'x', node, magic.binders.style('textAlign'));

        expect(o.x).toEqual('center');
        o.x = 'right';
        expect(node.style.textAlign).toEqual('right');
    });


    it('Binds display', () => {
        let node = $.create('div'),
            o = {};

        magic.bindNode(o, 'x', node, magic.binders.display());

        expect(o.x).toEqual(true);
        o.x = false;
        expect(node.style.display).toEqual('none');

        magic.bindNode(o, 'y', node, magic.binders.display(false));

        expect(o.y).toEqual(true);
        o.y = false;
        expect(node.style.display).toEqual('');
    });

    it('Binds dataset', () => {
		let node = $.create('div', {
				attributes: {'data-some-attr': '42'}
			});

		tester(node);

		// test older browsers @IE10
		node = $.create('div', {
			attributes: {'data-some-attr': '42'}
		});

		Object.defineProperty(node, 'dataset', {value: null});

		tester(node);

		function tester(node) {
			let o = {};

			magic.bindNode(o, 'x', node, magic.binders.dataset('someAttr'));

			expect(o.x).toEqual('42');
			o.x = '43';
			expect(node.getAttribute('data-some-attr')).toEqual('43');
		}
    });

    it('Binds className', () => {

        let node = $.create('div', {
                className: 'some-class'
            });

		tester(node);

		// test for older browsers @IE9
		node = $.create('div', {
            className: 'some-class'
        });

		Object.defineProperty(node, 'classList', {value: null});

		tester(node);

		function tester(node) {
			let o = {},
				hasClass = function (o, c) {
					return o.classList
						? o.classList.contains(c)
						: new RegExp('(\\s|^)' + c + '(\\s|$)').test(o.className);
				};

			magic.bindNode(o, 'x', node, magic.binders.className('some-class'));

			expect(o.x).toEqual(true);
			o.x = false;
			expect(hasClass(node, 'some-class')).toEqual(false);


			magic.bindNode(o, 'y', node, magic.binders.className('!some-class'));

			expect(o.y).toEqual(true);
			o.y = false;
			expect(hasClass(node, 'some-class')).toEqual(true);
		}

    });

    it('supports fallbacks', () => {
        expect(magic.binders.innerHTML).toEqual(magic.binders.html);
        expect(magic.binders.innerText).toEqual(magic.binders.text);
        expect(magic.binders.property).toEqual(magic.binders.prop);
        expect(magic.binders.attribute).toEqual(magic.binders.attr);
    });
});


describe('Default binders', () => {
    it('Binds textarea', () => {
        let node = $.create('textarea', {
                value: '42'
            }),
            o = {};

        magic.bindNode(o, 'x', node);

        expect(o.x).toEqual('42');
        o.x ='43';
        expect(node.value).toEqual('43');
    });

    it('Binds progress', () => {
        let node = $.create('progress', {
                max: 100,
                value: 42
            }),
            o = {};

        magic.bindNode(o, 'x', node);
        expect(o.x).toEqual(42);
        o.x = 43;
        expect(node.value).toEqual(43);
    });

    it('Binds text input', () => {
        let node = $.create('input', {
                value: '42'
            }),
            o = {};

        magic.bindNode(o, 'x', node);

        expect(o.x).toEqual('42');
        o.x ='43';
        expect(node.value).toEqual('43');
    });

    it('Binds checkbox', () => {
        let node = $.create('input', {
                type: 'checkbox',
                checked: true
            }),
            o = {};

        magic.bindNode(o, 'x', node);

        expect(o.x).toEqual(true);
        o.x = false;
        expect(node.checked).toEqual(false);
    });

    it('Binds select', () => {
        let node = $.create('select', {
                children: [{
                    tagName: 'option',
                    value: '1'
                }, {
                    tagName: 'option',
                    selected: true,
                    value: '2'
                }, {
                    tagName: 'option',
                    value: '3'
                }, {
                    tagName: 'option',
                    value: '4'
                }]
            }),
            o = {};

        magic.bindNode(o, 'x', node);

        expect(o.x).toEqual('2');
        o.x = '3';
        expect(node.options[node.selectedIndex].value).toEqual('3');
    });


    it('Binds output', () => {
        let node = $.create('output', {
                innerHTML: '42'
            }),
            o = {};

        magic.bindNode(o, 'x', node);

        expect(o.x).toEqual('42');
        o.x = '43';
        expect(node.innerHTML).toEqual('43');
    });



	if(typeof Blob != 'undefined' && typeof FileReader != 'undefined') {
		it('allows to bind file input', (done) => {
			var input = $.create('input', {
					type: 'file',
					multiple: false
				}),
				o = {};

			Object.defineProperty(input, 'files', {value: [
				new Blob(['foo'], 'text.txt', {type : 'text/plain'})
			]});

			magic.bindNode(o, 'file', input, magic.binders.file('text'));

			magic.on(o, 'change:file', evt => {
				expect(o.file.readerResult).toEqual('foo');
				done();
			});

			input.dispatchEvent(new Event('change'))
		});

		
		it('allows to bind file input (multiple)', (done) => {
			var input = $.create('input', {
					type: 'file',
					multiple: true
				}),
				o = {};

			Object.defineProperty(input, 'files', {
				value: [
					new Blob(['foo'], {type : 'text/plain'}),
					new Blob(['bar'], {type : 'text/plain'})
				]
			});

			magic.bindNode(o, 'files', input, magic.binders.file('text'));

			magic.on(o, 'change:files', evt => {
				expect(o.files[0].readerResult).toEqual('foo');
				expect(o.files[1].readerResult).toEqual('bar');
				done();
			});

			input.dispatchEvent(new Event('change'))
		});
	}

});
