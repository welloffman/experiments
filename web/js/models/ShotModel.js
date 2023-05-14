import AbstractModel from '/js/models/AbstractModel.js';

export default class ShotModel extends AbstractModel {
	id;
	direction;
	x;
	y;
	size = 3;
	color = '#ffa638';
	speed = 15;

	constructor(attributes = {}) {
		super(attributes);
	}

	fly() {
		this.x += this.direction * this.speed;
	}

	outOfRange() {
		if(this.x < 0 || this.x > 700) {
			return true;
		}

		return false;
	}
}