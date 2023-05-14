<div class="content-wrapper">
	<div class="column">
		<div class="title1">Настройки</div>
		<div class="row mb-2">
			<div class="title2 mr-2">Число на вход для сети</div>
			<input type="number" class="light-input large" value="<%- number %>">
		</div>
	</div>

	<div class="column">
		<div class="title1">Слои сети</div>
		<div class="net-wrapper">
			<div class="net-layers">
				<div class="net-row">
					<% _.each(net.getInput(), function(item) { %>
						<div class="net-point"><%- item %></div>
					<% }) %>
				</div>

				<div class="net-row">
					<% _.each(net.getHidden(), function(item) { %>
						<div class="net-point"><%- item.toFixed(2) %></div>
					<% }) %>
				</div>

				<div class="net-row">
					<% _.each(net.getOutput(), function(item) { %>
						<div class="net-point"><%- item.toFixed(2) %></div>
					<% }) %>
				</div>
			</div>
		</div>
	</div>
</div>