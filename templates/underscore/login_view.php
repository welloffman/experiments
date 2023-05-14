<h2 class="row">Вход</h2>
<div class="row mt-3">
	<input type="text" class="light-input large js-email" value="<%- email %>" placeholder="E-mail">
</div>
<div class="row">
	<input type="password" class="light-input large js-password" value="<%- password %>" placeholder="Пароль">
</div>

<% if(error) { %>
	<div class="error"><%- error %></div>
<% } %>

<div class="row mt-3">
	<input type="button" class="btn large js-login" value="Войти">
</div>
<div class="row">
	<div class="forgot-wrapper m-left">
		<a class="gray js-route" href="/forgot-password">Забыли пароль?</a>
		<a class="gray js-route" href="/registration">Регистрация</a>
	</div>
</div>