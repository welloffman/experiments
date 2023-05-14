<?

require_once __DIR__ . '/vendor/autoload.php';
$app = new Core\ConsoleApplication();

require_once(__DIR__ . '/config/config.php');

$app->runAction($argv);