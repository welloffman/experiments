<?

namespace Core;

class Less {
	const LESS_NAME = 'less.less';
	const LESS_PATH = '/resources/less';
	const CSS_NAME = 'build.css';

	public function __construct($app) {
		$this->app = $app;
	}

	public function buildCss() {
		if(!$this->lessIsUpdated()) {
			return false;
		}

		$this->makeLessFile();
		$command = 'lessc ' . $this->getSourcePath() . self::LESS_NAME . ' > ' . $this->getDestPath() . self::CSS_NAME;
		exec($command);
	}

	private function getSourcePath() {
		return $this->app->rootPath() . self::LESS_PATH . '/';
	}

	private function getDestPath() {
		return $this->app->rootPath() . '/web/css/build/';
	}

	private function lessIsUpdated() {
		$source_path = $this->getSourcePath();
		$dest_path = $this->getDestPath();

		$less_update_time = 0;
		foreach(scandir($source_path) as $less) {
			if( in_array($less, [self::LESS_NAME, '.', '..']) ) {
				continue;
			}

			$filetime = filemtime( $source_path . $less );
			if($filetime > $less_update_time) {
				$less_update_time = $filetime;
			}
		}

		if( !is_file($dest_path . self::CSS_NAME) ) {
			$css_update_time = -1;
		} else {
			$css_update_time = filemtime($dest_path . self::CSS_NAME);
		}

		return $less_update_time > $css_update_time;
	}

	private function makeLessFile() {
		$less_content = [];

		$source_path = $this->getSourcePath();
		foreach(scandir($source_path) as $less) {
			if( in_array($less, [self::LESS_NAME, '.', '..']) ) {
				continue;
			}
			
			$less_content[] = "@import '$less';";
		}

		file_put_contents($source_path . self::LESS_NAME, implode("\n", $less_content));
	}
}