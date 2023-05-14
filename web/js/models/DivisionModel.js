import CalcModel from '/js/models/CalcModel.js';

export default class DivisionModel extends CalcModel {
	number1;
	number2;
	answer = '';
	steps = [];
	status = 0;
	map;
	
	constructor(app, attributes = {}) {
		super(app, attributes);
		this.setProperties(attributes);
	}

	clear() {
		this.setProperties({
			memory: [],
			number1: '',
			number2: '',
			answer: '',
			steps: [],
			status: 0,
			map: undefined
		});
	}

	isAnswerActive() {
		return this.status == 3;
	}

	setAnswerStatus() {
		this.status = 3;
	}

	isLastStep(step_num = null) {
		if(!this.number2) {
			return false;
		}
		
		return this.getMap().length == this.steps.length;
	}

	nextStep() {
		if(this.isAnswerActive()) {
			this.steps.push([]);
			this.setReadyStatus();
		} else if(this.steps.length % 2 == 0) {
			this.setAnswerStatus();
		} else {
			const parts = this.getLastStep();
			if(parts.length != 0) {
				this.steps.push([]);
			}
		}
	}

	updateStep(n) {
		if(!this.steps.length) {
			this.steps.push([]);
		}

		const i = this.steps.length - 1;
		const parts = this.getLastStep();

		if(parts.length > 10) {
			return false;
		}

		parts.push(n);
		this.steps[i] = parts;
	}

	calculate() {
		return this.number1 / this.number2;
	}

	isCorrect() {
		return this.answer == this.calculate();
	}

	backspace() {
		if(this.isReady()) {
			const parts = this.getLastStep();
			if(!this.steps.length) {
				this.setAnswerStatus();
			} else if(parts.length > 0) {
				const i = this.steps.length - 1;
				parts.pop();
				this.steps[i] = parts;
			} else {
				this.steps.pop();
			}
		} else if(this.isNumber1Active()) {
			this.number1 = this.number1.slice(0, -1);
		} else if(this.isNumber2Active()) {
			if(this.number2.length) {
				this.number2 = this.number2.slice(0, -1);
			} else {
				this.status = 0;
			}
		} else {
			this.answer = this.answer.slice(0, -1);
		}	
	}

	fillAnswer(symbol) {
		this.answer += symbol;
	}

	getMap() {
		if(!this.map) {
			this.map = [];
			const n1 = this.getParts(this.number1);
			let a = '';
			while(n1.length) {
				a = a + n1.shift();

				const int_part = Math.floor(a / this.number2);
				if(int_part > 0) {
					this.map.push( parseInt(a) );
					this.map.push(int_part * this.number2);
					a = a - int_part * this.number2;
				}
			}

			this.map.shift();
		}

		return this.map;
	}

	isCorrectByStep(p, k) {
		if(this.steps[p][k] === '') {
			return true;
		}

		const offset = this.steps[p].length - this.steps[p].filter(Boolean).length;

		const map = this.getMap();
		const parts = this.getParts( map[p] );
		return parts[k - offset] == this.steps[p][k];
	}
}