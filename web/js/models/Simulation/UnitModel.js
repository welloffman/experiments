import AbstractModel from '/js/models/AbstractModel.js';
import GraphicService from '/js/Services/GraphicService.js';
import MathService from '/js/Services/MathService.js';
import Brain from '/js/models/Simulation/Brain.js';
import Teacher from '/js/Services/Simulation/Teacher.js';

export default class UnitModel extends AbstractModel {
	id;
	energy = 0.5; // Энергия
	maxEnergy = 1; // Максимум энергии
	comfortTileEnergy = 0.4; // Уровень энергии клетка, когда юнит начинает искать новую
	energyConsumption =  0.1; // Потребление энергии из клетки за ход
	energyReproduction = 0.7; // Уровень энергии необходимый для размножения
	breedingCosts = 0.3; // Уровень энергии затрачиваемый при размножении
	lifeEnergy = 0.05; // Трата энергии за ход на жизнедеятельность
	age = 0; // Возраст в ходах
	tile = null;
	maxAge = 10;
	brain;
	teacher;
	maxCountUnitsOnTile = 10;

	constructor(attributes = {}) {
		super(attributes);
		this.makeId();
		this.makeBrain();
	}

	makeId() {
		const mathService = new MathService();
		this.id = mathService.getRandomString();
	}

	makeBrain() {
		this.brain = new Brain(this);
		this.teacher = new Teacher(this.brain);
	}

	isCanReproduce() {
		return this.energy >= this.energyReproduction;
	}

	getColor() {
		const color1 = '#ffffff';
		const color2 = '#000000';
		const ratio = this.energy;

		const graphicService = new GraphicService();
		return graphicService.getColor(color1, color2, ratio);
	}

	// Обработка цикла для юнита
	nextTime(tiles, isAlgorithmMode) {
		this.age++;

		if(isAlgorithmMode) {
			this.stepByAlgorithm(tiles);
		} else {
			this.stepByNet(tiles);
		}

		if(this.isDead()) {
			this.tile.units.remove(this);
		}
	}

	stepByAlgorithm(tiles) {
		let action = 'stay';
		if(this.energy >= this.energyReproduction) {
			action = 'reproduce';
		} else if(this.tile.energy < this.comfortTileEnergy) {
			action = 'move';
		}

		this.teacher.doWork(action, this.getDataForInput());
		this.brain.doAction(action, tiles);
	}

	stepByNet(tiles) {
		this.brain.neuralNet.o.input = this.getDataForInput();
		this.brain.neuralNet.calculate();

		const action = this.brain.getAction();
		this.brain.doAction(action, tiles);
	}

	useEnergy(energy) {
		this.energy += energy;
		this.energy -= this.lifeEnergy;

		if(this.energy > 1) {
			this.energy = 1;
		}

		if(this.energy <= 0) {
			this.energy = 0;
		}
	}

	findNewGoodTile(tiles) {
		const newTile = tiles.findBestTile(this.tile, this.maxCountUnitsOnTile);
		this.tile.units.remove(this);
		newTile.units.models.push(this);
		this.tile = newTile;
	}

	findPartner(tiles) {
		const nearbyTiles = tiles.getNearby(this.tile);
		nearbyTiles.sort((a, b) => {
			if(a.energy > b.energy) {
			    return -1;
			}

			if(a.energy < b.energy) {
				return 1;
			}
			
			return 0;
		});

		let newTile = null;
		for(let i in nearbyTiles) {
			let tile = nearbyTiles[i];
			let countPartners = 0;
			tile.units.models.forEach(unit => {
				if(unit.energy >= this.energyReproduction && unit.id != this.id) {
					countPartners++;
				}
			});

			if(countPartners) {
				newTile = tile;
				break;
			}
		}

		if(!newTile) {
			const i = this.app.randomInteger(0, nearbyTiles.length - 1);
			newTile = nearbyTiles[i];
		}

		this.tile.units.remove(this);
		newTile.units.models.push(this);
		this.tile = newTile;
	}

	tryReproduce() {
		for(let i in this.tile.units.models) {
			let item = this.tile.units.models[i];
			if(item.id == this.id) {
				return false;
			}

			if(item.isCanReproduce()) {
				const newUnit = new UnitModel(this.app);
				newUnit.tile = this.tile;
				newUnit.brain.cloneBrain(this.brain);
				
				this.tile.units.models.push(newUnit);
				this.energy -= this.breedingCosts;
				item.energy -= item.breedingCosts;
				return true;
			}
		}

		return false;
	}

	isDead() {
		if(this.energy == 0) {
			return true;
		}

		const rnd = this.app.randomInteger(1, this.maxAge) * 10;
		if(rnd < this.age) {
			return true;
		}

		return false;
	}

	getDataForInput() {
		const data = [this.energy, this.tile.energy];
		data.push( this.tile.units.models.length / this.maxCountUnitsOnTile );
		data.push( this.age / this.maxAge );
		return data;
	}
}