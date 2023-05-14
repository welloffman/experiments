export default class AbstractModel {
	constructor(app, attributes = {}) {
		this.app = app;
	}

	setProperties(attributes) {
		for(let key in attributes) {
			this[key] = attributes[key];
		}
	}

	isNew() {
		return !this.id;
	}

	getDataForSave() {
		let data = {};
		Object.getOwnPropertyNames(this).forEach((val, idx, array) => {
			data[val] = this[val];
		});

		if(data.app) {
			delete data.app;
		}

		return data;
	}

	save() {
		return new Promise((resolve, reject) => {
			this.app.request(this.getSaveUrl(), {data: this.getDataForSave()}, res => {
				if(res.success) {
					this.id = parseInt(res.id);
					resolve(res);
				} else {
					reject(res);
				}
			});
		});
	}

	delete() {
		return new Promise((resolve, reject) => {
			this.app.request(this.getDeleteUrl(), {id: this.id}, res => {
				if(res.success) {
					resolve(res);
				} else {
					reject(res);
				}
			});
		});
	}

	getProps() {
		const keys = Object.getOwnPropertyNames(this);
		const props = {};
		keys.forEach(key => {
			props[key] = this[key];
		});
		return props;
	}

	getSaveUrl() {
		return '';
	}

	getDeleteUrl() {
		return '';
	}
}