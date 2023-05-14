import AbstractRouter from '/js/router/AbstractRouter.js';

import PropabilityModel from '/js/models/PropabilityModel.js';
import NeuralNet from '/js/models/NeuralNet.js';
import CodeBotModel from '/js/models/CodeBotModel.js';
import BotModel from '/js/models/BotModel.js';

import ThemesCollection from '/js/collections/ThemesCollection.js';
import QuestionsCollection from '/js/collections/QuestionsCollection.js';
import MapCeilCollection from '/js/collections/MapCeilCollection.js';

import IndexView from '/js/views/IndexView.js';
import ItGramotaView from '/js/views/ItGramotaView.js';

import ProbabilityView from '/js/views/ProbabilityView.js';
import ExpressionsView from '/js/views/ExpressionsView.js';
import FormBuilderView from '/js/views/FormBuilderView.js';
import InterviewView from '/js/views/InterviewView.js';
import GameMapView from '/js/views/GameMapView.js';
import Game2View from '/js/views/Game2View.js';
import NumeralsView from '/js/views/NumeralsView.js';
import CodeBootView from '/js/views/CodeBootView.js';
import ColumnarCalculationsView from '/js/views/ColumnarCalculationsView.js';
import SearcherView from '/js/views/SearcherView.js';
import PackerView from '/js/views/PackerView.js';
import NetView from '/js/views/NetView.js';
import SimulationView from '/js/views/SimulationView.js';
import WordChipherView from '/js/views/WordChipherView.js';

export default class Application extends AbstractRouter {
	constructor() {
		super();
		this.routes_map = [
			{mask: '/', action: 'index'},
			{mask: '/projects/probability', action: 'probability'},
			{mask: '/projects/numerals', action: 'numerals'},
			{mask: '/projects/it-gramota', action: 'itGramota'},
			{mask: '/projects/code-bot', action: 'codeBot'},
			{mask: '/projects/expressions', action: 'expressions'},
			{mask: '/projects/interview', action: 'interview'},
			{mask: '/projects/game', action: 'game'},
			{mask: '/projects/game2', action: 'game2'},
			{mask: '/projects/columnar-calculations', action: 'columnarCalculations'},
			{mask: '/projects/searcher', action: 'searcher'},
			{mask: '/projects/packer', action: 'packer'},
			{mask: '/projects/net', action: 'net'},
			{mask: '/projects/simulation', action: 'simulation'},
			{mask: '/projects/word-chipher', action: 'wordChipher'}

			// {mask: '/projects/form-builder-widget', action: 'formBuilderWidget'},
		];
	}

	index() {
		this.renderPage(new IndexView({app: this}));
	}

	probability() {
		const propability_model = new PropabilityModel(this);
		this.renderPage(new ProbabilityView({app: this, model: propability_model}));
	}

	numerals() {
		const neural_net = new NeuralNet(this);
		this.renderPage(new NumeralsView({app: this, net: neural_net, number: 10}));
	}

	itGramota() {
		const it_gramota_view = new ItGramotaView({app: this});
		this.renderPage(it_gramota_view);
	}

	codeBot() {
		const code_bot = new CodeBotModel(this);
		const code_bot_view = new CodeBootView({app: this, code_bot: code_bot});
		this.renderPage(code_bot_view);
	}

	expressions() {
		const expressions_view = new ExpressionsView({app: this});
		this.renderPage(expressions_view);
	}

	formBuilderWidget() {
		const form_builder_view = new FormBuilderView({app: this});
		this.renderPage(form_builder_view);
	}

	async interview() {
		const themes_collection = new ThemesCollection(this, Application.config.themes);
		const questions_collection = new QuestionsCollection(this);
		try {
			await questions_collection.fetchAll();
			const interview_view = new InterviewView({
				app: this,
				themes_collection: themes_collection,
				questions_collection: questions_collection
			});
			this.renderPage(interview_view);
		} catch(res) {
			this.showError(res);
		}
	}

	async game() {
		const collection = new MapCeilCollection(this);
		try {
			await collection.fetchItems();
			const game_map_view = new GameMapView({app: this, collection: collection});
			this.renderPage(game_map_view);
		} catch(res) {
			this.showError(res.message);
		}
	}

	game2() {
		const bot1 = new BotModel(this);
		bot1.setProperties({x: 0, y: 250, color: 'blue', team: 1});
		const bot2 = new BotModel(this);
		bot2.setProperties({x: 500, y: 300, color: 'red', team: 2});
		const game2_view = new Game2View({app: this, bot1: bot1, bot2: bot2});
		this.renderPage(game2_view);
	}

	columnarCalculations() {
		const columnar_calculations_view = new ColumnarCalculationsView({app: this});
		this.renderPage(columnar_calculations_view);
	}

	searcher() {
		const searcher_view = new SearcherView({app: this});
		this.renderPage(searcher_view);
	}

	packer() {
		const packer_view = new PackerView({app: this});
		this.renderPage(packer_view);
	}

	net() {
		const netView = new NetView({app: this});
		this.renderPage(netView);
	}

	simulation() {
		const view = new SimulationView({app: this});
		this.renderPage(view);
	}

	wordChipher() {
		const view = new WordChipherView({app: this});
		this.renderPage(view);
	}
}