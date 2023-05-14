<!DOCTYPE html>
<html lang="ru">
	<head>
		<meta charset="UTF-8">
		<title>Experiments</title>

		<base href="/">

		<link rel="icon" type="image/png" href="/img/favicon-16x16.png" sizes="16x16">
		
		<link href="/css/build/build.css<? if(!$debug) { ?>?<?= filemtime( $root . '/web/css/build/build.css' ) ?><? } ?>" type="text/css" rel="stylesheet">
		
		<link href="/js/libs/jquery-ui-1.11.3/jquery-ui.min.css" type="text/css" rel="stylesheet">
		<link href="/css/datepicker.min.css" type="text/css" rel="stylesheet">

		<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>

		<? foreach($js_files as $file) { ?>
			<script src="<?= $file ?><? if(!$debug) { ?>?<?= filemtime( $root . '/web' . $file ) ?><? } ?>"></script>
		<? } ?>
	</head>

	<body>
		<div class="main-wrapper">
			<div id="app">
				{{ message }}
			</div>
		</div>
		<script src="/js/index-vue.js"></script>
	</body>
</html>