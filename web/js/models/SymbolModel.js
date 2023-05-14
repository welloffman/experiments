import AbstractModel from '/js/models/AbstractModel.js';

export default class SymbolModel extends AbstractModel {
	id;
	value;
	freq = {
		begin: [0, 0, 0],
		middle: [0, 0, 0],
		end: [0, 0, 0]
	};
	count = 0;
	status = 'active';
	can_first = false;
	can_last = false;
	
	constructor(attributes = {}) {
		super(attributes);
	}
}