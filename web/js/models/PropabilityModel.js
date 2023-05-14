import AbstractModel from '/js/models/AbstractModel.js';

export default class PropabilityModel extends AbstractModel {
	constructor(attributes = {}) {
		super(attributes);
		this.options = {repeat_num: 1000};
		this.result = {
			equilibrium: 0, 
			total_try: 0, 
			equilibrium_ratio: 0, 
			max_diff: 0, 
			max_diff_ratio: 0,
			gold_ratios: [{ratio: '0.0', count: 0}],
			changes: 0,
			stability: 0
		};
		this.ratios = {};
		this.last_try = -1;
	}

	getRepeatNum() {
		return this.options.repeat_num;
	}

	run() {
		for(let i = 0; i < this.getRepeatNum(); i++) {
			this.turn();
		}

		console.log(this.result.gold_ratios);
	}

	turn() {
		const options = this.options;
		const result = this.result;

		const random_result = this.randomInteger(0, 1);
		const offset = random_result ? -1 : 1;

		result.equilibrium += offset;
		result.total_try++;

		const abs_equilibrium = Math.abs(result.equilibrium);
		const ratio = abs_equilibrium / result.total_try;

		result.equilibrium_ratio = ratio.toFixed(4);

		this.calculateGoldRatio( (abs_equilibrium * ratio).toFixed(1) );
		
		if(abs_equilibrium > result.max_diff) {
			result.max_diff = abs_equilibrium;
			result.max_diff_ratio = result.equilibrium_ratio;
		}

		if(this.last_try == random_result) {
			this.result.stability++;
		} else {
			this.result.changes++;
		}

		this.last_try = random_result;
	}

	randomInteger(min, max) {
		let rand = min - 0.5 + Math.random() * (max - min + 1);
		return Math.round(rand);
	}

	calculateGoldRatio(ratio) {
		const result = this.result;
		const key = 'r' + ratio;
		if(!this.ratios[key]) {
			this.ratios[key] = 0;
		}

		this.ratios[key]++;
		
		const item = {ratio: ratio, count: this.ratios[key]};
		let ratio_inserted = false;
		
		for(let i in result.gold_ratios) {
			if(this.ratios[key] > result.gold_ratios[i].count) {
				result.gold_ratios.splice(i, 0, item);
				ratio_inserted = true;

				i = parseInt(i);
				const gold_ratios_cnt = _.size(result.gold_ratios);
				if(i < gold_ratios_cnt - 1) {
					for(let pos = i + 1; pos < gold_ratios_cnt; pos++) {
						if(result.gold_ratios[pos].ratio == item.ratio) {
							result.gold_ratios.splice(pos, 1);
							break;
						}
					}
				}

				// result.gold_ratios = result.gold_ratios.slice(0, gold_ratios_cnt);

				break;
			}
		}

		if(!ratio_inserted) {
			result.gold_ratios.push(item);
		}
	}

	getGoldRatio() {
		return this.result.gold_ratios[0];
	}
}