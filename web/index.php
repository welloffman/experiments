<?

require_once __DIR__ . '/../vendor/autoload.php';

session_start();

$app = new Core\Application();

require_once(__DIR__ . '/../config/config.php');
require_once(__DIR__ . '/../config/routes.php');

if($app->config['debug']) {
	$app->makeCssFromLess();
}

$app->run();