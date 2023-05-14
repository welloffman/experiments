export default class AbstractCollection {
	constructor(app, items = []) {
		this.models = [];
		this.reset(items);
		this.app = app;
	}

	getObject() {
		// Реализовать в наследниках
	}

	reset(items) {
		this.models = [];
		items.forEach(item => {
			const model = this.getObject();
			model.setProperties(item);
			this.models.push(model);
		});
	}

	add(params) {
		const model = this.getObject();
		model.setProperties(params);
		this.models.push(model);
	}

	remove(model) {
		for(let i in this.models) {
			if(this.models[i].id == model.id) {
				this.models.splice(i, 1);
				break;
			}
		}
	}

	findById(id) {
		for(let i in this.models) {
			if(this.models[i].id == id) {
				return this.models[i];
			}
		}

		return null;
	}
}