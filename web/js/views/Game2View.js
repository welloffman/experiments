import AbstractView from '/js/views/AbstractView.js';
import NetTeacherModel from '/js/models/NetTeacherModel.js';

export default class Game2View extends AbstractView {
	constructor(options = {}) {
		super(options);
		this.template = 'game2_view';
		this.class_name = 'game2-view';
		this.offset = {x: 600, y: 5};
		this.size = {width: 500, height: 500};
		this.initKeyHanler();
	}

	templateContext() {
		return {
		};
	}

	getEvents() {
		return [
			['click', '.js-start', 'start'],
			['click', '.js-stop', 'stop'],
			['click', '.js-learn', 'learn']
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
		this.drawBots();
		this.drawShots();
	}

	drawMap() {
		const ctx = this.getCtx();
		ctx.lineWidth = 1;
		ctx.strokeStyle = "black";
		ctx.strokeRect(this.offset.x - 1, this.offset.y - 1, this.size.width + 2, this.size.height + 2);
	}

	drawBots() {
		const ctx = this.getCtx();
		ctx.fillStyle = this.bot1.color;
		ctx.fillRect(this.bot1.x + this.offset.x, this.bot1.y + this.offset.y, this.bot1.width, this.bot1.height);

		ctx.fillStyle = this.bot2.color;
		ctx.fillRect(this.bot2.x + this.offset.x - this.bot2.width, this.bot2.y + this.offset.y, this.bot2.width, this.bot2.height);
	}

	drawShots() {
		const ctx = this.getCtx();

		[this.bot1, this.bot2].forEach(bot => {
			bot.shots.models.forEach(shot => {
				ctx.fillStyle = shot.color;
				ctx.beginPath();
				ctx.arc(shot.x, shot.y, shot.size, 0, 2 * Math.PI, false);
				ctx.fill();
			});
		});
	}

	start() {
		if(this.timer_id) {
			return false;
		}

		this.timer_id = setInterval(() => {
			// this.bot1.randomMove();
			// this.bot1.updateShots();
			
			this.bot1.move(this.bot2);

			// this.bot2.randomMove();
			this.bot2.updateShots();

			this.refresh();
		}, 20);
	}

	stop() {
		if(!this.timer_id) {
			return false;
		}

		clearInterval(this.timer_id);
		this.timer_id = null;
	}

	getCtx() {
		if(!this.ctx) {
			this.ctx = this.getCanvas().getContext("2d");
		}
		return this.ctx;
	}

	getCanvas() {
		if(!this.canvas) {
			this.canvas = this.el.querySelectorAll('.js-canvas-map')[0];
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
		const style_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
		const style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
		canvas.setAttribute('height', style_height * dpi);
		canvas.setAttribute('width', style_width * dpi);
	}

	keydown(e) {
		const bot = this.bot2;
		if(e.code == 'KeyS') {
			this.moveBot(bot, 5);
		} else if(e.code == 'KeyW') {
			this.moveBot(bot, -5);
		}

		if(e.code == 'Space') {
			bot.makeShot();
		}
	}

	moveBot(bot, offset) {
		bot.y += offset;

		const max_y = this.size.height - bot.height;
		if(offset > 0 && bot.y > max_y) {
			bot.y = max_y;
		}

		const min_y = 0;
		if(offset < 0 && bot.y < min_y) {
			bot.y = min_y;
		}
	}

	learn() {
		const net = this.bot1.getNet('direction', 2, 2, 5);
		const inputs = [
			[1, 1],
			[0, 0],
			[1, 0]
		];
		const standards = [
			[1, 1],
			[0, 0],
			[1, 0]
		];

		const teacher = new NetTeacherModel();
		teacher.setProperties({
			net: net,
			inputs: inputs,
			standards: standards
		});
		teacher.start();
	}

	initKeyHanler() {
		window.addEventListener('keydown', e => {
			this.keydown(e);
		}, false);
	}
}