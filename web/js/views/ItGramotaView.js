import AbstractView from '/js/views/AbstractView.js';

export default class ItGramotaView extends AbstractView {
	constructor(options = {}) {
		super(options);
		this.template = 'it_gramota_view';
		this.class_name = 'it-gramota-view';

		window.removeEventListener("message", this.finishListener, false);
		window.addEventListener("message", this.finishListener, false);

		this.startListeners();
	}

	onRender() {
	}

	getEvents() {
		return [
			['click', '.js-next', 'next'],
		];
	}

	templateContext() {
		return {
		};
	}

	next(e) {
		const iframe = this.el.querySelectorAll('.it-gramota-view .js-frame')[0];
		iframe.contentWindow.postMessage({event: 'next_step'}, '*');
	}

	finishListener(e) {
		const message = e.data;
		console.log(e.data);
		if(e.data.height) {
			const iframe = document.querySelector("iframe");
			iframe.style.height = e.data.height + 'px';
			window.scrollTo(0, 0);
		}
	}
}