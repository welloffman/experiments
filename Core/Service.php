<?

namespace Core;

abstract class Service {
	public $app;

	public function __construct($app) {
		$this->app = $app;
	}

}