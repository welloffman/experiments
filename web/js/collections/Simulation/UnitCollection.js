import AbstractCollection from '/js/collections/AbstractCollection.js';
import UnitModel from '/js/models/Simulation/UnitModel.js';

export default class UnitCollection extends AbstractCollection {
	size = 2;

	getObject() {
		return new UnitModel(this.app);
	}

	getOffset(unit, tileSize) {
		return {x: tileSize * unit.x + tileSize / 2, y: tileSize * unit.y + tileSize / 2};
	}
}