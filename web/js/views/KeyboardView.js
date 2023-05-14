import AbstractView from '/js/views/AbstractView.js';

export default class KeyboardView extends AbstractView {
	constructor(options = {}) {
		super(options);
		this.template = 'keyboard_view';
		this.class_name = 'keyboard-view';
	}

	templateContext() {
		return {
		};
	}

	getEvents() {
		return [
			['click', '.js-button', 'buttonClick']
		];
	}

	buttonClick(e) {
		const symbol = e.target.getAttribute('data-value') || e.target.innerHTML;
		this.changeCallback(symbol);
	}
}