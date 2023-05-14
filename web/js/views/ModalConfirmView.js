import AbstractView from '/js/views/AbstractView.js';

export default class ModalConfirmView extends AbstractView {
	constructor(options = {}) {
		super(options);
		this.template = 'modal_confirm_view';
		this.class_name = 'modal-confirm-view';

		this.applyCallback = options.applyCallback || (() => {});
		this.cancelCallback = options.cancelCallback || (() => {});
		this.title = options.title;
		this.text = options.text;
		this.type = options.type; // info, question, custom
		this.sizeClass = options.sizeClass ? options.sizeClass : '';
		this.applyButtonCss = options.applyButtonCss || '';
		this.applyButtonText = options.applyButtonText || 'Close';
		this.cnacelButtonText = options.cnacelButtonText || 'Cancel';
		this.customView = options.customView;
		this.noCloseOutside = options.noCloseOutside;
		this.css_class = options.css_class || '';

		if(this.customView) {
			this.customView.parent = this;
		}
	}

	templateContext() {
		return {
			title: this.title, 
			text: this.text,
			type: this.type,
			applyButtonCss: this.applyButtonCss,
			applyButtonText: this.applyButtonText,
			cnacelButtonText: this.cnacelButtonText,
			sizeClass: this.sizeClass,
			css_class: this.css_class
		};
	}

	getEvents() {
		return [
			['click', '.js-close', 'close'],
			['click', '.js-apply', 'apply'],
			['click', '.js-mask', 'maskClick']
		];
	}

	onRender() {
		if(this.type == 'custom') {
			this.el.querySelector('.modal-body').appendChild(this.customView.render())
		}
	}

	show() {
		const body = document.querySelector('body');
		body.classList.add('freezing');
		body.appendChild(this.render());
		setTimeout(() => {
			this.setOffset();
		});
	}

	close() {
		this.remove();

		const body = document.querySelector('body');
		if(!body.querySelector('.modal-confirm-view')) {
			body.classList.remove('freezing');
		}
	}

	apply() {
		this.applyCallback();
		this.close();
	}

	setOffset() {
		this.el.classList.add('centered');
	}

	maskClick() {
		if(!this.noCloseOutside) {
			this.close();
		}
	}
}