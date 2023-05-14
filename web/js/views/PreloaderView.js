import AbstractView from '/js/views/AbstractView.js';

export default class PreloaderView extends AbstractView {
	constructor(options = {}) {
		super(options);
		this.template = 'preloader-view';
		this.class_name = 'preloader-view';

		if(!this.show_spinner) {
			this.show_spinner = false;
		}
	}

	templateContext() {
		return {
			show_spinner: this.show_spinner
		};
	}

	onRender() {
	}

	show() {
		this.remove();
		document.querySelector('body').appendChild(this.render());
	}

	hide() {
		this.remove();
	}
}