import AbstractView from '/js/views/AbstractView.js';

export default class IndexView extends AbstractView {
	constructor(options = {}) {
		super(options);
		this.template = 'index_view';
		this.class_name = 'index-view main-content';

		this.projects = [
			{title: 'Вероятность', url: '/projects/probability'},
			{title: 'Числительные', url: '/projects/numerals'},
			{title: 'Vue', url: '/projects/vue', is_native: true},
			{title: 'it-gramota', url: '/projects/it-gramota'},
			{title: 'code-bot', url: '/projects/code-bot'},
			{title: 'expressions', url: '/projects/expressions'},
			{title: 'interview', url: '/projects/interview'},
			{title: 'game', url: '/projects/game'},
			{title: 'game 2', url: '/projects/game2'},
			{title: 'В столбик', url: '/projects/columnar-calculations'},
			{title: 'Поисковик', url: '/projects/searcher'},
			{title: 'Упаковщик', url: '/projects/packer'},
			{title: 'Нейросеть', url: '/projects/net'},
			{title: 'Симуляция', url: '/projects/simulation'},
			{title: 'Шифровальщик Bing', url: '/projects/word-chipher'}
			// {title: 'form-builder-widget', url: '/projects/form-builder-widget'}
		];
	}

	templateContext() {
		return {
			projects: this.projects
		};
	}
}