<?

namespace Core;

class Controller {
	public $app;

	public function __construct($app) {
		$this->app = $app;
	}

	public function indexAction() {
		$user = $this->app->getCurrentUser();
		$template_handler = new TemplateHandler($this->app);
		
		$config = [
			'server_timezone' => $this->app->config['server_timezone'],
			'base_url' => $this->app->protocol . $this->app->baseUrl,
			'templates' => $template_handler->getTemplates(),
			'user' => $user->getPublicData(),
			't' => $this->app->getLang()->current(),
			'themes' => $this->app->config['themes']
		];

		$this->render('layout/main.php', [
			'root' => $this->app->rootPath(),
			'debug' => $this->app->config['debug'],
			'config' => $config,
		]);
	}

	public function pageNotFoundAction() {
		$this->indexAction();
		exit;
	}

	public function render($template, $attributes = []) {
		extract($attributes);
		require_once(__DIR__ . '/../templates/' . $template);
	}

	public function renderCustomTemplate($template, $attributes = []) {
		extract($attributes);
		ob_start();
		require(__DIR__ . '/../templates/' .  $template);
		return ob_get_clean();
	}

	public function jsonResponse($data) {
		header('Content-Type: application/json');
		echo json_encode($data);
		return true;
	}

	public function includeTemplate($path, $attributes = []) {
		extract($attributes);
		require(__DIR__ . '/../templates/' . $path);
	}

	public function isPost() {
		return $_SERVER['REQUEST_METHOD'] === 'POST';
	}

	public function noAccessResponse($message = '') {
		if($this->isPost()) {
			$data = ['success' => false, 'message' => $message];
			header('Content-Type: application/json');
			echo json_encode($data);
			exit;
		} else {
			$this->pageNotFoundAction();
		}
	}

	public function noAccessHandler() {
		if($this->isPost()) {
			$this->jsonResponse(['success' => false, 'message' => 'Insufficient access rights']);
			exit;
		}

		$this->app->redirect('/');
	}
}