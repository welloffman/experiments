import AbstractView from '/js/views/AbstractView.js';
import KeyboardView from '/js/views/KeyboardView.js';
import CalcFactory from '/js/models/CalcFactory.js';

export default class ColumnarCalculationsView extends AbstractView {
	constructor(options = {}) {
		super(options);
		this.template = 'columnar_calculations_view';
		this.class_name = 'columnar-calculations-view main-content';
	}

	templateContext() {
		return {
		};
	}

	getEvents() {
		return [
			// ['change', '.js-field', 'changeField'],
		];
	}

	onRender() {
		this.renderKeyboard();
		this.renderCalc();
	}

	renderKeyboard() {
		if(this.keyboard_view) {
			this.keyboard_view.remove();
		}

		this.keyboard_view = new KeyboardView({
			app: this.app, 
			changeCallback: this.buttonPress.bind(this)
		});

		this.renderChild(this.keyboard_view, '.js-keyboard-wrapper');
	}

	buttonPress(symbol) {
		if( Number.isInteger(parseInt(symbol)) ) {
			this.cf.passNumber(symbol);
		} else if(symbol == 'Enter') {
			this.updateResult();
			this.cf.passEnter();
		} else if(symbol == 'backspace') {
			this.cf.calc_model.backspace();
			this.updateResult();
		} else if(symbol == 'Clear') {
			this.cf.calc_model.clear();
			this.updateResult();
		} else if(symbol == '×' || symbol == '-' || symbol == '+' || symbol == '÷') {
			this.cf.calc_view.remove();
			this.cf.changeOperation(symbol);
			this.renderChild(this.cf.calc_view, '.js-calc-wrapper');
		} else if(symbol == 'space') {
			this.cf.pressSpace();
		}

		this.cf.calc_view.render();
	}

	renderCalc() {
		if(this.cf) {
			this.cf.calc_view.remove();
		} else {
			this.cf = new CalcFactory();
			this.cf.make({
				number1: 1125,
				number2: 25,
				operation: '÷',
				status: 3
			});
		}

		this.renderChild(this.cf.calc_view, '.js-calc-wrapper');
	}

	updateResult() {
		let result = '';
		if(this.cf.calc_model.isLastStep()) {
			result = this.cf.calc_model.isCorrect() ? 'Правильно!' : 'Не верно...';
		}

		this.el.querySelector('.js-result').innerHTML = result;
	}
}