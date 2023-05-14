<h2 class="row">Восстановление пароля</h2>

<div class="row js-first-step">
	<div class="row mt-3">
		<input type="password" class="light-input large js-field" data-type="password" value="<%- password %>" placeholder="Введите новый пароль">
	</div>

	<div class="row mt-3">
		<input type="password" class="light-input large js-field" data-type="password2" value="<%- password2 %>" placeholder="Повторите новый пароль">
	</div>

	<% if(error) { %>
		<div class="error"><%- error %></div>
	<% } %>

	<div class="row mt-3">
		<input type="button" class="btn large js-submit" value="Сохранить пароль">
	</div>
</div>

<div class="row js-finish hidden">
	<div class="row mt-3">
		<p>Пароль успешно сохранен, теперь вы можете использовать его при авторизации.</p>
	</div>

	<div class="row mt-3">
		<a class="btn large" href="/">Готово</a>
	</div>
</div>

<div class="row">
	<div class="forgot-wrapper m-left">
		<a class="gray js-route" href="/login">Авторизация</a>
		<a class="gray js-route" href="/registration">Регистрация</a>
	</div>
</div>