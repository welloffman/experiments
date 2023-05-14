<!DOCTYPE html>
<html lang="ru">
	<head>
		<meta charset="UTF-8">
		<title>Experiments</title>

		<base href="/">

		<link rel="icon" type="image/png" href="/img/favicon-16x16.png" sizes="16x16">
		
		<link href="/css/build/build.css<? if(!$debug) { ?>?<?= filemtime( $root . '/web/css/build/build.css' ) ?><? } ?>" type="text/css" rel="stylesheet">
		
		<? foreach($js_files as $file) { ?>
			<script src="<?= $file ?><? if(!$debug) { ?>?<?= filemtime( $root . '/web' . $file ) ?><? } ?>"></script>
		<? } ?>
	</head>

	<body>
		<div class="main-wrapper" style="padding: 10px 200px;">
			
			<iframe id="form-builder-widget" src="http://form-builder.local/form-renderer/f0d088a5881d7f265390adb96068cb58/3/1/4" style="border: 0;" scrolling="no"></iframe><script src="http://form-builder.local/js/widgets/form-builder-widget.js" type="text/javascript"></script>

		</div>
	</body>

	<script>
		var config = <?= json_encode($config) ?>;

		window.addEventListener("message", listener, false);
		
		function listener(e) {
			const message = e.data;
			console.log(e.data);
			if(e.data.event == 'finish') {
				
			}
		}
	</script>
</html>