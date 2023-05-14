import AbstractModel from '/js/models/AbstractModel.js';
import ShotCollection from '/js/collections/ShotCollection.js';
import NeuralNetCollection from '/js/collections/NeuralNetCollection.js';
import NeuralNet from '/js/models/NeuralNet.js';
import ShotModel from '/js/models/ShotModel.js';

export default class BotModel extends AbstractModel {
	id;
	type;
	x;
	y;
	width = 15;
	height = 15;
	color = 'orange';
	team;

	constructor(attributes = {}) {
		super(attributes);
		this.shots = new ShotCollection(this.app);
		this.nets = new NeuralNetCollection(this.app);
	}

	randomMove() {
		const rand = app.getRandomInt(1, 100);

		if(rand > 80) {
			// todo:
		} else if(rand > 70) {
			this.makeShot();
		} else {
			const v = this.getRandomVector();
			this.x += v.x;
			this.y += v.y;
		}
	}

	getRandomVector() {
		const v = {x: 0, y: 0};
		const direction = app.getRandomInt(1, 100);
		if(direction > 75) {
			v.x = 1;
		} else if(direction > 50) {
			v.x = -1;
		} else if(direction > 25) {
			v.y = 1;
		} else {
			v.y = -1;
		}

		if(v.x == -1 && this.x == 0) {
			v.x = 1;
		}

		if(v.y == -1 && this.y == 0) {
			v.y = 1;
		}

		return v;
	}

	makeShot() {
		const shot = new ShotModel(this.app);
		const d = this.team == 1 ? 1 : -1;
		shot.setProperties({
			direction: d,
			x: this.x + ( Math.ceil(this.width / 2) * d ),
			y: this.y + Math.floor(this.height / 2),
		});

		this.shots.addItem(shot);
	}

	updateShots() {
		this.shots.models.forEach((shot, i) => {
			shot.fly();
			if(shot.outOfRange()) {
				this.shots.models.splice(i, 1);
			}
		});
	}

	getNet(type, input_size, output_size, hidden_size) {
		let net = this.nets.getByType(type);

		if(!net) {
			net = new NeuralNet(this.app);
			net.setProperties({type: type})
			net.init(input_size, output_size, hidden_size);
			net.makeWeights();
			this.nets.models.push(net);
		}

		return net;
	}

	move(enemy_bot) {
		const v = this.getMoveVector(enemy_bot);
		this.x += v.x;
		this.y += v.y;
	}

	getMoveVector(enemy_bot) {
		let input = [1, 0]; // equals
		if(this.y < enemy_bot.y) {
			input = [1, 1]; // downer
		} else if(this.y > enemy_bot.y) {
			input = [0, 0]; // upper
		}

		const net = this.getNet('direction', 2, 2, 5);
		net.o.input = input;
		net.calculate();
		const output = net.getOutput();

		const a = Math.round(output[0]);
		const b = Math.round(output[1]);
		let v = {x: 0, y: 0};
		if(a == 1 && b == 1) {
			v.y = 1;
		} else if(a == 0 && b == 0) {
			v.y = -1;
		}

		if(v.y == -1 && this.y == 0) {
			v.y = 0;
		}
// console.log(v);
		return v;
	}
}