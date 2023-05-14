import Application from '/js/router/Application.js';

document.addEventListener("DOMContentLoaded", () => {
	Application.config = config;
	config = null;
	
	const app = new Application();
	app.initRoutes();
});