import AbstractModel from '/js/models/AbstractModel.js';

export default class CharacterModel extends AbstractModel {
	sprite;
	i;
	w;
	h;
	map;
	state;

	constructor(attributes = {}) {
		super(attributes);
		this.frame = 0;
		this.step = 1;
	}

	load() {
		this.i = new Image(this.w, this.h);
		this.i.src = this.sprite;
	}

	tik() {
		if(this.step == 1 && !this.map[this.state][this.frame + 1]) {
			this.step = -1;
		} else if(this.step == -1 && this.frame == 0) {
			this.step = 1;
		}

		this.frame += this.step;
	}

	getX() {
		return this.map[this.state][this.frame].x;
	}

	getY() {
		return this.map[this.state][this.frame].y;
	}

	getW() {
		return this.map[this.state][this.frame].w;
	}

	getH() {
		return this.map[this.state][this.frame].h;
	}
}