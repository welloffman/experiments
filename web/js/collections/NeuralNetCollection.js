import AbstractCollection from '/js/collections/AbstractCollection.js';
import NeuralNet from '/js/models/NeuralNet.js';

export default class NeuralNetCollection extends AbstractCollection {
	getObject() {
		return new NeuralNet(this.app);
	}

	// fetchAll() {
	// 	return new Promise((resolve, reject) => {
	// 		this.app.request('/post/interview/fetch-questions', {}, res => {
	// 			if(res.success) {
	// 				this.reset(res.items);
	// 				resolve(res);
	// 			} else {
	// 				reject(res);
	// 			}
	// 		});
	// 	});
	// }

	getByType(type) {
		for(let i in this.models) {
			if(this.models[i].type == type) {
				return this.models[i];
			}
		}
		return null;
	}
}