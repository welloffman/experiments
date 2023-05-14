import AbstractModel from '/js/models/AbstractModel.js';
import GraphicService from '/js/Services/GraphicService.js';

export default class TileModel extends AbstractModel {
	energy = 1;
	maxEnergy = 1;
	energyRestore = 0.1;
	units = null;
	x = 0;
	y = 0;

	constructor(attributes = {}) {
		super(attributes);
	}

	getColor() {
		const color1 = '#00cc00';
		const color2 = '#a64b00';
		const ratio = this.energy;

		const graphicService = new GraphicService();
		return graphicService.getColor(color1, color2, ratio);
	}

	getUnitOffset(unit, position, tileSize) {
		const cellSize = this.units.size + 1;
		const countInRow = tileSize / cellSize;

		const offsetX = position % countInRow * cellSize;
		const offsetY = Math.trunc(position / countInRow) * cellSize;

		return {x: tileSize * this.x + offsetX, y: tileSize * this.y + offsetY};

	}

	nextTime(tiles, isAlgorithmMode) {
		this.energy += this.energyRestore;
		if(this.energy > this.maxEnergy) {
			this.energy = this.maxEnergy;
		}

		this.units.models.forEach(unit => {
			let energy = 0;
			if(this.energy >= unit.energyConsumption) {
				this.energy -= unit.energyConsumption;
				energy = unit.energyConsumption;
			}
			unit.useEnergy(energy);
		});

		if(this.energy < 0) {
			this.energy = 0;
		}

		this.units.models.forEach(unit => {
			unit.nextTime(tiles, isAlgorithmMode);
		});
	}
}