import RoutesCollection from '/js/collections/RoutesCollection.js';
import HeaderView from '/js/views/HeaderView.js';
import FooterView from '/js/views/FooterView.js';
import PreloaderView from '/js/views/PreloaderView.js';
import ModalConfirmView from '/js/views/ModalConfirmView.js';

export default class AbstractRouter {
	constructor() {
		this.routes = new RoutesCollection();
		this.wrapper = '.main-wrapper';
		this.routes_map = [];
	}

	static config = {};

	initRoutes() {
		this.routes.reset(this.routes_map);
		this.applyCurrentRoute();
		this.startListenRoutes();
	}

	startListenRoutes() {
		document.addEventListener('click', (e) => {
			for(let target = e.target; target && target != document; target = target.parentNode) {
				if(target.matches('.js-route')) {
					e.preventDefault();
					history.pushState(null, null, e.target.getAttribute('href'));
					this.applyCurrentRoute();
					break;
				}
			}
		}, false);

		window.onpopstate = (e) => {
			this.applyCurrentRoute();
		};
	}

	applyCurrentRoute() {
		const raw_path = window.location.pathname;
		const route = this.routes.getRoute(raw_path);
		if(route) {
			this.routes.setCurrent(route);
			this[ route.action ]( ...route.getRouteAttributes(raw_path) );
		} else {
			this.pageNotFound();
		}
	}

	navigate(url, apply = true) {
		history.pushState(null, null, url);

		if(apply) {
			this.applyCurrentRoute();
		}
	}

	renderHeader() {
		const headerView = new HeaderView({app: this});
		document.querySelector(this.wrapper).appendChild(headerView.render());
	}

	renderFooter() {
		const footerView = new FooterView({app: this});
		document.querySelector(this.wrapper).appendChild(footerView.render());
	}

	renderPage(mainView) {
		this.clear();
		this.renderHeader();
		if(mainView) {
			document.querySelector(this.wrapper).appendChild(mainView.render());
		} else {
			document.querySelector(this.wrapper).innerHTML = '<div class="main-content"></div>';
		}
		this.renderFooter();
	}

	clear() {
		const wrapper = document.querySelector(this.wrapper);
		while(wrapper.firstChild) {
			wrapper.removeChild(wrapper.firstChild);
		}
	}

	request(url, data, successCallback, errorCallback, type = 'POST') {
		const xhr = new XMLHttpRequest();
		xhr.open(type, url);
		xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
		xhr.send( JSON.stringify(data) );

		this.getPreloader().show();
		xhr.onload = () => {
			this.getPreloader().hide();
			if (xhr.status != 200) {
				if(errorCallback) {
					errorCallback({status: xhr.status, status_text: xhr.statusText, message: `Не удалось выполнить запрос: ${xhr.statusText}`});
				}
			} else {
				successCallback( JSON.parse(xhr.response) );
			}
		};

		xhr.onerror = () => {
			this.getPreloader().hide();
			errorCallback({message: 'Не удалось выполнить запрос'});
		};
	}

	showError(resp) {
		console.info(resp);
		const modal_view = new ModalConfirmView({
			app: this,
			title: 'Извините',
			text: resp.message || 'Произошла ошибка',
			type: 'info'
		});
		modal_view.show();
	}

	showMessage(text, title = 'Поздравляем!') {
		const modal_view = new ModalConfirmView({
			app: this,
			title: title,
			text: text,
			type: 'info'
		});
		modal_view.show();
	}

	getPreloader() {
		if(!this.preloader) {
			this.preloader = new PreloaderView({app: this, show_spinner: true});
		}

		return this.preloader;
	}

	getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	randomInteger(min, max) {
		let rand = min - 0.5 + Math.random() * (max - min + 1);
		return Math.round(rand);
	}

	randomColor() {
		return '#' + Math.floor(Math.random() * 16777215).toString(16);
	}

	getLocalDate(dateString) {
		let date = moment.tz(dateString, Application.config.server_timezone);
		date.tz( moment.tz.guess() );
		return date;
	}

	getServerDate(dateString, format) {
		let date = format ? moment(dateString, format) : moment(dateString);
		date.tz(Application.config.server_timezone);
		return date;
	}
}