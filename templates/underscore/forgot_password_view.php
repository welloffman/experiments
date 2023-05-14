<h2 class="row">Восстановление пароля</h2>

<div class="row js-first-step">
	<div class="row mt-3">
		<input type="text" class="light-input large js-email" value="<%- email %>" placeholder="E-mail">
	</div>

	<% if(error) { %>
		<div class="error"><%- error %></div>
	<% } %>

	<div class="row mt-3">
		<input type="button" class="btn large js-submit" value="Получить ссылку">
	</div>
</div>

<div class="row js-finish hidden">
	<div class="row mt-3">
		<p>Ссылка для восстановления пароля отправлена на указанный вами адрес электронной почты.</p>
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