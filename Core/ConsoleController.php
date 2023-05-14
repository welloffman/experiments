<?

namespace Core;

use \Services\ScannerService;

class ConsoleController {
	public $app;

	public function __construct($app) {
		$this->app = $app;
	}

	public function deploy($comment = 'upd') {
		$this->concatJsLibs();
		$this->concatJsFiles();
		exec('git add .');
		exec("git commit -m '$comment'");
		exec("git push origin master");
	}

	public function concatJsLibs() {
		$target_file = $this->app->rootPath() . '/web/js/libs.min.js';
		$json_file = $this->app->rootPath() . '/config/js_libs.json';
		$time = @filemtime($target_file);
		$data_libs = file_get_contents($json_file);
		$libs = json_decode($data_libs, true);
		if($time > filemtime($json_file)) {
			$libs = array_map(function($lib) {
				return $this->app->rootPath() . '/web/' . $lib;
			}, $libs);

			exec('cat ' . implode(' ', $libs) . ' > ' . $target_file);
			echo "Библиотеки js собраны\n";
		}
	}

	public function concatJsFiles() {
		$time = @filemtime($this->app->rootPath() . '/web/js/all.min.js');
		foreach($this->app->getJsFiles(true) as $item) {
			if( $time < filemtime($item) ) {
				exec('npm run build');
				echo "Файлы js собраны\n";
				break;
			}
		}
	}

	public function renderCustomTemplate($template, $attributes = []) {
		extract($attributes);
		ob_start();
		require_once(__DIR__ . '/../templates/' .  $template);
		return ob_get_clean();
	}

	public function makeSprite() {
		$sprite = new SvgSprite($this->app);
		$sprite->make();
		echo "Sprite created!\n";
	}

	public function test() {
		$random = bin2hex( random_bytes(10) );
        $string = md5( uniqid($random, true) );
        
        echo $string . PHP_EOL;

        $parts = [
            substr($string, 0, 8),
            substr($string, 8, 4),
            substr($string, 12, 4),
            substr($string, 16, 4),
            substr($string, 20, 12)
        ];

		echo implode('-', $parts) . PHP_EOL;
	}

	public function startScan($url) {
		$links = [$url];

		$site_wrapper = $this->app->getSiteWrapper();
		$scanner = new ScannerService($this->app);
		while(count($links)) {
			$item = array_shift($links);
			$old_site = $site_wrapper->find(['url' => $item]);
			if($old_site) {
				continue;
			}

			$scanner->scan($item);

			$site = $site_wrapper->getObject();
			$site->setProperties([
				'url' => $item,
				'title' => $scanner->getTitle(),
				'description' => $scanner->getDescription(),
				'keywords' => $scanner->getKeywords(),
			]);
			$site->save();

			echo "Url: $item" . "\n";
			$l = $scanner->getExternalHosts();
			print_r($l);
			$links = array_merge($links, $l);
			echo "Links count: " . count($links) . "\n\n";
		}
	}
}