<div class="memory">
	<% _.each(model.memory, function(n) { %>
		<div class="memory-item"><%- n %></div>
	<% }) %>
</div>

<div class="number1 row">
	<% _.each( String(model.number1).split(''), function(n) { %>
		<div class="item"><%- n %></div>
	<% }) %>

	<% if(model.isNumber1Active()) { %>
		<div class="item cursor"></div>
	<% } %>
</div>

<div class="operation"><%- model.operation %></div>

<div class="number2 row">
	<% _.each( String(model.number2).split(''), function(n) { %>
		<div class="item"><%- n %></div>
	<% }) %>

	<% if(model.isNumber2Active()) { %>
		<div class="item cursor"></div>
	<% } %>
</div>

<% if(model.isReady()) { %>
	<div class="line"></div>
<% } %>

<div class="steps">
	<% _.each(model.steps, function(step_items, pos) { %>
		
		<% if(model.isLastStep(pos) && model.number2 > 9 && model.operation == '×') { %>
			<div class="line"></div>
		<% } %>

		<div class="row step">
			<% if(model.cursorAtStep(pos) && model.isReady()) { %>
				<div class="item cursor"></div>
			<% } %>

			<% _.each(step_items, function(n, k) { %>
				<div class="item <% if(!model.isCorrectByStep(pos, k)) { %>error<% } %>"><%- n %></div>
			<% }) %>

			<% if(!model.isLastStep(pos)) { %>
				<% for(let i = 0; i < pos; i++) { %>
					<div class="item"></div>
				<% } %>
			<% } %>
		</div>

	<% }) %>
</div>
