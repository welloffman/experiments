import AbstractView from '/js/views/AbstractView.js';

export default class NumeralsView extends AbstractView {
	constructor(options = {}) {
		super(options);
		this.template = 'numerals_view';
		this.class_name = 'numerals-view main-content';

		this.number = options.number;
		this.net = options.net;
		this.initNet();
	}

	templateContext() {
		return {
			net: this.net,
			number: this.number
		};
	}

	initNet() {
		const max_num = 100;
		const input_size = max_num.toString(2).length;
		const hidden_size = input_size;
		const output_size = 2;
		const input = this.number.toString(2).padStart(input_size ,'0');
		this.net.init(input_size, output_size, hidden_size);
		this.net.setOptions({input: input});
		this.net.makeWeights();
		this.net.calculate();
	}
}