<?

$app->config = array_merge($app->config, [
	'debug' => true,
	'mysql' => [
		'host' => '127.0.0.1',
		'dbname' => 'experiments',
		'user' => 'superuser',
		'password' => 'superuser',
	]
]);