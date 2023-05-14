<?

$app->routes = [
	'/' => 'Controllers\MainController:indexAction',
	'/login' => 'Controllers\MainController:indexAction',
	'/logout' => 'Controllers\MainController:logoutAction',
	'/forgot-password' => 'Controllers\MainController:indexAction',
	'/change/password/<forgot_code>' => 'Controllers\MainController:indexAction',
	'/registration' => 'Controllers\MainController:indexAction',
	'/registration/confirm/<activation_code>' => 'Controllers\MainController:indexAction',
	'/projects/probability' => 'Controllers\MainController:indexAction',
	'/projects/numerals' => 'Controllers\MainController:indexAction',
	'/projects/vue' => 'Controllers\MainController:indexAction',
	'/projects/it-gramota' => 'Controllers\MainController:indexAction',
	'/projects/code-bot' => 'Controllers\MainController:indexAction',
	'/projects/columnar-calculations' => 'Controllers\MainController:indexAction',
	'/projects/simulation' => 'Controllers\MainController:indexAction',
	'/projects/word-chipher' => 'Controllers\MainController:indexAction',
	'/projects/form-builder-widget' => 'Controllers\MainController:formBuilderAction',

	'/projects/vue' => 'Controllers\MainController:vueAction',

	'/post/registration' => 'Controllers\MainController:registrationAction',
	'/post/account/activate' => 'Controllers\MainController:accountActivateAction',
	'/post/login' => 'Controllers\MainController:loginAction',
	'/post/forgot-password' => 'Controllers\MainController:forgotPasswordAction',
	'/post/change-password' => 'Controllers\MainController:changePasswordAction',	

	'/post/interview/save-question' => 'Controllers\InterviewController:saveQuestion',
	'/post/interview/fetch-questions' => 'Controllers\InterviewController:fetchQuestions',
	'/post/interview/delete-question' => 'Controllers\InterviewController:deleteQuestion',

	'/post/game/fetch-cells' => 'Controllers\GameController:fetchCeils',
];