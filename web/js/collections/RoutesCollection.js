import AbstractCollection from '/js/collections/AbstractCollection.js';
import RouteModel from '/js/models/RouteModel.js';

export default class RoutesCollection extends AbstractCollection {
	getObject() {
		return new RouteModel(this.app);
	}

	getRoute(path) {
		const route = this.models.find(route => {
			return route.matchPath(path);
		});

		return route;
	}

	setCurrent(route) {
		this.models.forEach(item => {
			item.is_current = false;
		});
		route.is_current = true;
	}
}