<div class="content-wrapper">
	<div class="options">
		<div class="title1 mb-2">Настройки</div>

		<div class="options-wrapper">
			<div class="row mb-2">
				<div class="title2 mr-2">Число повторений</div>
				<input type="number" class="light-input large js-field" data-type="repeat_num" value="<%- options.repeat_num %>">
			</div>
		</div>

		<div class="controls mt-5">
			<input type="button" class="btn-smoth js-start-count" value="Пуск">
			<input type="button" class="btn-smoth danger js-reset" value="Сброс">
		</div>
	</div>

	<div class="result">
		<div class="title1 mb-2">Результат</div>
		<div class="row mb-2">
			<div class="title2 mr-2">Общее число попыток</div>
			<input type="number" class="light-input large" disabled="disabled" value="<%- result.total_try %>">
		</div>

		<div class="row mb-2">
			<div class="title2 mr-2">Равновесие (ед. | коэф.)</div>
			<input type="number" class="light-input large half" disabled="disabled" value="<%- result.equilibrium %>">
			<input type="number" class="light-input large half" disabled="disabled" value="<%- result.equilibrium_ratio %>">
		</div>

		<div class="row mb-2">
			<div class="title2 mr-2">Максимальное отклонение (ед. | коэф.)</div>
			<input type="number" class="light-input large half" disabled="disabled" value="<%- result.max_diff %>">
			<input type="number" class="light-input large half" disabled="disabled" value="<%- result.max_diff_ratio %>">
		</div>

		<div class="row mb-2">
			<div class="title2 mr-2">Золотой коэффициент (коэф. | кол-во)</div>
			<input type="number" class="light-input half large" disabled="disabled" value="<%- gold_ratio.ratio %>">
			<input type="number" class="light-input half large" disabled="disabled" value="<%- gold_ratio.count %>">
		</div>

		<div class="row mb-2">
			<div class="title2 mr-2">Динамика (стабильность | изменение)</div>
			<input type="number" class="light-input half large" disabled="disabled" value="<%- result.stability %>">
			<input type="number" class="light-input half large" disabled="disabled" value="<%- result.changes %>">
		</div>
	</div>
</div>

<div class="options">
	<div class="title1 mb-2">Генератор</div>

	<div class="options-wrapper">
		<div class="row mb-2">
			<div class="title2 mr-2">Число повторений</div>
			<input type="number" class="light-input large js-field" data-type="repeat_num_random" value="<%- options.repeat_num_random %>">
		</div>
	</div>

	<div class="controls mt-5">
		<input type="button" class="btn-smoth js-start-random" value="Пуск">
		<input type="button" class="btn-smoth danger js-reset-random" value="Очистить">
	</div>
</div>

<div>
	<span>Угадано:</span>
	<span class="js-predicted"></span>
</div>

<div class="js-result random-result"></div>



<div>
	<div class="options">
		<div class="title1 mb-2">Нострадамус</div>

		<div class="controls mt-5">
			<input type="button" class="btn-smoth js-start-nostradamus" value="Угадать">
			<input type="button" class="btn-smoth js-start-nostradamus-pack" value="Угадать 100">
			<input type="button" class="btn-smoth js-learn-nostradamus" value="Обучить">
		</div>
	</div>

	<div>
		<span>Угадано:</span>
		<span class="js-nostradamus-predicted"></span>
	</div>

	<div class="js-nostradamus-result random-result"></div>
</div>