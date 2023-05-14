<div class="controls">
	<div class="m-flex-grow">
		<select class="light-input mr-2 js-theme">
			<% _.each(themes.models, function(theme) { %>
				<option value="<%- theme.id %>" <% if(theme_id == theme.id) { %>selected<% } %>><%- theme.title %></option>
			<% }) %>
		</select>

		<input class="light-input large js-filter" type="text" value="<%- filter %>" placeholder="Фильтр">
	</div>

	<div>
		<input class="btn js-create" type="button" value="+ Создать">
	</div>
</div>

<div class="m-flex-grow">
	<div class="list js-new-wrapper"></div>
	<div class="list js-list-wrapper"></div>
</div>