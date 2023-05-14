import AbstractView from '/js/views/AbstractView.js';

export default class HeaderView extends AbstractView {
	constructor(options = {}) {
		super(options);
		this.template = 'header_view';
		this.class_name = 'header-view';

		this.menuItems = [
			// {
			// 	route: 'login',
			// 	active: [],
			// 	title: 'Вход', 
			// 	roles: ['guest'],
			// 	is_js_route: true
			// }
		];
	}

	templateContext() {
		return {
			getMenu: this.getMenu.bind(this),
			isActive: this.isActive.bind(this)
		};
	}

	getMenu() {
		return _.filter(this.menuItems, function(item) {
			return item.roles.indexOf( app.user.get('role') ) > -1;
		});
	}

	isActive(menuItem) {
		var routes = menuItem.active.concat([menuItem.route]);
		return routes.indexOf( app.current().route ) == -1 ? '' : 'selected';
	}
}