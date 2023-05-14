import AbstractView from '/js/views/AbstractView.js';
import PropabilityModel from '/js/models/PropabilityModel.js';
import NostradamusModel from '/js/models/NostradamusModel.js';
import BalancerModel from '/js/models/BalancerModel.js';

export default class ProbabilityView extends AbstractView {
	constructor(options = {}) {
		super(options);
		this.template = 'probability_view';
		this.class_name = 'probability-view main-content';
		this.startListeners();
	}

	templateContext() {
		return {
			options: this.model.options,
			result: this.model.result,
			gold_ratio: this.model.getGoldRatio()
		};
	}

	getEvents() {
		return [
			['change', '.js-field', 'changeField'],
			['click', '.js-start-count', 'startCount'],
			['click', '.js-reset', 'reset'],
			['click', '.js-start-random', 'startRandom'],
			['click', '.js-reset-random', 'resetRandom'],
			['click', '.js-start-nostradamus', 'startNostradamus'],
			['click', '.js-learn-nostradamus', 'learnNostradamus'],
			['click', '.js-start-nostradamus-pack', 'learnNostradamusPack']
		];
	}

	changeField(e) {
		const input = $(e.target);
		const type = input.data('type');
		const value = input.val();
		
		const options = this.model.options;
		options[type] = value;
		console.log('changeField');
	}

	startCount() {
		this.model.run();
		this.render();
	}

	reset() {
		this.model = new PropabilityModel();
		this.render();
	}

	getBalancer() {
		if(!this.balancer) {
			this.balancer = new BalancerModel();
		}

		return this.balancer;
	}

	startRandom() {
		this.resetRandom();

		const balancer = this.getBalancer();
		let predicted_matched = 0;

		let i = 0;
		while(i < this.model.options.repeat_num_random) {
			const predicted = balancer.makePredicted();
			
			const current = this.model.randomInteger(0, 1);
			this.renderRandomValue(current);

			if(predicted == current) {
				predicted_matched++;
			}

			balancer.addItem(current);

			i++;
		}

		this.renderPredicted(predicted_matched);
	}

	renderRandomValue(val, container_selector = '.js-result') {
		const class_name = val ? 'item red' : 'item blue';
		const item = $('<div>', {'class': class_name, html: val});
		$(this.el).find(container_selector).append(item);
	}

	renderPredicted(count) {
		const stat = this.getBalancer().getStat(this.model.options.repeat_num_random);
		const string = `${count}. Выпало 0: ${stat[0]}, 1: ${stat[1]}`;
		$(this.el).find('.js-predicted').html(string);
	}

	resetRandom() {
		$(this.el).find('.js-result').html('');
	}




	learnNostradamusPack() {
		for(let i = 0; i < 100; i++) {
			this.startNostradamus();
		}
	}

	startNostradamus() {
		if(!this.nostradamus) {
			this.nostradamus = new NostradamusModel();
			this.nostradamus.makeRandomSet(20);

			this.nostradamus.random_set.forEach(val => {
				this.renderRandomValue(val, '.js-nostradamus-result');
			});
		}
		
		this.random_value = this.nostradamus.randomInteger(0, 1);
		const fortune = this.nostradamus.checkFortune(this.random_value);
		this.renderRandomValue(this.random_value, '.js-nostradamus-result');
		$(this.el).find('.js-nostradamus-predicted').html(this.nostradamus.success_count + ' из ' + this.nostradamus.total_count);
	
		this.learnNostradamus();
	}

	learnNostradamus() {
		this.nostradamus.learn( [this.random_value] );
	}
}