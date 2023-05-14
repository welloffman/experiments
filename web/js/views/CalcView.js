import AbstractView from '/js/views/AbstractView.js';

export default class CalcView extends AbstractView {
	constructor(options = {}) {
		super(options);
		this.template = 'calc_view';
		this.class_name = 'calc-view';
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