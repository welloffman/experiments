import AbstractView from '/js/views/AbstractView.js';
import NetTeacherModel from '/js/models/NetTeacherModel.js';
import NetSampleGenerator from '/js/views/NetSampleGenerator.js';

export default class NetView extends AbstractView {
	constructor(options = {}) {
		super(options);
		this.template = 'net_view';
		this.class_name = 'net-view main-content';
	}

	templateContext() {
		return {
		};
	}

	getEvents() {
		return [
			['click', '.js-generate', 'generate'],
			['click', '.js-get-data', 'getData']
		];
	}

	onRender() {
	}

	getSampleGenerator() {
		if(!this.sampleGenerator) {
			this.sampleGenerator = new NetSampleGenerator({app: this.app});
		}
		return this.sampleGenerator;
	}


	renderSampleGenerator() {
		const generator = this.getSampleGenerator();
		generator.remove();
		this.renderChild(generator, '.generator-wrapper');
	}

	generate() {
		this.updateGeneratorParams();
		this.renderSampleGenerator();
	}

	updateGeneratorParams() {
		const generator = this.getSampleGenerator();
		generator.size = this.app.getRandomInt(5, 100);
		generator.angle = this.app.getRandomInt(0, 90);
		// generator.angle = 45;
		generator.color = this.app.randomColor();
		generator.backgroundColor = this.app.randomColor();
		const offset = {};
		offset.x = this.app.getRandomInt(0, 150);
		offset.y = this.app.getRandomInt(0, 150);
		generator.offset = offset;
	}

	getData() {
		const generator = this.getSampleGenerator();
		const data = generator.getData();
		console.log(data);
	}
}