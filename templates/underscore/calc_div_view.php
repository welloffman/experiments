<div class="memory">
	<% _.each(model.memory, function(n) { %>
		<div class="memory-item"><%- n %></div>
	<% }) %>
</div>

<div class="left">
	<div class="number1 row">
		<% _.each( String(model.number1).split(''), function(n) { %>
			<div class="item"><%- n %></div>
		<% }) %>

		<% if(model.isNumber1Active()) { %>
			<div class="item cursor"></div>
		<% } %>
	</div>

	<div class="steps">
		<% _.each(model.steps, function(step_items, pos) { %>
			
			<div class="row step">
				<% _.each(step_items, function(n, k) { %>
					<div class="item <% if(!model.isCorrectByStep(pos, k)) { %>error<% } %>"><%- n %></div>
				<% }) %>

				<% if(model.cursorAtStep(pos) && model.isReady()) { %>
					<div class="item cursor"></div>
				<% } %>
			</div>

			<% if(!(pos % 2)) { %>
				<div class="line"></div>
			<% } %>

		<% }) %>
	</div>
</div>

<div class="right">
	<% if(model.number2 !== '') { %>
		<div class="number2 row">
			<% _.each( String(model.number2).split(''), function(n) { %>
				<div class="item"><%- n %></div>
			<% }) %>

			<% if(model.isNumber2Active()) { %>
				<div class="item cursor"></div>
			<% } %>
		</div>
	<% } %>

	<div class="answer row">
		<% if(model.answer !== undefined) { %>
			<% _.each( String(model.answer).split(''), function(n) { %>
				<div class="item"><%- n %></div>
			<% }) %>
		<% } %>

		<% if(model.isAnswerActive()) { %>
			<div class="item cursor"></div>
		<% } %>
	</div>
</div>