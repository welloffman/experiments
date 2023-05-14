import AbstractView from '/js/views/AbstractView.js';
import CharacterModel from '/js/models/CharacterModel.js';
import MapCeilModel from '/js/models/MapCeilModel.js';

export default class GameMapView extends AbstractView {
	constructor(options = {}) {
		super(options);
		this.template = 'game_map_view';
		this.class_name = 'game-map-view';
		this.cell_size = 100;
		this.offset = {x: 0, y: 0};

		this.initCharacter();
		this.initMainRender();
	}

	templateContext() {
		return {
		};
	}

	getEvents() {
		return [
			['mousedown', '.js-canvas-map', 'startMoveMapListener'],
			['mouseup', '.js-canvas-map', 'stopMoveMapListener'],
			['mouseout', '.js-canvas-map', 'stopMoveMapListener']
		];
	}

	onRender() {
	}

	initMainRender() {
		setInterval(() => {
			this.renderMap();
		}, 50);
	}

	getCanvas() {
		if(!this.canvas) {
			this.canvas = this.el.querySelectorAll('.js-canvas-map')[0];
		}
		return this.canvas;
	}

	getCtx() {
		if(!this.ctx) {
			this.ctx = this.getCanvas().getContext("2d");
		}
		return this.ctx;
	}

	prepareCanvas() {
		const canvas = this.getCanvas();
		const ctx = this.getCtx();
		const width = this.el.getBoundingClientRect().width;
		const height = this.el.getBoundingClientRect().height;
		ctx.clearRect(0, 0, width, height);

		let dpi = window.devicePixelRatio;
		let style_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
		let style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
		canvas.setAttribute('height', style_height * dpi);
		canvas.setAttribute('width', style_width * dpi);
	}

	renderMap() {
		this.prepareCanvas();

		const width = this.el.getBoundingClientRect().width;
		const height = this.el.getBoundingClientRect().height;
		let offset = this.getLocalOffset();
		let x = 0;
		let y = 0;
		let cell;
		while(height > offset.y) {
			while(width > offset.x) {
				cell = this.getCell(x, y);
				this.drawCell(cell);

				offset.x += cell.diagonal_h;
				x++;
			}

			offset.y += cell.diagonal_v / 2;
			offset.x = this.getLocalOffset().x;
			x = 0;
			y++;
		}

		const c = this.getCell(8, 11);
		this.renderCharacter(c);
	}

	drawCell(cell) {
		const ctx = this.getCtx();

		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.strokeStyle = "white";
		ctx.fillStyle = cell.getColor();

		let point = cell.getPoint('top');
		ctx.moveTo(point.x + this.offset.x, point.y + this.offset.y);
		point = cell.getPoint('right');
		ctx.lineTo(point.x + this.offset.x, point.y + this.offset.y);
		point = cell.getPoint('bottom');
		ctx.lineTo(point.x + this.offset.x, point.y + this.offset.y);
		point = cell.getPoint('left');
		ctx.lineTo(point.x + this.offset.x, point.y + this.offset.y);
		point = cell.getPoint('top');
		ctx.lineTo(point.x + this.offset.x, point.y + this.offset.y);
		ctx.fill();
		ctx.stroke();

		ctx.fillStyle = "black";
		ctx.fillText(cell.x + '-' + cell.y, cell.getCenter().x + this.offset.x, cell.getCenter().y + this.offset.y);

		// const ctx = this.getCtx();
		// ctx.lineWidth = 1;
		// ctx.strokeStyle = "white";
		// ctx.fillStyle = cell.getColor();
		// ctx.fillRect(offset.x, offset.y, this.cell_size, this.cell_size);
		// ctx.strokeRect(offset.x, offset.y, this.cell_size, this.cell_size);
		// ctx.fillStyle = "black";
		// ctx.fillText(cell.x + '-' + cell.y, offset.x, offset.y + 10);
	}

	getLocalOffset() {
		return {
			x: this.offset.x % this.cell_size,
			y: this.offset.y % this.cell_size
		};
	}

	getCell(x, y) {
		const c = new MapCeilModel(this.app);
		let start_x = 0;
		if(y % 2 == 0) {
			start_x = c.diagonal_h / 2;
		}

		const x0 = Math.abs(Math.trunc((this.offset.x + start_x) / c.diagonal_h / 2)) + 1;
		const y0 = Math.abs(Math.trunc(this.offset.y / c.diagonal_v / 2)) + 1;
		return this.collection.getByCoords(x0 + x, y0 + y);
	}

	startMoveMapListener(e) {
		this.mouse_offset = {x: e.pageX, y: e.pageY};
		this.mousemove = this.moveMapListener.bind(this);
		window.addEventListener('mousemove', this.mousemove);
	}

	stopMoveMapListener() {
		window.removeEventListener('mousemove', this.mousemove, false);
	}

	moveMapListener(e) {
		this.local_offset = {
			x: this.mouse_offset.x - e.pageX,
			y: this.mouse_offset.y - e.pageY
		};

		this.offset.x -= this.local_offset.x;
		this.offset.y -= this.local_offset.y;

		if(this.offset.x > 0) {
			this.offset.x = 0;
		}
		if(this.offset.y > 0) {
			this.offset.y = 0;
		}

		const width = this.el.getBoundingClientRect().width;
		const height = this.el.getBoundingClientRect().height;
		const limit_offset = {
			x: width - this.cell_size * Math.sqrt(this.collection.models.length),
			y: height - this.cell_size * Math.sqrt(this.collection.models.length)
		}
		
		if(this.offset.x < limit_offset.x) {
			this.offset.x = limit_offset.x;
		}
		if(this.offset.y < limit_offset.y) {
			this.offset.y = limit_offset.y;
		}

		this.mouse_offset = {x: e.pageX, y: e.pageY};
		// console.log(this.offset);
	}

	renderCharacter(cell) {
		const point = cell.getCenter();
		const w = this.image.getW();
		const h = this.image.getH();
		const x = point.x + this.offset.x - w / 2;
		const y = point.y + this.offset.y - h + 10;
		this.getCtx().drawImage(this.image.i, this.image.getX(), this.image.getY(), w, h, x, y, w, h);
	}

	initCharacter() {
		this.image = new CharacterModel(this.app);
		this.image.setProperties({
			sprite: '/img/sprite.svg',
			w: 700,
			h: 400,
			state: 'bl',
			map: {
				tr: [
					{ x: 296, y: 0, w: 63, h: 175 },
					{ x: 359, y: 0, w: 63, h: 175 },
					{ x: 422, y: 0, w: 63, h: 175 },
					{ x: 484, y: 0, w: 63, h: 175 },
					{ x: 546, y: 0, w: 63, h: 175 }
				],
				tl: [
					{ x: 0, y: 0, w: 60, h: 166 },
					{ x: 60, y: 0, w: 60, h: 166 },
					{ x: 120, y: 0, w: 60, h: 166 },
					{ x: 179, y: 0, w: 60, h: 166 },
					{ x: 238, y: 0, w: 60, h: 166 }
				],
				br: [
					{ x: 317, y: 176, w: 60, h: 183 },
					{ x: 378, y: 176, w: 60, h: 183 },
					{ x: 438, y: 175, w: 60, h: 183 },
					{ x: 497, y: 175, w: 60, h: 183 },
					{ x: 557, y: 175, w: 60, h: 183 }
				],
				bl: [
					{ x: 0, y: 176, w: 64, h: 183 },
					{ x: 64, y: 176, w: 64, h: 183 },
					{ x: 128, y: 176, w: 64, h: 183 },
					{ x: 191, y: 176, w: 64, h: 183 },
					{ x: 254, y: 176, w: 64, h: 183 }
				]
			}
		});
		this.image.load();

		setInterval(() => {
			this.image.tik();
		}, 200);
	}
}