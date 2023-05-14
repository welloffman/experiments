import AbstractView from '/js/views/AbstractView.js';

export default class FormBuilderView extends AbstractView {
	constructor(options = {}) {
		super(options);
		this.template = 'form_builder_view';
		this.class_name = 'form-builder-view';
	}

	getEvents() {
		return [
			// ['click', '.js-next', 'next'],
		];
	}

	templateContext() {
		return {
		};
	}
}