import AbstractView from '/js/views/AbstractView.js';
import QuestionView from '/js/views/QuestionView.js';
import ModalConfirmView from '/js/views/ModalConfirmView.js';
import QuestionModel from '/js/models/QuestionModel.js';

export default class InterviewView extends AbstractView {
	constructor(options = {}) {
		super(options);
		this.template = 'interview_view';
		this.class_name = 'interview-view main-content';
		this.filter = '';
		this.theme_id = 1;
	}

	getEvents() {
		return [
			['click', '.js-create', 'create'],
			['change', '.js-theme', 'changeTheme'],
			['keyup', '.js-filter', 'changeFilter'],
		];
	}

	templateContext() {
		return {
			themes: this.themes_collection,
			theme_id: this.theme_id,
			filter: this.filter
		};
	}

	create() {
		if(!this.question_view) {
			this.question_view = new QuestionView({
				app: this.app,
				themes_collection: this.themes_collection,
				mode: 'edit',
				afterSave: _.bind(this.afterCreate, this)
			});
		}

		const question_model = new QuestionModel(this.app);
		this.question_view.model = question_model;
		this.question_view.remove();
		this.renderChild(this.question_view, '.js-new-wrapper');
	}

	afterCreate(question_model) {
		this.questions_collection.models.push(question_model);
		this.question_view.remove();
		this.renderQuestions();
	}

	onRender() {
		this.renderQuestions();
	}

	renderQuestions() {
		if(this.questions_views) {
			this.questions_views.forEach(view => {
				view.remove();
			});
		}
		
		this.questions_views = [];

		const questions = this.getQuestions();
		questions.forEach(question => {
			const view = new QuestionView({
				model: question, 
				themes_collection: this.themes_collection,
				parent: this
			});
			this.questions_views.push(view);
		});

		this.questions_views.forEach(view => {
			this.renderChild(view, '.js-list-wrapper');
		})
	}

	deleteQuestion(question) {
		const modal_view = new ModalConfirmView({
			title: 'Внимание!',
			text: 'Вопрос будет удален.',
			type: 'question',
			applyCallback: _.bind(this.deleteQuestionHandler, this, question),
			applyButtonText: 'Удалить',
			applyButtonCss: 'btn-red'
		});
		modal_view.show();
	}

	async deleteQuestionHandler(question) {
		try {
			await question.delete();
			this.questions_collection.remove(question);
			this.renderQuestions();
		} catch(res) {
			app.showError(res);
		}
	}

	getQuestions() {
		const questions = _.filter(this.questions_collection.models, item => {
			return item.theme_id == this.theme_id && this.filterMatched(item);
		});

		return _.sortBy(questions, item => {
			return -item.id;
		})
	}

	changeTheme(e) {
		this.theme_id = e.target.value;
		this.renderQuestions();
	}

	changeFilter(e) {
		this.filter = e.target.value;
		this.renderQuestions();
	}

	filterMatched(question) {
		if(!this.filter) {
			return true;
		}

		return question.question.toLowerCase().indexOf( this.filter.toLowerCase() ) > -1;
	}
}