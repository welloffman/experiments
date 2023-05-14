export default class TimeRiver {
	tiles;

	constructor(tiles) {
		this.tiles = tiles;
	}

	timeForward(isAlgorithmMode) {
		this.tiles.models.forEach(tile => {
			tile.nextTime(this.tiles, isAlgorithmMode);
		});
	}
}