import AbstractModel from '/js/models/AbstractModel.js';
import NeuralNet from '/js/models/NeuralNet.js';

export default class NostradamusModel extends AbstractModel {
	net;
	random_set;
	success_count;
	total_count;

	constructor(attributes = {}) {
		super(attributes);
		this.success_count = 0;
		this.total_count = 0;
		this.makeNet(20);
	}

	makeRandomSet(size) {
		this.random_set = [];
		for(let i = 0; i < size; i++) {
			const val = this.randomInteger(0,1);
			this.random_set.push(val);
		}
	}

	makeNet(size = 10) {
		const input_size = size;
		const hidden_size = size;
		this.net = new NeuralNet();
		this.net.init(input_size, 1, hidden_size);
		this.net.makeWeights();
	}

	getFortune() {
		const output = this.net.getOutput();
		const fortune = output[0] > 0.5 ? 1 : 0;
		return fortune;
	}

	checkFortune(random_value) {
		this.net.o.input = this.random_set;
		this.net.calculate();

		const fortune = this.getFortune();

		this.total_count++;
		if(random_value == fortune) {
			this.success_count++;
		}

		this.pushRandomValue(random_value);
console.log({random_value: random_value, fortune: fortune});
		return fortune;
	}

	randomInteger(min, max) {
		let rand = min - 0.5 + Math.random() * (max - min + 1);
		return Math.round(rand);
	}

	pushRandomValue(random_value) {
		this.random_set.shift();
		this.random_set.push(random_value);
	}

	learn(standard) {
		this.net.o.standard = standard;
		while(this.getFortune() != standard[0]) {
			this.net.fix();
			this.net.calculate();
			console.log( this.net.getOutput() );
		}
	}
}