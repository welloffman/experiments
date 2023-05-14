import AbstractView from '/js/views/AbstractView.js';

export default class FooterView extends AbstractView {
	constructor(options = {}) {
		super(options);
		this.template = 'footer_view';
		this.class_name = 'footer-view';
	}

	templateContext() {
		return {
			currentYear: this.getCurrentYear()
		};
	}

	getCurrentYear() {
		return moment().year();
	}
}