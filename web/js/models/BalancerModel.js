import AbstractModel from '/js/models/AbstractModel.js';

export default class BalancerModel extends AbstractModel {
	constructor(attributes = {}) {
		super(attributes);
		this.items = [];
		this.max_count_items = 10000;
	}

	addItem(item) {
		this.items.push(item);
		if(this.items.length > this.max_count_items) {
			this.items.shift();
		}
	}

	makePredicted() {
		const propability = this.calcPropability(1);

		const percent = Math.floor( propability * 100 );
		const part1 = new Array(percent).fill(1);
		const part2 = new Array(100 - percent).fill(0);
		const samples = part1.concat(part2);
		const i = this.randomInteger(0, 99);

		return samples[i];
	}

	randomInteger(min, max) {
		let rand = min - 0.5 + Math.random() * (max - min + 1);
		return Math.round(rand);
	}

	calcPropability(val) {
		let cnt = 0;
		this.items.forEach(item => {
			if(item == val) {
				cnt++;
			}
		});

		const p = cnt / this.items.length || 0.5;

		return 1 - p;
	}

	getStat(cnt) {
		let zero_cnt = 0;
		let one_cnt = 0;
		const items = this.items.slice(-cnt);
		items.forEach(item => {
			if(item < 1) {
				zero_cnt++;
			} else {
				one_cnt++;
			}
		});

		return {0: zero_cnt, 1: one_cnt};
	}
}