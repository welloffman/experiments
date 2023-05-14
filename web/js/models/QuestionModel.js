import AbstractModel from '/js/models/AbstractModel.js';

export default class QuestionModel extends AbstractModel {
	id;
	question;
	answer;
	theme_id = 1;
	
	constructor(attributes = {}) {
		super(attributes);
	}

	getSaveUrl() {
		return '/post/interview/save-question';
	}

	getDeleteUrl() {
		return '/post/interview/delete-question';
	}
}