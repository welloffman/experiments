import AbstractCollection from '/js/collections/AbstractCollection.js';
import ThemeModel from '/js/models/ThemeModel.js';

export default class ThemesCollection extends AbstractCollection {
	getObject() {
		return new ThemeModel(this.app);
	}
}