import NeuroNet from '/js/models/NeuroNet.js';

export default class Brain {
	unit; // юнит, которому принадлежит мозг
	neuroNet; // нейросеть, которая определяет поведение юнита
	inputs; // массив входных данных для нейросети
	outputs; // массив выходных данных из нейросети
	actions; // массив возможных действий юнита

	constructor(unit) {
		this.unit = unit; // присваиваем мозгу юнита
		this.neuroNet = new NeuroNet(); // создаем новую нейросеть
		this.inputs = []; // инициализируем массив входных данных
		this.outputs = []; // инициализируем массив выходных данных
		this.actions = ['move', 'reproduce', 'stay']; // определяем возможные действия юнита
	}

	getInputs() {
		// получаем входные данные из среды
		this.inputs = [];
		this.inputs.push(this.unit.energy); // добавляем энергию юнита
		this.inputs.push(this.unit.tile.energy); // добавляем энергию клетки
		this.inputs.push(this.unit.tile.units.models.length); // добавляем количество юнитов на клетке
	}

	getOutputs() {
		// получаем выходные данные из нейросети
		this.outputs = this.neuroNet.calculate(this.inputs); // передаем входные данные в нейросеть и получаем выходные данные
	}

	getAction() {
		// получаем действие юнита на основе выходных данных
		let maxIndex = 0; // индекс максимального значения в массиве выходных данных
		let maxValue = 0; // максимальное значение в массиве выходных данных
		for (let i = 0; i < this.outputs.length; i++) { // перебираем массив выходных данных
			if (this.outputs[i] > maxValue) { // если текущее значение больше максимального
				maxIndex = i; // обновляем индекс максимального значения
				maxValue = this.outputs[i]; // обновляем максимальное значение
			}
		}
		return this.actions[maxIndex]; // возвращаем действие по индексу максимального значения
	}

	doAction(tiles) {
		// выполняем действие юнита в зависимости от его выбора
		let action = this.getAction(); // получаем действие юнита
		switch (action) { // проверяем действие по условию
			case 'move': // если действие - перемещение
				this.unit.findNewGoodTile(tiles); // вызываем метод юнита для поиска новой клетки
				break; // прерываем выполнение условия
			case 'reproduce': // если действие - размножение
				if (this.unit.isCanReproduce()) { // проверяем, может ли юнит размножаться
					let isReproduced = this.unit.tryReproduce(); // вызываем метод юнита для попытки размножения
					if (!isReproduced) { // если размножение не удалось
						this.unit.findPartner(tiles); // вызываем метод юнита для поиска партнера
					}
				}
				break; // прерываем выполнение условия
			case 'stay': // если действие - остаться на месте
				// ничего не делаем
				break; // прерываем выполнение условия
			default: // если действие не определено
				// ничего не делаем
				break; // прерываем выполнение условия
		}
	}

	learn(tiles) {
		// обучаем нейросеть юнита по методу обратного распространения ошибки
		let expectedOutputs = []; // массив ожидаемых выходных данных для нейросети
		let actualOutputs = this.outputs; // массив фактических выходных данных из нейросети
		let error = 0; // переменная для хранения ошибки нейросети

		if (this.unit.isDead()) { // если юнит умер
			expectedOutputs = [0, 0, 0]; // ожидаемые выходные данные - все нули (нет действий)
			error = this.neuroNet.calculateError(actualOutputs, expectedOutputs); // вычисляем ошибку нейросети по формуле
			this.neuroNet.backPropagate(error); // обратно распространяем ошибку по нейросети и корректируем веса связей
		} else { // если юнит жив
			if (this.unit.isCanReproduce()) { // если юнит может размножаться
				expectedOutputs = [0, 1, 0]; // ожидаемые выходные данные - единица во втором элементе (действие - размножение)
			} else if (this.unit.tile.energy < 0.5) { // если энергия клетки меньше 0.5
				expectedOutputs = [1, 0, 0]; // ожидаемые выходные данные - единица в первом элементе (действие - перемещение)
			} else { // в других случаях
				expectedOutputs = [0, 0, 1]; // ожидаемые выходные данные - единица в третьем элементе (действие - остаться на месте)
			}

			error = this.neuroNet.calculateError(actualOutputs, expectedOutputs); // вычисляем ошибку нейросети по формуле
			this.neuroNet.backPropagate(error); // обратно распространяем ошибку по нейросети и корректируем веса связей
		}
	}
}