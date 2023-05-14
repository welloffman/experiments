import AbstractView from '/js/views/AbstractView.js';

export default class ExpressionsView extends AbstractView {
	items = [];
	current_value = '';

	constructor(options = {}) {
		super(options);
		this.template = 'expressions_view';
		this.class_name = 'expressions-view main-content';
		this.startListeners();
	}

	getEvents() {
		return [
			['click', '.js-add-item', 'addItem'],
			['change', '.js-curretn', 'changeCurrent'],
			['dragend', '.js-e-item', 'dragend'],
			['dragstart', '.js-e-item', 'dragstart'],
			['mousedown', '.js-e-item', 'mousedown'],
			['mouseup', '.js-e-item', 'mouseup']
		];
	}

	templateContext() {
		return {
			items: this.items
		};
	}

	changeCurrent(e) {
		this.current_value = e.target.value;
	}

	addItem() {
		if(this.current_value) {
			const item = {
				value: this.current_value,
				left: 0,
				right: 0
			};
			this.items.push(item);
			
			this.current_value = '';

			this.render();
		}
	}

	dragend(e) {
		// debugger;
	}

	dragstart(e) {
		return false;
	}

	mousedown(e) {
		const item = e.target;
		document.onmousemove = function(e) {
			const box = item.getBoundingClientRect();
			const coords = {
				top: box.top + pageYOffset,
				left: box.left + pageXOffset
			};

			item.style.left = e.pageX - coords.left + 'px';
			item.style.top = e.pageY - coords.top + 'px';
			console.log(pageYOffset, pageXOffset);
		}
	}

	mouseup(e) {
		document.onmousemove = null;
	}
}