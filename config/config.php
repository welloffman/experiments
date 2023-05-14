<?

$app->config = [
	'debug' => false,
	'log_path' => '/logs/app.log',
	'js_files_prod' => ['/js/libs.min.js', '/js/all.min.js'],
	'mysql' => [
		'host' => '127.0.0.1',
		'dbname' => 'experiments',
		'user' => 'superuser',
		'password' => 'superuser',
	],
	'server_timezone' => 'Europe/Moscow',
	'no_reply_address' => 'wellofman@gmail.com',
	'site_info_address' => 'wellofman@gmail.com',
	'themes' => [
		['id' => 1, 'title' => 'PHP'],
		['id' => 2, 'title' => 'Паттерны'],
		['id' => 3, 'title' => 'Принципы'],
		['id' => 4, 'title' => 'MySql'],
		['id' => 5, 'title' => 'Javascript'],
		['id' => 6, 'title' => 'Уязвимости'],
		['id' => 7, 'title' => 'Laravel'],
		['id' => 8, 'title' => 'Опыт работы'],
	],
];

$extConfig = __DIR__ . '/config_ext.php';
if(is_file($extConfig)) {
	require_once($extConfig);
}
