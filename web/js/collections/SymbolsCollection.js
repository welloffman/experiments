import AbstractCollection from '/js/collections/AbstractCollection.js';
import SymbolModel from '/js/models/SymbolModel.js';

export default class SymbolsCollection extends AbstractCollection {
	getObject() {
		return new SymbolModel(this.app);
	}

	hasSymbol(value) {
		for(let i in this.models) {
			if(this.models[i].value == value) {
				return true;
			}
		}

		return false;
	}

	getByValue(value) {
		for(let i in this.models) {
			if(this.models[i].value == value) {
				return this.models[i];
			}
		}

		return null;
	}

	getSymbol(seed, is_first, is_last) {
		const models = this.models.sort((a, b) => {
			if (a.count < b.count) {
				return 1;
			}

			if (a.count > b.count) {
				return -1;
			}
			
			return 0;
		});

		const items = [];
		for(let i in models) {
			if(i / models.length > seed) {
				break;
			}
			items.push(models[i]);
		}

		const symbol = items[ Math.floor(Math.random() * items.length) ];
		return symbol.value;
	}

	getTotalCount() {
		let cnt = 0;
		this.models.forEach(symbol => {
			cnt += symbol.count;
		});

		return cnt;
	}
}