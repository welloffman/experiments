import AbstractView from '/js/views/AbstractView.js';
import NetTeacherModel from '/js/models/NetTeacherModel.js';

export default class NetSampleGenerator extends AbstractView {
	constructor(options = {}) {
		super(options);
		this.template = 'net_sample_generator';
		this.class_name = 'net-sample-generator';
	}

	templateContext() {
		return {
		};
	}

	getEvents() {
		return [
			// ['click', '.js-start', 'start'],
			// ['click', '.js-stop', 'stop'],
			// ['click', '.js-learn', 'learn']
		];
	}

	onRender() {
		setTimeout(() => {
			this.refresh();
		});
	}

	refresh() {
		this.clear();
		this.drawBox();
	}

	drawBox() {
		const ctx = this.getCtx();

		ctx.beginPath();
		const x = this.getCoord(this.offset.x);
		const y = this.getCoord(this.offset.y);
		
		ctx.fillStyle = this.backgroundColor;
		ctx.fillRect(0, 0, this.width(), this.height());
		
		ctx.fillStyle = this.color;
		// ctx.fillRect(x, y, this.size, this.size);
		this.rotateBox(x, y);
		ctx.fillRect(x, y, this.size, this.size);
	}

	getCoord(val) {
		let coord = this.width() / 2 - val;
		
		const maxLeftPoint = coord - Math.sqrt(this.size * this.size * 2) / 2;
		if(maxLeftPoint < 0) {
			coord += Math.abs(maxLeftPoint);
		}

		return coord;
	}

	rotateBox(x, y) {
		const ctx = this.getCtx();
		const tx = x + this.size / 2;
		const ty = y + this.size / 2;
		ctx.translate(tx, ty);
		ctx.rotate(this.angle * Math.PI / 180);
		ctx.translate(-tx, -ty);
	}

	getCtx() {
		return this.getCanvas().getContext("2d");
	}

	getCanvas() {
		return this.el.querySelector('.js-canvas');
	}

	width() {
		return this.el.getBoundingClientRect().width;
	}

	height() {
		return this.el.getBoundingClientRect().height;
	}

	clear() {
		const canvas = this.getCanvas();
		const dpi = window.devicePixelRatio;
		const style_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
		const style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
		canvas.setAttribute('height', style_height * dpi);
		canvas.setAttribute('width', style_width * dpi);
		// this.getCtx().translate(0.5, 0.5);

		this.getCtx().clearRect(0, 0, this.width(), this.height());
	}




	getData() {
		const ctx = this.getCtx();
		const data = [];
		for(let x = 0; x < this.width(); x++) {
			for(let y = 0; y < this.height(); y++) {
				let d = ctx.getImageData(x, y, 1, 1).data;
				data.push( Math.round((d[0] + d[1] + d[2]) / 3) );
			}
		}

		return data;
	}
}