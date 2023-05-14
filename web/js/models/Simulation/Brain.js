import NeuralNet from '/js/models/NeuralNet.js';

export default class Brain {
	unit; // юнит, которому принадлежит мозг
	neuralNet; // нейросеть, которая определяет поведение юнита
	inputs; // массив входных данных для нейросети
	outputs; // массив выходных данных из нейросети
	actions; // массив возможных действий юнита

	constructor(unit) {
		this.unit = unit;
		this.makeNeuralNet();
		this.inputs = [];
		this.outputs = [];
		this.actions = ['move', 'reproduce', 'stay'];
	}

	makeNeuralNet() {
		this.neuralNet = new NeuralNet();
		this.neuralNet.init(4, 3, 3);
		this.neuralNet.makeWeights();
		this.neuralNet.o.norma = 0.05;
	}

	getAction() {		
		const outputs = this.neuralNet.getOutput();
		let maxIndex = 0;
		let maxValue = 0;

		for(let i = 0; i < outputs.length; i++) {
			if (outputs[i] > maxValue) {
				maxIndex = i;
				maxValue = outputs[i];
			}
		}

		return this.actions[maxIndex];
	}

	doAction(action, tiles) {
		if(action == 'move') {
			this.unit.findNewGoodTile(tiles);
			return true;
		}

		if(action == 'reproduce') {
			if(this.unit.isCanReproduce()) {
				let isReproduced = this.unit.tryReproduce();
				if(!isReproduced) {
					this.unit.findPartner(tiles);
				}
			}
			return true;
		}

		return false;
	}

	cloneBrain(brain) {
		this.neuralNet.o.inputHiddenW = _.clone(brain.neuralNet.o.inputHiddenW);
		this.neuralNet.o.hiddenOutputW = _.clone(brain.neuralNet.o.hiddenOutputW);
	}
}