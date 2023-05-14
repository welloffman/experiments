<?

namespace Core;

class TemplateHandler {
	public $app;

	public function __construct($app) {
		$this->app = $app;
	}

	public function getTemplates() {
		$templates = [];

		$templates_dir = $this->app->rootPath() . '/templates/underscore';
		if ($handle = opendir($templates_dir)) {
			while (false !== ($file_name = readdir($handle))) {
				if ($file_name != "." && $file_name != "..") {
					$name = str_replace('.php', '', $file_name);
					$templates[$name] = file_get_contents("$templates_dir/$file_name");
				}
			}
			closedir($handle);
		}

		return $templates;
	}
}