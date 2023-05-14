<?
namespace Core;

class SvgSprite {
	const FILES_PATH = '/resources/icons';
	const SPRITE_PATH = '/web/img/sprite.svg';

	private $items = [];

	public function __construct($app) {
		$this->app = $app;
	}

	public function make() {
		$files = scandir($this->app->rootPath() . self::FILES_PATH);
		foreach($files as $file) {
			if(in_array($file, ['.', '..'])) {
				continue;
			}

			$this->addItem($file);
			echo $file . "\n";
		}

		$this->saveFile($this->app->rootPath() . self::SPRITE_PATH);
	}

	private function addItem($file) {
		$orig_file = simplexml_load_file($this->app->rootPath() . self::FILES_PATH . '/' . $file);
		
		$id = explode('.', $file)[0];
		$view_box = $orig_file->attributes()['viewBox'];

		$item = '<symbol id="' . $id . '" viewBox="' . $view_box . '">' . 
				$this->makePath($orig_file) . '</symbol>';
		$this->items[] = $item;
	}

	private function saveFile($dest_file) {
		$content = implode("\n", $this->items);
		$string = '<svg xmlns="http://www.w3.org/2000/svg">' . "\n" . $content . "\n" . '</svg>';
		file_put_contents($dest_file, $string);
	}

	private function makePath($orig_file) {
		$path = $orig_file->path ? $orig_file->path : $orig_file->g->path;

		$g = '<g>';
		if($orig_file->g && $orig_file->g->attributes()['transform']) {
			$g = '<g transform="' . $orig_file->g->attributes()['transform'] . '">';
		}

		return $g . '<path d="' . $path->attributes()['d'] . '"/></g>';
	}
}