import AbstractCollection from '/js/collections/AbstractCollection.js';
import QuestionModel from '/js/models/QuestionModel.js';

export default class QuestionsCollection extends AbstractCollection {
	getObject() {
		return new QuestionModel(this.app);
	}

	fetchAll() {
		return new Promise((resolve, reject) => {
			this.app.request('/post/interview/fetch-questions', {}, res => {
				if(res.success) {
					this.reset(res.items);
					resolve(res);
				} else {
					reject(res);
				}
			});
		});
	}
}