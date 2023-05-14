import AbstractView from '/js/views/AbstractView.js';
import WordCipher from '/js/Services/WordCipher.js';

export default class WordChipherView extends AbstractView {
	constructor(options = {}) {
		super(options);
		this.template = 'word_chipher_view';
		this.class_name = 'word-chipher-view';
		this.wordCipher = new WordCipher(this.app);

		this.encryptString1 = '';
		this.encryptString2 = '';
		this.decryptString1 = '';
		this.decryptString2 = '';
	}

	templateContext() {
		return {
			encryptString1: this.encryptString1,
			encryptString2: this.encryptString2,
			decryptString1: this.decryptString1,
			decryptString2: this.decryptString2
		};
	}

	getEvents() {
		return [
			['change', '.js-encript-block .js-original-message', 'changeEncryptString'],
			['change', '.js-decrypt-block .js-encrypted-message', 'changeDecryptString'],
			['click', '.js-encrypt', 'encrypt'],
			['click', '.js-decrypt', 'decrypt']
		];
	}

	onRender() {
		
	}

	changeEncryptString(e) {
		this.encryptString1 = e.currentTarget.value;
	}

	changeDecryptString(e) {
		this.decryptString2 = e.currentTarget.value;
	}

	encrypt(e) {
		this.decryptString1 = this.wordCipher.encrypt(this.encryptString1);
		this.render();
	}

	decrypt(e) {
		this.encryptString2 = this.wordCipher.decrypt(this.decryptString2);
		this.render();
	}
}