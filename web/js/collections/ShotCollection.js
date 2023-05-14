import AbstractCollection from '/js/collections/AbstractCollection.js';
import ShotModel from '/js/models/ShotModel.js';

export default class ShotCollection extends AbstractCollection {
	getObject() {
		return new ShotModel(this.app);
	}

	addItem(shot) {
		shot.id = this.incrementId();
		this.models.push(shot);
	}

	incrementId() {
		if(!this.models.length) {
			return 1;
		}

		const last_id = this.models[ this.models.length - 1 ].id;
		return last_id + 1;
	}
}