import AbstractView from '/js/views/AbstractView.js';

export default class SearcherView extends AbstractView {
	constructor(options = {}) {
		super(options);
		this.template = 'searcher_view';
		this.class_name = 'searcher-view';
	}

	templateContext() {
		return {
		};
	}

	getEvents() {
		return [
			['click', '.js-start', 'start'],
			['click', '.js-stop', 'stop'],
			['click', '.js-learn', 'learn']
		];
	}

	onRender() {
		
	}

	
}