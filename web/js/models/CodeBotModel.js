import AbstractModel from '/js/models/AbstractModel.js';

export default class CodeBotModel extends AbstractModel {
	constructor(attributes = {}) {
		super(attributes);
	}

	makeString(symbols_collection) {
		// const str_len = Math.round( Math.random() * 5 );
		const str_len = 5;
		let symbols = [];
		for(let i = 0; i < str_len; i++) {
			const is_first = i == 0;
			const is_last = i == str_len - 1;
			symbols.push( this.makeSymbol(symbols_collection, is_first, is_last) );
		}

		return symbols.join(' ');
	}

	makeSymbol(symbols_collection, is_first, is_last) {
		const seed = Math.random();
		const symbol = symbols_collection.getSymbol(seed, is_first, is_last);
		return symbol;
	}

	makeFunction(symbols_collection, head, args, result) {
		const p = args.map((item, key) => {
			const v_key = `a${key}`;

			if(!symbols_collection.hasSymbol(v_key)) {
				symbols_collection.add({value: v_key, count: 2});
			}
			
			return v_key;
		});

		const params_str = p.join(', ');
		let func_strings = [];
		let foo_string;

		let i = 0;
		do {
			func_strings = [
				`(${params_str}) => {`
			];

			const string = this.makeString(symbols_collection);
			func_strings.push(string);
			func_strings.push('}');
			
			foo_string = func_strings.join("\n");
			console.log(foo_string);

			i++;
			if(i >= 10000) {
				break;
			}
		} while( !this.checkFunction(foo_string, args, result) )

		return foo_string;
	}

	checkFunction(func_string, args, result) {
		try {
			const foo = eval(func_string);
			const r = foo(...args);
			if(r == result) {
				debugger;
				return true;
			}
		} catch(resp) {
			return false;
		}
		
		return false;
	}
}