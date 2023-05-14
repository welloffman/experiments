import AbstractModel from '/js/models/AbstractModel.js';

export default class RouteModel extends AbstractModel {
	constructor(attributes = {}) {
		super(attributes);
		this.mask = null;
		this.action = null;
		this.is_current = false;
	}

	matchPath(path) {
		const path_parts = path.split('/');
		const mask_parts = this.mask.split('/');
		
		if(path_parts.length != mask_parts.length) {
			return false;
		}
		
		for(let i in path_parts) {
			const p = path_parts[i];
			const m = mask_parts[i];

			if(m.charAt(0) == ':') {
				continue;
			}

			if(m !== p) {
				return false;
			}
		}

		return true;
	}

	getRouteAttributes(path) {
		const attributes = [];
		const path_parts = path.split('/');
		const mask_parts = this.mask.split('/');

		for(let i in mask_parts) {
			const p = path_parts[i];
			const m = mask_parts[i];

			if(m.charAt(0) == ':') {
				attributes.push(p);
			}
		}

		return attributes;
	}

	getAttribute(val_name, path = null) {
		if(!path) {
			path = window.location.pathname;
		}

		const path_parts = path.split('/');
		const mask_parts = this.mask.split('/');

		for(let i in mask_parts) {
			const p = path_parts[i];
			const m = mask_parts[i];

			if(m == `:${val_name}`) {
				return p;
			}
		}

		return null;
	}
}