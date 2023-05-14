import AbstractModel from '/js/models/AbstractModel.js';

export default class NetTeacherModel extends AbstractModel {
	net;
	inputs;
	standards;
	repeat_inner = 200;
	repeat_outer = 50;

	constructor(attributes = {}) {
		super(attributes);
	}

	start() {
		for(let i = 0; i < this.repeat_outer; i++) {
			this.repeatOuter();
		}
	}

	repeatOuter() {
		for(let i in this.inputs) {
			this.repeatInner(this.standards[i], this.inputs[i]);
			// console.log(this.net.getOutput());
		}
	}

	repeatInner(standard, input) {
		this.net.o.input = input;
		this.net.o.standard = standard;

		for(let i = 0; i < this.repeat_inner; i++) {
			this.net.fix();
		}
	}
}