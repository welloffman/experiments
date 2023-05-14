<div class="wrapper">
	<div class="analizer">
		<textarea class="js-sample"><%- code %></textarea>
		<div class="controls mt-1">
			<input type="button" class="js-analize btn-smoth" value="Анализировать">
		</div>
	</div>

	<div>
		<div class="controls mb-5">
			<input type="button" class="js-make-string btn-smoth" value="Добавить строчку">
		</div>

		<div class="js-code-wrapper">
			<% _.each(strings, function(string) { %>
				<div><%- string %></div>
			<% }) %>
		</div>
	</div>

	<div class="ml-1">
		<div class="controls mb-3">
			<input type="button" class="js-make-code btn-smoth" value="Сгенерировать код">
		</div>

		<div>
			<input type="text" placeholder="Название функции" class="light-input js-head" value="<%- head %>">
		</div>
		<div>
			<input type="text" placeholder="Тестовые параметры" class="light-input js-params" value="<%- params %>">
		</div>
		<div>
			<input type="text" placeholder="Тестовый результат" class="light-input js-result" value="<%- result %>">
		</div>
		<div>
			<textarea class="js-sample-func light-input" placeholder="Тело функции" rows="10" disabled><%- func %></textarea>
		</div>
	</div>
</div>