import AbstractView from '/js/views/AbstractView.js';
import TileModel from '/js/models/Simulation/TileModel.js';
import UnitModel from '/js/models/Simulation/UnitModel.js';
import TileCollection from '/js/collections/Simulation/TileCollection.js';
import TimeRiver from '/js/Services/Simulation/TimeRiver.js';

export default class SimulationView extends AbstractView {
	constructor(options = {}) {
		super(options);
		this.template = 'simulation_view';
		this.class_name = 'simulation-view main-content';
		this.size = {width: 1000, height: 400};
		this.tiles = this.makeTiles();
		this.tiles.makeUnits();
		this.timeRiver = new TimeRiver(this.tiles);
		this.isAlgorithmMode = true;
	}

	templateContext() {
		return {
		};
	}

	getEvents() {
		return [
			['click', '.js-start', 'start'],
			['click', '.js-stop', 'stop'],
			['click', '.js-change-mode', 'changeMode']
		];
	}

	onRender() {
		setTimeout(() => {
			this.refresh();
		});
	}

	refresh() {
		this.clear();
		this.updateSize();
		this.drawMap();
		console.log(this.tiles.countUnits(), this.isAlgorithmMode);
	}

	getCtx() {
		if(!this.ctx) {
			this.ctx = this.getCanvas().getContext("2d");
		}
		return this.ctx;
	}

	getCanvas() {
		if(!this.canvas) {
			this.canvas = this.el.querySelector('.js-canvas');
		}
		return this.canvas;
	}

	width() {
		return this.el.getBoundingClientRect().width;
	}

	height() {
		return this.el.getBoundingClientRect().height;
	}

	clear() {
		this.getCtx().clearRect(0, 0, this.width(), this.height());
	}

	updateSize() {
		const canvas = this.getCanvas();
		const dpi = window.devicePixelRatio;
		canvas.setAttribute('width', this.size.width * dpi);
		canvas.setAttribute('height', this.size.height * dpi);
	}

	drawMap() {
		this.tiles.models.forEach(tile => {
			this.drawTile(tile);
		});
	}

	drawTile(tile) {
		const ctx = this.getCtx();
		ctx.fillStyle = tile.getColor();
		const offset = this.tiles.getOffset(tile);
		ctx.fillRect(offset.x, offset.y, this.tiles.size, this.tiles.size);
		this.drawUnits(tile);
	}

	makeTiles() {
		const tiles = new TileCollection(this.app);
		tiles.rows = 20;
		tiles.cols = 50;

		for(let y = 0; y < tiles.rows; y++) {
			for(let x = 0; x < tiles.cols; x++) {
				const energy = this.app.randomInteger(0, 50) / 100;
				tiles.add({
					x: x,
					y: y,
					energy: energy
				});
			}
		}

		return tiles;
	}

	drawUnits(tile) {
		tile.units.models.forEach((unit, pos) => {
			this.drawUnit(tile, unit, pos);
		});
	}

	drawUnit(tile, unit, position) {
		const ctx = this.getCtx();
		ctx.fillStyle = unit.getColor();
		const offset = tile.getUnitOffset(unit, position, this.tiles.size);
		ctx.fillRect(offset.x, offset.y, tile.units.size, tile.units.size);
	}

	start() {
		this.pid = setInterval(() => {
			this.timeRiver.timeForward(this.isAlgorithmMode);
			this.refresh();
		}, 200);
	}

	stop() {
		if(this.pid) {
			clearInterval(this.pid);
		}
		this.pid = null;
	}

	changeMode() {
		this.isAlgorithmMode = !this.isAlgorithmMode;
	}
}