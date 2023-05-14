<?

namespace Models;

use \Core\Model;

class Site extends Model {

	public $id;
	public $created;
	public $updated;
	public $url;
	public $title;
	public $description;
	public $keywords;

	public function getWrapper() {
		return $this->app->getSiteWrapper();
	}

	public function save() {
		if(!$this->id) {
			$this->created = date('Y-m-d H:i:s');
		}

		$this->updated = date('Y-m-d H:i:s');
		parent::save();
	}
}