import AbstractModel from '/js/models/AbstractModel.js';

export default class CalcModel extends AbstractModel {
	memory = [];
	number1;
	number2;
	operation;
	steps = [[]];
	status = 0;
	
	constructor(app, attributes = {}) {
		super(app, attributes);
		this.setProperties(attributes);
	}

	clear() {
		this.setProperties({
			memory: [],
			number1: '',
			number2: '',
			operation: '',
			steps: [[]],
			status: 0
		});
	}

	isNumber1Active() {
		return this.status == 0;
	}

	isNumber2Active() {
		return this.status == 1;
	}

	isReady() {
		return this.status == 2;
	}

	setReadyStatus() {
		this.status = 2;
	}

	setNumber2Status() {
		this.status = 1;
	}

	getParts(item) {
		return String(item).split('');
	}

	cursorAtStep(step) {
		return step == this.steps.length - 1;
	}

	isLastStep(step_num = null) {
		if(this.operation == '+' || this.operation == '-') {
			return true;
		}

		if(!this.number2) {
			return false;
		}

		if(step_num === null) {
			step_num = this.steps.length - 1;
		}

		return (this.isReady() && this.number2 < 10) || this.getParts(this.number2).length < step_num + 1;
	}

	updateStep(n) {
		const i = this.steps.length - 1;
		const parts = this.getLastStep();

		if(parts.length > 10) {
			return false;
		}

		parts.unshift(n);
		this.steps[i] = parts;
	}

	getLastStep() {
		const i = this.steps.length - 1;
		return this.steps[i];
	}

	nextStep() {
		const parts = this.getLastStep();
		if(parts.length != 0 && parts[0] !== '') {
			this.steps.push([]);
		}
	}

	isCorrect() {
		return this.isLastStep() && this.getLastStep().join('') == this.calculate();
	}

	calculate() {
		let result = -1;

		if(this.operation == '×') {
			result = this.number1 * this.number2;
		} else if(this.operation == '+') {
			result = parseInt(this.number1) + parseInt(this.number2) + '';
		} else if(this.operation == '-') {
			result = parseInt(this.number1) - parseInt(this.number2) + '';
		}

		return result;
	}

	backspace() {
		if(this.isReady()) {
			const parts = this.getLastStep();
			if(parts.length > 0) {
				const i = this.steps.length - 1;
				parts.shift();
				this.steps[i] = parts;
			} else if(this.steps.length > 1) {
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
		}		
	}

	isCorrectByStep(p, k) {
		let result;
		
		if(this.isLastStep(p)) {
			result = this.getParts(this.calculate());
		} else {
			const mult = this.getParts(this.number2).reverse()[p];
			result = this.getParts(mult * this.number1);
		}

		const steps_items = this.steps[p].slice(0);
		
		if(steps_items.length < result.length) {
			result = result.slice(-steps_items.length);
		}
		
		while(steps_items.length > result.length) {
			result.unshift('');
		}

		return result[k] === steps_items[k]; 
	}

	fillNumbers(symbol) {
		if(this.isNumber1Active()) {
			this.number1 += symbol;
		} else {
			this.number2 += symbol;
		}
	}
}