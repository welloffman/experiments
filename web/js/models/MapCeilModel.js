import AbstractModel from '/js/models/AbstractModel.js';

export default class MapCeilModel extends AbstractModel {
	id;
	type;
	x;
	y;

	constructor(attributes = {}) {
		super(attributes);
		this.diagonal_h = 130;
		this.diagonal_v = 100;
	}

	getColor() {
		const colors = {
			'grass': '#5ec94a',
			'forest': '#199103',
			'sand': '#e1a600',
			'water': '#0e90d2',
			'steppe': '#d3e100'
		};
		return colors[this.type];
	}

	getPoint(type) {
		const point = this.getCenter();
		if(type == 'top') {
			point.y -= this.diagonal_v / 2;
		} else if(type == 'right') {
			point.x += this.diagonal_h / 2;
		} else if(type == 'bottom') {
			point.y += this.diagonal_v / 2;
		} else if(type == 'left') {
			point.x -= this.diagonal_h / 2;
		}
		return point;
	}

	getCenter() {
		const offset_x = this.diagonal_h / 2;
		const offset_y = this.diagonal_v / 2;

		let start_x = 0;
		if(this.y % 2 == 0) {
			start_x = offset_x;
		}

		const x = parseInt(this.x) * offset_x * 2 + start_x;
		const y = parseInt(this.y) * offset_y;
		return {x: x, y: y};
	}
}