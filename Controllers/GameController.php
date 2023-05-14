<?

namespace Controllers;
use \Core\Controller;

class GameController extends Controller {
	public function fetchCeils() {
		$cells = $this->app->getCellWrapper()->find([]);

		if( !count($cells) ) {
			$cells = $this->app->getCellWrapper()->getAllCells();
		}

		$items = [];
		foreach($cells as $cell) {
			$items[] = $cell->getProperties();
		}

		$this->jsonResponse(['success' => true, 'items' => $items]);
	}
}