<?

namespace Core;

class Application {
	public $baseUrl;
	public $protocol;
	public $routes;
	public $path;
	public $config;
	public $objectCache = [];
	public $routeKey;

	public function __construct() {
		$this->protocol = stripos($_SERVER['SERVER_PROTOCOL'], 'https') === true ? 'https://' : 'http://';
		$this->baseUrl = $_SERVER['SERVER_NAME'];
		$this->path = strtok($_SERVER["REQUEST_URI"],'?');
	}

	public function __call($name, $arguments) {
		$class_name = preg_replace("/^get/", '', $name);

		$variants = [
			"\\Wrappers\\$class_name",
			"\\Models\\$class_name",
			"\\Core\\$class_name"
		];

		foreach($variants as $class_name) {
			if(class_exists($class_name)) {
				return $this->getFromCache($class_name);
			}
		}

		trigger_error('Call to undefined method ' . __CLASS__ . '::' . $name . '()', E_USER_ERROR);
	}

	public function run() {
		$route_found = false;
		
		if(isset($this->routes[$this->path])) {
			$route_found = true;
			@list($class, $method) = explode(':', $this->routes[$this->path]);
			$this->routeKey = $this->path;
		} else {
			foreach($this->routes as $key => $value) {
				if($this->matchRoute($key)) {
					$route_found = true;
					@list($class, $method) = explode(':', $value);
					$this->routeKey = $key;
				}
			}
		}

		if($route_found) {
			$controller = new $class($this);
			$controller->$method();
			return true;
		}

		$controller = new \Controllers\MainController($this);
		$controller->pageNotFoundAction();
		return false;
	}

	public function redirect($path) {
		header('Location: //' . $this->baseUrl . $path);
		exit;
	}

	public function request($name) {
		$json = file_get_contents('php://input');
		$data = json_decode($json, true);
		return $data[$name] ?? null;
	}

	public function post($name) {
		return $_POST[$name] ?? null;
	}

	public function get($name) {
		return $_GET[$name] ?? null;
	}

	public function cookie($name) {
		return $_COOKIE[$name] ?? null;
	}

	public function setCookie($name, $value) {
		$_COOKIE[$name] = $value;
	}

	public function session($name) {
		return @$_SESSION[$name];
	}

	public function setSession($name, $value) {
		$_SESSION[$name] = $value;
	}

	public function getJsonRequest() {
		return json_decode(file_get_contents('php://input'), true);
	}

	public function getPathRequest($name) {
		$pathParts = explode('/', $this->path);
		$keyParts = explode('/', $this->routeKey);

		foreach($keyParts as $i => $item) {
			if($item == '<' . $name . '>') {
				return $pathParts[$i];
			}
		}

		return null;
	}

	public function isAuth() {
		$user = $this->getCurrentUser();
		return $user->get('role') && $user->get('role') != 'guest';
	}

	private function matchRoute($pathTemplate) {
		$templateParts = explode('/', $pathTemplate);
		$pathParts = explode('/', $this->path);

		if(count($templateParts) != count($pathParts)) {
			return false;
		}

		foreach(array_keys($templateParts) as $i) {
			if(substr($templateParts[$i], 0, 1) == '<' && substr($templateParts[$i], -1) == '>') {
				continue;
			}

			if($templateParts[$i] != $pathParts[$i]) {
				return false;
			}
		}

		return true;
	}

	private function getFromCache($class_name) {
		if(!isset($this->objectCache[$class_name])) {
			$this->objectCache[$class_name] = new $class_name($this);
		}

		return $this->objectCache[$class_name];
	}

	public function rootPath() {
		return preg_replace('/\/Core$/', '', __DIR__);
	}

	public function getCurrentUser() {
		if(!isset($this->objectCache['currentUser'])) {
			$this->objectCache['currentUser'] = $this->getUserWrapper()->getCurrentUser();
		}

		return $this->objectCache['currentUser'];
	}

	public function getLogger() {
		if(!isset($this->objectCache['monolog'])) {
			$this->checkLogFile();
			$log = new \Monolog\Logger('name');
			$log->pushHandler(new \Monolog\Handler\StreamHandler($this->rootPath() . $this->config['log_path'], \Monolog\Logger::WARNING));
			$this->objectCache['monolog'] = $log;
		}

		return $this->objectCache['monolog'];
	}

	public function t($key) {
		$t = $this->getLang()->current();
		return isset($t[$key]) ? $t[$key] : '';
	}

	public function checkLogFile() {
		$logFile = $this->rootPath() . $this->config['log_path'];
		if( is_file($logFile) && filesize($logFile) > 10485760) { // 10 мегабайт
			$oldLogFile = $logFile . '1';
			if(is_file($oldLogFile)) {
				unlink($oldLogFile);
			}
			rename($logFile, $oldLogFile);
		}
	}

	public function log($id, $message) {
		$string = $id . ': ' . print_r($message, true);
		$this->getLogger()->warning($string);
	}

	public function getJsFiles($full_path = false) {
		$paths = [
			'models',
			'collections',
			'views',
			'router',
		];

		$full_prefix = $this->rootPath() . '/web/js/';
		$prefix = $full_path ? $full_prefix : '/js/';

		$files = [];
		foreach($paths as $path) {
			$files_list = array_diff( scandir($full_prefix . $path), ['.', '..'] );
			foreach($files_list as $file) {
				$files[] = $prefix . $path . '/' . $file;
			}
		}
		$files[] = $prefix . 'index.js';

		return $files;
	}

	public function makeCssFromLess() {
		$less = $this->getLess();
		$less->buildCss();
	}
}