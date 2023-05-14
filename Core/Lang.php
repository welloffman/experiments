<?

namespace Core;

class Lang {

	public function __construct($app) {
		$this->app = $app;
	}

	public function current() {
		if(!$this->hasLocales()) {
			return [];
		}

		$lang = 'ru'; // todo: реализовать ввыбор локали
		$json = file_get_contents($this->app->rootPath() . '/locale/' . $lang . '.json');
		return json_decode($json, true);
	}

	private function hasLocales() {
		return is_dir($this->app->rootPath() . '/locale');
	}
}