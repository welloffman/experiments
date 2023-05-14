import AbstractModel from '/js/models/AbstractModel.js';

export default class ThemeModel extends AbstractModel {
	id;
	title;
	
	constructor(attributes = {}) {
		super(attributes);
	}
}