export default class Teacher {
	brain;
	approveDiff = 0.1;
	maxIterations = 50;

	constructor(brain) {
		this.brain = brain;
	}

	doWork(action, input) {
		this.brain.neuralNet.o.standard = this.getStandard(action);
		this.brain.neuralNet.o.input = input;
		this.brain.neuralNet.calculate();

		let i = 0;
		// let diff = this.brain.neuralNet.getOutputStandardDiff();
		while(this.hasError() && i < this.maxIterations) {
			this.brain.neuralNet.fix();
			this.brain.neuralNet.getOutputStandardDiff();
			i++;
		}

		// console.log(this.neuralNet.getOutput(), this.neuralNet.getStandard(), this.getAction());
	}

	hasError() {
		let diff;

		for(let i in this.brain.neuralNet.o.standard) {
			diff = Math.abs( this.brain.neuralNet.o.standard[i] - this.brain.neuralNet.o.output[i] )
			if(diff > this.approveDiff) {
				return true;
			}
		}

		return false;
	}

	getStandard(action) {
		const standardList = {
			move: [1, 0, 0],
			reproduce: [0, 1, 0],
			stay: [0, 0, 1]
		};

		return standardList[action];
	}
}