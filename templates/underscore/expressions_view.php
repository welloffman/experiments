<div class="wrapper">
	<div class="left">
		<input type="text" class="js-curretn light-input large mb-2">
		<input type="button" class="btn-smoth js-add-item" value="Добавить">
	</div>
	<div class="right js-items-wrapper">
		<% _.each(items, function(item) { %>
			<div class="e-item js-e-item" style="left: <%- item.left %>px; right: <%- item.right %>px" draggable="true"><%- item.value %></div>
		<% }) %>
	</div>
</div>