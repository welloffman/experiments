<?

namespace Controllers;

class ConsoleController {
	public $app;

	public function __construct($app) {
		$this->app = $app;
	}

	public function deploy($comment = 'upd') {
		$time = @filemtime($this->app->rootPath() . '/web/js/libs.min.js');
		$data_libs = file_get_contents($this->app->rootPath() . '/config/js_libs.json');
		foreach(json_decode($data_libs, true) as $item) {
			if($time < filemtime( $this->app->rootPath() . '/web' . $item )) {
				exec('gulp gulp-concat-libs');
				echo "Библиотеки js собраны\n";
				break;
			}
		}

		$time = filemtime($this->app->rootPath() . '/web/js/all.min.js');
		foreach($this->app->getJsFiles(true) as $item) {
			if( $time < filemtime($item) ) {
				
				$files_json = $this->app->rootPath() . '/config/js_files.json';
				$json_content = json_encode($this->app->getJsFiles());
				file_put_contents($files_json, $json_content);
				
				exec('gulp gulp-concat-js');
				echo "Файлы js собраны\n";
				break;
			}
		}

		exec('git add .');
		exec("git commit -m $comment");
		exec("git push origin master");
	}

	public function renderCustomTemplate($template, $attributes = []) {
		extract($attributes);
		ob_start();
		require_once(__DIR__ . '/../templates/' .  $template);
		return ob_get_clean();
	}

	public function test() {
		$files = $this->app->getJsFiles(true);
		print_r($files);
	}
}