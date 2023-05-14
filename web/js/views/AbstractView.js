import Application from '/js/router/Application.js';

export default class AbstractView {
	constructor(options = {}) {
		for(let i in options) {
			this[i] = options[i];
		}

		this.el = document.createElement('div');
		this.template = '';
		this.class_name = '';
		this.app = options.app;
	}

	templateContext() {
		return {};
	}

	getEvents() {
		return [];
	}

	render() {
		this.stopListeners();
		this.class_name.split(' ').forEach(item => {
			if(item) {
				this.el.classList.add(item);
			}
		});

		const template = Application.config.templates[this.template];
		const t = _.template(template);
		this.el.innerHTML = t(this.templateContext());
		this.startListeners();
		this.onRender();
		return this.el;
	}

	onRender() {
	}

	startListeners() {
		const events = this.getEvents();
		events.forEach((item) => {
			const event_name = item[0];
			const selector = item[1];
			const action = item[2];

			this.el.querySelectorAll(selector).forEach(element => {
				element.addEventListener(event_name, this[action].bind(this), false);
			});
		});
	}

	stopListeners() {
		const events = this.getEvents();
		events.forEach((item) => {
			const event_name = item[0];
			const selector = item[1];
			const action = item[2];

			this.el.querySelectorAll(selector).forEach(element => {
				if(element) {
					element.removeEventListener(event_name, this[action], false);
				}
			});
		});
	}

	remove() {
		this.stopListeners();
		this.el.remove();
	}

	changeField(e) {
		const key = e.currentTarget.getAttribute('data-type');
		const val = e.currentTarget.value;
		this.model[key] = val;
	}

	getDate(date, format = 'DD.MM.YYYY') {
		return this.app.getLocalDate(date).format(format);
	}

	renderChild(child_view, target_selector, empty = false) {
		this.el.querySelectorAll(target_selector).forEach(wrapper => {
			if(empty) {
				while(wrapper.firstChild) {
					wrapper.removeChild(wrapper.firstChild);
				}
			}
			
			wrapper.appendChild(child_view.render());
		});
	}

	removeError(e) {
		const target = e.target;

		if(!target.classList.contains('alert')) {
			return false;
		}

		target.classList.remove('alert');
		const error_message = target.parentNode.querySelectorAll('.error');
		if(error_message.length) {
			target.parentNode.removeChild(error_message[0]);
		}

		const key = e.currentTarget.getAttribute('data-type');
		delete(this.errors[key]);
	}
}