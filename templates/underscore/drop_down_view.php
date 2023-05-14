<div class="dropdown-wrapper js-dropdown-wrapper <%- cid %>" <% if(max_width) { %>style="max-width: <%- max_width %>"<% } %>>
	<% if(title) { %>
		<div class="drop-down-title js-toggle"><%- title %></div>
	<% } %>

	<% if(image) { %>
		<div class="drop-down-image js-toggle"><img src="<%- image %>" <% if(image_width) { %>width="<%- image_width %>"<% } %>></div>
	<% } %>

	<div class="dropdown-toggle m-pointer js-toggle">
		<div class="current-text js-current-text"><%= getCurrentText() %></div>
	</div>

	<div class="dropdown-menu">
		<% _.each(items, function(option) { %>
			<div class="dropdown-item m-pointer js-dropdown-item" data-key="<%- option[0] %>"><%- option[1] %></div>
		<% }) %>
	</div>
</div>