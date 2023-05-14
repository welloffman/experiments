<h2 class="row mb-3">Регистрация</h2>

<div class="js-first-step">
	<% _.each(field_list, function(item) { %>
		<div class="row">
			<input type="<%- item.input_type %>" class="light-input large js-field <% if(errors[item.type]) { %>alert<% } %>" data-type="<%- item.type %>" value="<%- field[item.type] %>" placeholder="<%- item.placeholder %>">
			<% if(errors[item.type]) { %>
				<div class="error"><%- errors[item.type] %></div>
			<% } %>
		</div>
	<% }) %>

	<div class="row mt-3">
		<input type="button" class="btn large js-registration" value="Зарегистрироваться">
	</div>
	<div class="row">
		<div class="forgot-wrapper m-left">
			<a class="gray js-route" href="/forgot-password">Забыли пароль?</a>
			<a class="gray js-route" href="/login">Авторизация</a>
		</div>
	</div>
</div>

<div class="js-finish hidden">
	<div class="mt-5 mb-5">
		Поздравляем! Вы успешно зарегистрированы. На указанный вами адрес электронной почты отправлено присьмо со ссылкой для подтверждения регистрации.
	</div>

	<div>
		<a class="btn large" href="/">Готово!</a>
	</div>
</div>