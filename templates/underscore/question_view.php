<% if(mode == 'edit') { %>
	<div class="m-flex mt-2">
		<div class="m-flex-grow">
			<textarea class="light-input js-field m-block" placeholder="Вопрос" rows="2" data-type="question"><%- model.question %></textarea>
			<textarea class="light-input js-field m-block mt-2" placeholder="Ответ" rows="3" data-type="answer"><%- model.answer %></textarea>
		</div>

		<div class="ml-2">
			<div class="js-theme mb-2">
				<div class="title1 mb-1">Тема</div>
				<select class="light-input js-field" data-type="theme_id">
					<% _.each(themes.models, function(theme) { %>
						<option value="<%- theme.id %>" <% if(theme.id == model.theme_id) { %>selected<% } %>><%- theme.title %></option>
					<% }) %>
				</select>
			</div>

			<div>
				<input type="button" class="btn js-save" value="Сохранить">
				<input type="button" class="btn btn-red js-cancel" value="Отмена">
			</div>
		</div>
	</div>
<% } else { %>
	<div class="mode-show mt-1">
		<div class="m-flex">
			<pre class="m-flex-grow"><%- model.question %></pre>
			<div class="m-flex buttons">
				<div class="js-delete delete m-pointer mr-2" title="Удалить">&#10005;</div>
				<div class="js-toggle-edit edit m-pointer mr-2" title="Изменить">&#9998;</div>
				<div class="js-toggle toggle m-pointer"></div>
			</div>
		</div>
		<div class="hidden js-answer answer"><pre><%- model.answer %></pre></div>
	</div>
<% } %>