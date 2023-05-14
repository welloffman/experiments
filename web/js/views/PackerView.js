import AbstractView from '/js/views/AbstractView.js';

export default class PackerView extends AbstractView {
	constructor(options = {}) {
		super(options);
		this.template = 'packer_view';
		this.class_name = 'packer-view main-content';

		this.reader = new FileReader();
		this.file_byte_array = [];

		this.storage = '';
		this.makeStorage(10);
	}

	getEvents() {
		return [
			['change', '.js-file', 'changeFile'],
			['change', '.js-sample', 'changeSample']
		];
	}

	templateContext() {
		return {
			// projects: this.projects
		};
	}

	changeFile(e) {
		this.reader.readAsArrayBuffer(e.target.files[0]);
	
		this.reader.onloadend = (evt) => {
			if(evt.target.readyState === FileReader.DONE) {
				const arrayBuffer = evt.target.result;
				const array = new Uint8Array(arrayBuffer);

				for(const a of array) {
					const bin_str = a.toString(2);
					// const bin_arr = bin_str.split('');
					// this.file_byte_array = this.file_byte_array.concat(bin_arr);
					this.file_byte_array += bin_str;
				}
				console.log(this.file_byte_array)
			}
		}
	}

	changeSample(e) {
		const v = e.target.value;
		const pos = this.file_byte_array.indexOf(v);
		console.log(pos);
	}

	makeStorage(sample_length) {
		this.storage = '';
		const arr = new Array(sample_length).fill(1);
		const max = parseInt( arr.join(''), 2 );
		
		for(let i = 0; i <= max; i++) {
			const bin_str = i.toString(2).padStart(10, '0');
			
			if(this.storage.indexOf(bin_str) == -1) {
				this.storage += bin_str;
			}
		}

		console.log(this.storage.length);

		let cnt_repeats = 0;
		for(let i = 0; i <= max; i++) {
			const bin_str = i.toString(2).padStart(10, '0');
			
			if( this.storage.split(bin_str).length > 2) {
				cnt_repeats++;
				console.log(bin_str);
			}
		}

		console.log(cnt_repeats);
	}
}