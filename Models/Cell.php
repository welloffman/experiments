<?

namespace Models;

use \Core\Model;

class Cell extends Model {

	public $id;
	public $type;
	public $x;
	public $y;

	public function getWrapper() {
		return $this->app->getCellWrapper();
	}
}