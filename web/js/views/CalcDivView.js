import AbstractView from '/js/views/AbstractView.js';

export default class CalcDivView extends AbstractView {
	constructor(options = {}) {
		super(options);
		this.template = 'calc_div_view';
		this.class_name = 'calc-div-view calc-view';
	}

	templateContext() {
		return {
			model: this.model
		};
	}

	getEvents() {
		return [
		];
	}
}