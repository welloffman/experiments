<?

namespace Core;

class MailTemplate {
	public $app;

	public function __construct($app) {
		$this->app = $app;
	}

	public function makeMessage($template, $attributes) {
		extract($attributes);
		ob_start();
		require(__DIR__ . '/../templates/mail/' .  $template . '.php');
		$raw_string = ob_get_clean();
		return $this->prepareTemplate($raw_string);
	}

	private function prepareTemplate($raw_string) {
		$search = ["\n"];
		$replace = ["<br>"];
		return str_replace($search, $replace, $raw_string);
	}
}