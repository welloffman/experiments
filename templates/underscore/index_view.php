<div class="projects-wrapper">
	<% _.each(projects, function(item) { %>
		<a class="<% if(!item.is_native) { %>js-route<% } %> project" href="<%- item.url %>"><%- item.title %></a>
	<% }) %>
</div>


<div>
	<svg class="icon house-solid"><use href="/img/sprite.svg#house-solid"></use></svg>
	<svg class="icon user-solid"><use href="/img/sprite.svg#user-solid"></use></svg>
	<svg class="icon pdf"><use href="/img/sprite.svg#pdf"></use></svg>
	<svg class="icon react"><use href="/img/sprite.svg#react"></use></svg>
</div>