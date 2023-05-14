import AbstractView from '/js/views/AbstractView.js';

export default class QuestionView extends AbstractView {
	constructor(options = {}) {
		super(options);
		this.template = 'question_view';
		this.class_name = 'question-view';
		this.filter = '';
		this.mode = this.mode ? this.mode : 'show'; // show, edit
	}

	getEvents() {
		return [
			['change', '.js-field', 'changeField'],
			['click', '.js-save', 'save'],
			['click', '.js-cancel', 'cancel'],
			['click', '.js-toggle', 'toggle'],
			['click', '.js-toggle-edit', 'toggleEdit'],
			['click', '.js-delete', 'delete']
		];
	}

	templateContext() {
		return {
			model: this.model,
			themes: this.themes_collection,
			mode: this.mode
		};
	}

	async save() {
		try {
			await this.model.save();
			if(this.afterSave != undefined) {
				this.afterSave(this.model);
			} else {
				this.toggleEdit();
			}
		} catch(res) {
			this.app.showError(res);
		}
	}

	cancel() {
		if(!this.model.id) {
			this.remove();
		} else {
			this.toggleEdit();
		}
	}

	toggle(e) {
		if(e.target.classList.contains('active')) {
			this.el.querySelectorAll('.js-answer')[0].classList.add('hidden');
			e.target.classList.remove('active');
		} else {
			this.el.querySelectorAll('.js-answer')[0].classList.remove('hidden');
			e.target.classList.add('active');
		}
	}

	toggleEdit() {
		this.mode = this.mode == 'show' ? 'edit' : 'show';
		this.render();
	}

	delete() {
		this.parent.deleteQuestion(this.model);
	}
}