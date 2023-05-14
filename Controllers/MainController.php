<?

namespace Controllers;

use \Core\TemplateHandler;
use \Core\Controller;

class MainController extends Controller {
	public function loginAction() {
		$email = $this->app->post('email');
		$password = $this->app->post('password');
		$result = $this->app->getUserWrapper()->login($email, $password);
		$this->jsonResponse($result);
	}

	public function LogoutAction() {
		$this->app->getUserWrapper()->logout();
		$this->app->redirect('/');
	}

	public function registrationAction() {
		$data = $this->app->post('data');
		$result = $this->app->getUserWrapper()->registration($data);
		return $this->jsonResponse($result);
	}

	public function accountActivateAction() {
		$activation = $this->app->getUserWrapper()->activateUser( $this->app->post('activation_code') );
		return $this->jsonResponse(['success' => true, 'activation' => $activation]);
	}

	public function forgotPasswordAction() {
		$email = $this->app->post('email');
		$result = $this->app->getUserWrapper()->forgotPassword($email);
		return $this->jsonResponse($result);
	}

	public function changePasswordAction() {
		$forgot_code = $this->app->post('forgot_code');
		$password = $this->app->post('password');
		$password2 = $this->app->post('password2');
		$result = $this->app->getUserWrapper()->changePassword($forgot_code, $password, $password2);
		return $this->jsonResponse($result);
	}

	public function vueAction() {
		$user = $this->app->getCurrentUser();
		$template_handler = new TemplateHandler($this->app);
		
		$config = [
			'server_timezone' => $this->app->config['server_timezone'],
			'base_url' => $this->app->protocol . $this->app->baseUrl,
			'templates' => $template_handler->getTemplates(),
			'user' => $user->getPublicData()
		];

		$this->render('layout/vue_main.php', [
			'js_files' => [],
			'root' => $this->app->rootPath(),
			'debug' => $this->app->config['debug'],
			'config' => $config,
		]);
	}

	public function formBuilderAction() {
		$user = $this->app->getCurrentUser();
		$template_handler = new TemplateHandler($this->app);
		
		$config = [
			'server_timezone' => $this->app->config['server_timezone'],
			'base_url' => $this->app->protocol . $this->app->baseUrl,
			'templates' => $template_handler->getTemplates(),
			'user' => $user->getPublicData()
		];

		$this->render('layout/form_builder.php', [
			'js_files' => [],
			'root' => $this->app->rootPath(),
			'debug' => $this->app->config['debug'],
			'config' => $config,
		]);
	}
}