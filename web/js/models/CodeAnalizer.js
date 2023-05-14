import AbstractModel from '/js/models/AbstractModel.js';
import SymbolModel from '/js/models/SymbolModel.js';

export default class CodeAnalizer extends AbstractModel {
	symbols;
	strings = [];

	constructor(attributes = {}) {
		super(attributes);
		this.symbols = attributes.symbols;
	}

	analize(code) {
		code = code.replace(/[\(\)\[\]\{\}\.;!]/g, ' $& ');
		const strings = code.split("\n");
		strings.forEach(string => {
			this.handleString(string);
		});
	}

	handleString(string) {
		string = string.trim();
		if(!string.length) {
			return false;
		}

		const items = string.split(" ");
		items.forEach((item, key) => {
			const is_first = key == 0;
			const is_last = key == items.length - 1;
			this.addValue(item, is_first, is_last);
		});
	}

	addValue(item, is_first, is_last) {
		item = item.trim();
		if(!item.length) {
			return false;
		}

		let symbol_model;
		if(!this.symbols.hasSymbol(item)) {
			symbol_model = new SymbolModel();
			symbol_model.value = item;
			this.symbols.models.push(symbol_model);
		} else {
			symbol_model = this.symbols.getByValue(item);

		}

		symbol_model.count += 1;

		if(is_first) {
			symbol_model.can_first = true;
		}

		if(is_last) {
			symbol_model.can_last = true;
		}
	}
}