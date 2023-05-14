import AbstractCollection from '/js/collections/AbstractCollection.js';
import TileModel from '/js/models/Simulation/TileModel.js';
import UnitCollection from '/js/collections/Simulation/UnitCollection.js';

export default class TileCollection extends AbstractCollection {
	size = 20;
	rows = 50;
	cols = 50;

	getObject() {
		return new TileModel(this.app);
	}

	getOffset(tile) {
		return {x: this.size * tile.x, y: this.size * tile.y};
	}

	makeUnits() {
		this.models.forEach(tile => {
			tile.units = new UnitCollection(this.app);
			
			for(let i in [0, 1]) {
				if(this.app.randomInteger(0, 10) < 2) {
					tile.units.add({tile: tile});
				}
			}

			// if(tile.x == 10 && tile.y == 10) {
			// 	tile.units = new UnitCollection(this.app);
			// 	tile.units.add({tile: tile});
			// }
		});
	}

	getByCoords(x, y) {
		for(let i in this.models) {
			let item = this.models[i];
			if(item.x == x && item.y == y) {
				return item;
			}
		}

		return null;
	}

	getNearby(tile) {
		const tilesNearby = [];
		for(let x = tile.x - 1; x <= tile.x + 1; x++) {
			for(let y = tile.y - 1; y <= tile.y + 1; y++) {
				if(x == tile.x && y == tile.y) {
					continue;
				}

				let item = this.getByCoords(x, y);
				if(item) {
					tilesNearby.push(item);
				}
			}
		}

		return tilesNearby;
	}

	findBestTile(tile, maxCountUnitsOnTile) {
		let bestTile = tile;
		this.getNearby(tile).forEach(item => {
			if(bestTile.energy < item.energy && item.units.models.length < maxCountUnitsOnTile) {
				bestTile = item;
			}
		});

		return bestTile;
	}

	countUnits() {
		let cnt = 0;
		this.models.forEach(tile => {
			cnt += tile.units.models.length;
		});
		
		return cnt;
	}
}