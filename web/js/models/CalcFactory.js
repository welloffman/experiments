import AbstractModel from '/js/models/AbstractModel.js';
import CalcView from '/js/views/CalcView.js';
import CalcDivView from '/js/views/CalcDivView.js';
import CalcModel from '/js/models/CalcModel.js';
import DivisionModel from '/js/models/DivisionModel.js';

export default class CalcFactory extends AbstractModel {
	calc_model;
	calc_view;
	
	constructor(app, attributes = {}) {
		super(app, attributes);
	}

	make(calc_data) {
		if(calc_data.operation == '÷') {
			this.calc_model = new DivisionModel(this.app, calc_data);
			this.calc_view = new CalcDivView({app: this.app, model: this.calc_model});
		} else {
			this.calc_model = new CalcModel(this.app, calc_data);
			this.calc_view = new CalcView({app: this.app, model: this.calc_model});
		}
	}

	passNumber(n) {
		if(this.calc_model.isReady()) {
			this.calc_model.updateStep(n);
		} else if(this.calc_model.isNumber1Active() || this.calc_model.isNumber2Active()) {
			this.calc_model.fillNumbers(n);
		} else {
			this.calc_model.fillAnswer(n);
		}
	}

	passEnter() {
		if(this.calc_model.isNumber1Active() && this.calc_model.number1.length) {
			this.calc_model.setNumber2Status();
		} else if(this.calc_model.isNumber2Active() && this.calc_model.number2.length) {
			this.calc_model.setReadyStatus();
		} else if(!this.calc_model.isLastStep()) {
			this.calc_model.nextStep();
		}
	}

	changeOperation(s) {
		if(s == this.calc_model.operation) {
			return false;
		}

		const status = (s == '÷') ? 1 : 1;

		this.make({
			number1: this.calc_model.number1,
			number2: this.calc_model.number2,
			answer: '',
			operation: s,
			status: status
		});
	}

	pressSpace() {
		if(this.calc_model.operation == '÷' && this.calc_model.isReady()) {
			this.calc_model.updateStep('');
		}
	}
}