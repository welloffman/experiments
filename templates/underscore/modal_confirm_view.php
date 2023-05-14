<div class="mask js-mask"></div>
<div class="modal <%- sizeClass %> <%- css_class %>">
	<div class="modal-header">
		<h2 class="modal-title"><%- title %></h2>
		<div class="close js-close">&times;</div>
	</div>

	<div class="modal-body">
		<% if(type != 'custom') { %>
			<p><%- text %></p>
		<% } %>
	</div>

	<div class="modal-footer">
		<button type="button" class="btn js-apply <%- applyButtonCss %>"><%- applyButtonText %></button>
		<% if(type != 'info') { %>
			<button type="button" class="btn js-close"><%- cnacelButtonText %></button>
		<% } %>
	</div>
</div>