import AbstractCollection from '/js/collections/AbstractCollection.js';
import MapCeilModel from '/js/models/MapCeilModel.js';

export default class MapCeilCollection extends AbstractCollection {
	getObject() {
		return new MapCeilModel(this.app);
	}

	getByCoords(x, y) {
		const row_length = Math.sqrt(this.models.length);
		const pos = (y - 1) * row_length + x - 1;
		return this.models[pos];
	}

	fetchItems() {
		return new Promise((resolve, reject) => {
			this.app.request('/post/game/fetch-cells', {}, res => {
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