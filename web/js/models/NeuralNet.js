import AbstractModel from '/js/models/AbstractModel.js';

export default class NeuralNet extends AbstractModel {
	id;
	type;
	o = {
		input: [],
		hidden: [],
		output: [],
		inputHiddenW: {},
		hiddenOutputW: {},
		norma: 0.15,
		standard: []
	}

	constructor(attributes = {}) {
		super(attributes);
	}

	init(inputSize, outputSize, hiddenSize) {
		let options = {};
		options.input = new Array(inputSize).fill(0);
		options.hidden = new Array(hiddenSize).fill(0);
		options.output = new Array(outputSize).fill(0);
		this.setOptions(options);
	}

	setOptions(data) {
		_.each(data, (value, key) => {
			if(this.o[key] !== undefined) {
				this.o[key] = value;
			}
		});
	}

	makeWeights() {
		this.o.inputHiddenW = this.makeRandomWeights(_.size(this.o.input), _.size(this.o.hidden));
		this.o.hiddenOutputW = this.makeRandomWeights(_.size(this.o.hidden), _.size(this.o.output));
	}

	getOutput() {
		return this.o.output;
	}

	getInput() {
		return this.o.input;
	}

	getHidden() {
		return this.o.hidden;
	}

	getStandard() {
		return this.o.standard;
	}

	calculate() {
		this.makeValues(this.o.input, this.o.hidden, this.o.inputHiddenW);
		this.makeValues(this.o.hidden, this.o.output, this.o.hiddenOutputW);
	}

	fix() {
		let outputErrors = this.getOutputErrors();
		let hiddenOutputDeltas = this.getDeltas(outputErrors, this.o.hidden, this.o.hiddenOutputW);
	
		let hiddenErrors = this.getErrors(outputErrors, this.o.hidden, this.o.hiddenOutputW);
		let inputHiddenDeltas = this.getDeltas(hiddenErrors, this.o.input, this.o.inputHiddenW);

		_.each(this.o.hiddenOutputW, (row, i) => {
			_.each(row, (weight, k) => {
				this.o.hiddenOutputW[i][k] += hiddenOutputDeltas[i][k];
			}, this);
		}, this);

		_.each(this.o.inputHiddenW, (row, i) => {
			_.each(row, (weight, k) => {
				this.o.inputHiddenW[i][k] += inputHiddenDeltas[i][k];
			}, this);
		}, this);

		this.calculate();
	}

	getWeights() {
		return [this.o.inputHiddenW, this.o.hiddenOutputW];
	}

	getOutputStandardDiff(rounding) {
		let averageDiff;

		if(rounding == undefined) {
			rounding = 2;
		}

		if(_.size(this.o.output) == _.size(this.o.standard)) {
			let diffSum = 0;
			_.each(this.o.output, (item, i) => {
				diffSum += Math.abs(item - this.o.standard[i]);
			});

			averageDiff = (diffSum / _.size(this.o.output)).toFixed(rounding) * 1;
		}

		return averageDiff;
	}

	makeRandomWeights(sizeIn, sizeOut) {
		let result = [];
		for(let i = 0; i < sizeIn; i++) {
			result[i] = [];
			for(let j = 0; j < sizeOut; j++) {
				result[i][j] = this.getRandomArbitrary(-5, 5).toFixed(3) * 1;
			}
		}

		return result;
	}

	getRandomArbitrary(min, max) {
		return Math.random() * (max - min) + min;
	}

	makeValues(inp, out, weights) {
		for(let k in out) {
			let totalValue = 0;
			_.each(inp, (inputValue, i) => {
				totalValue += weights[i][k] * inputValue;
			});

			out[k] = this.funcActivation(totalValue);
		}
	}

	funcActivation(value) {
		return 1 / (1 + Math.pow(Math.E, -value));
	}





	getOutputErrors() {
		let result = [];
		_.each(this.o.output, (item, i) => {
			let standard = this.o.standard[i];

			let value = (item < 0.001 || item > 0.999) ? standard - item : (standard - item) * item * (1 - item);

			result.push(value);
		}, this);

		return result;
	}

	getErrors(errors, neurons, weights) {
		let result = [];
		_.each(neurons, (neuron, i) => {
			let value = 0;
			_.each(weights[i], (weight, k) => {
				value += errors[k] * weight * neuron * (1 - neuron);
			});
			result.push(value);
		});
		
		return result;
	}

	getDeltas(errors, neurons, weights) {
		let result = [];
		for(let k in weights) {
			let row = [];
			_.each(weights[k], (weight, i) => {
				let delta = neurons[k] * errors[i] * this.o.norma;
				row.push(delta);
			}, this);
			result.push(row);
		}

		return result;
	}
}