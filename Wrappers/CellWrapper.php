<?

namespace Wrappers;

use Models\Cell;

class CellWrapper extends MysqlWrapper {
	const ERR_MSG = [
		// 'empty_question' => 'Введите текст вопроса',
		// 'empty_answer' => 'Введите текст ответа',
		// 'empty_theme' => 'Укажите тему',
		// 'not_found' => 'Вопрос не найден'
	];

	public function getName() {
		return 'cell';
	}

	public function getObject() {
		return new Cell($this->app);
	}

	public function getAllCells() {
		$this->clearCells();
		$cells = $this->generateCells();
		return $cells;
	}

	public function generateCells() {
		$size = 25;

		$cell_list = $this->generateCellTypesList($size);
		$cells = [];
		for($y = 1; $y <= $size; $y++) {
			for($x = 1; $x <= $size; $x++) {
				$cell = $this->getObject();
				$cell->setProperties(['type' => array_shift($cell_list), 'x' => $x, 'y' => $y]);
				$cell->save();
				$cells[] = $cell;
			}
		}

		return $cells;
	}

	public function clearCells() {
		$sql = "truncate table cell";
		$this->customQuery($sql, []);
	}

	public function generateCellTypesList($size) {
		$cell_types = [
			'grass', 'forest', 'sand', 'water', 'steppe'
		];

		$list = [];
		$max = $size * $size;
		for($i = 0; $i < $max; $i++) {
			$cell_index = rand(0, count($cell_types) - 1);
			$list[] = $cell_types[$cell_index];
		}

		return $list;
	}
}