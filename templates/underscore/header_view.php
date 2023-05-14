<div class="header">
	<div>
		<a class="logo js-route" href="/">На главную</a>
	</div>
	<div class="menu">
		<% _.each(getMenu(), function(item) { %>
			<div class="item">
				<a class="<% if(item.is_js_route){ %>js-route<% } %> <%- isActive(item) %>" href="/<%- item.route %>"><%- item.title %></a>
			</div>
		<% }) %>
	</div>
</div>