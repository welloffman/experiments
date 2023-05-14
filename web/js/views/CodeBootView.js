import AbstractView from '/js/views/AbstractView.js';
import SymbolsCollection from '/js/collections/SymbolsCollection.js';
import CodeAnalizer from '/js/models/CodeAnalizer.js';

export default class CodeBootView extends AbstractView {
	strings = [];
	symbols;
	code = '';
	head = 'test';
	params = [1];
	result = 1;
	func;

	constructor(options = {}) {
		super(options);
		this.template = 'code_bot_view';
		this.class_name = 'code-bot-view main-content';
		this.symbols = new SymbolsCollection();
		this.startListeners();
	}

	getEvents() {
		return [
			['click', '.js-make-string', 'makeString'],
			['click', '.js-analize', 'analize'],
			['change', '.js-head', 'changeHead'],
			['change', '.js-params', 'changeParams'],
			['change', '.js-result', 'changeResult'],
			['click', '.js-make-code', 'makeCode'],
		];
	}

	templateContext() {
		return {
			strings: this.strings,
			code: this.code,
			head: this.head,
			params: this.params ? this.params.join(', ') : '',
			result: this.result,
			func: this.func
		};
	}

	makeString() {
		this.strings.push(this.code_bot.makeString( this.symbols ));
		this.render();
	}

	analize() {
		this.code = this.el.querySelectorAll('.js-sample')[0].value;
		const code_analizer = new CodeAnalizer({symbols: this.symbols});
		code_analizer.analize(this.code);
		console.log(code_analizer.symbols.models);
	}

	changeHead(e) {
		this.head = e.target.value;
	}

	changeParams(e) {
		const raw_params = e.target.value.trim().split(',');
		
		this.params = [];
		raw_params.forEach(item => {
			this.params.push( item.trim() );
		});
	}

	changeResult(e) {
		this.result = e.target.value;
	}

	makeCode() {
		this.func = this.code_bot.makeFunction(this.symbols, this.head, this.params, this.result);
		this.render();
	}
}