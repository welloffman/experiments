<!DOCTYPE html>
<html lang="ru">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Experiments</title>

		<base href="/">

		<link rel="icon" type="image/png" href="/img/favicon-16x16.png" sizes="16x16">
		
		<link href="/css/build/build.css<? if(!$debug) { ?>?<?= filemtime( $root . '/web/css/build/build.css' ) ?><? } ?>" type="text/css" rel="stylesheet">
		
		<script type="text/javascript" src="/js/libs.min.js?<?= filemtime($root . '/web/js/libs.min.js') ?>"></script>

		<? if($debug) { ?>
			<script type="module" src="/js/index.js"></script>
		<? } else { ?>
			<script type="text/javascript" src="/js/all.min.js?<?= filemtime($root . '/web/js/all.min.js') ?>"></script>
		<? } ?>
	</head>

	<body><div class="main-wrapper js-main-wrapper"></div></body>

	<script>
		var config = <?= json_encode($config) ?>;
	</script>
</html>