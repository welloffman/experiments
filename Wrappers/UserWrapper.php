<?

namespace Wrappers;

use Models\User;

class UserWrapper extends MysqlWrapper {
	const ERR_MSG = [
		'empty_email' => 'Введите адрес электронной почты',
		'wrong_email' => 'Адрес электронной почты введен не корректно',
		'empty_password' => 'Введите пароль',
		'wrong_password' => 'Пароль должен быть от 8 до 16 символов и может состоять только из букв, цифр и знака подчеркивания',
		'busy_email' => 'Электронный адрес уже исползуется',
		'user_not_found' => 'Учетная запись не найдена',
		'wrong_email_password' => 'Неверный адрес электронной почты или пароль',
		'temp_account_not_found' => 'Временный аккаунт не найден',
		'empty_password2' => 'Введите пароль повторно',
		'wrong_password2' => 'Пароли не совпадают',
		'empty_new_password' => 'Введите новый пароль',
		'empty_new_password2' => 'Повторите новый пароль',
		'wrong_forgot_code' => 'Ссылка для восстановления пароля устарела или не корректна',
	];

	public function getName() {
		return 'user';
	}

	public function getObject() {
		return new User($this->app);
	}

	public function getCurrentUser() {
		$user = null;

		$token = $this->app->cookie('token');
		if($token) {
			$user = $this->findByToken($token);
		}

		if(!$user) {
			$user = $this->getObject();
			$user->set('role', 'guest');
		}

		return $user;
	}

	public function getUsersStatus($users_ids) {
		$users_ids = array_map(function($id) {
			return (int)$id;
		}, $users_ids);

		$ids_string = implode(', ', $users_ids);

		$sql = "SELECT `id`, `status` FROM `user` WHERE `id` IN ($ids_string)";

		$result = array_map(function($item) {
			return ['id' => $item['id'], 'status' => $item['status']];
		}, $this->customQuery($sql, []));

		return $result;
	}

	public function saveToken($user_id, $token) {
		$sql = "DELETE FROM `user_token` WHERE `user_id` = :user_id";
		$this->customQuery($sql, ['user_id' => $user_id]);

		$sql = "INSERT INTO `user_token` (`user_id`, `token`, `created`) VALUES (:user_id, :token, :created)";
		$created = date('Y-m-d H:i:s');
		$this->customQuery($sql, ['user_id' => $user_id, 'token' => $token, 'created' => $created]);
	}

	public function findByToken($token) {
		$sql = "SELECT * FROM `user_token` WHERE `token` = :token";
		$result = $this->customQuery($sql, ['token' => $token]);

		$user = isset($result[0]['user_id']) ? $this->findById( $result[0]['user_id'] ) : null;
		return $user;
	}

	public function logout() {
		$token = $this->app->cookie('token');

		if($token) {
			$sql = "DELETE FROM `user_token` WHERE `token` = :token";
			$this->customQuery($sql, ['token' => $token]);
			setcookie("token", "", time()-3600, '/');
		}
	}

	public function registration($data) {
		$errors = [];

		if(!isset($data['email'])) {
			$data['email'] = trim($data['email']);
		}
		if(!isset($data['password'])) {
			$data['password'] = trim($data['password']);
		}
		
		if(!isset($data['email']) || !$data['email']) {
			$errors['email'] = self::ERR_MSG['empty_email'];
		} else if(!User::checkEmail( $data['email'] )) {
			$errors['email'] = self::ERR_MSG['wrong_email'];
		} else if($this->findOne([ 'email' => $data['email'] ])) {
			$errors['email'] = self::ERR_MSG['busy_email'];
		}

		if(!isset($data['password']) || !$data['password']) {
			$errors['password'] = self::ERR_MSG['empty_password'];
		} else if(!User::checkPassword( $data['password'] )) {
			$errors['password'] = self::ERR_MSG['wrong_password'];
		}

		if(!isset($data['password2']) || !$data['password2']) {
			$errors['password2'] = self::ERR_MSG['empty_password2'];
		} else if($data['password'] != $data['password2']) {
			$errors['password2'] = self::ERR_MSG['wrong_password2'];
		}

		if(isset($data['temp_link']) && $data['temp_link']) {
			$parts = explode('/', $data['temp_link']);
			$temporary_password = array_pop($parts);
			$user = $this->findOne(['password' => $temporary_password, 'role' => 'temporary']);

			if(!$user) {
				$errors['temp_link'] = self::ERR_MSG['temp_account_not_found'];
			}
		} else {
			$user = $this->getObject();
		}

		if(count($errors)) {
			return ['success' => false, 'errors' => $errors];
		}

		$activation_code = $user->makeActivationCode();
		$user->setProperties([
			'role' => 'maker',
			'email' => $data['email'],
			'password' => $data['password'],
			'status' => 'pending',
			'activation_code' => $activation_code
		]);

		$user->save();

		$this->app->getMailer()->sendUserActivationLink($user);

		return ['success' => true];
	}

	public function activateUser($activation_code) {
		if(!$activation_code) {
			return false;
		}

		$user = $this->findOne(['activation_code' => $activation_code]);

		if(!$user) {
			return false;
		}

		$user->setProperties(['status' => 'active', 'activation_code' => null]);
		$user->save();

		return true;
	}

	public function login($email, $password) {
		if(!$email) {
			return ['success' => false, 'message' => self::ERR_MSG['empty_email']];
		}

		if(!$password) {
			return ['success' => false, 'message' => self::ERR_MSG['empty_password']];
		}

		$user = $this->findOne(['email' => $email, 'password' => $password]);
		if(!$user) {
			return ['success' => false, 'message' => self::ERR_MSG['wrong_email_password']];
		}

		$token = $user->makeToken(31536000);

		return ['success' => true, 'token' => $token];
	}

	public function forgotPassword($email) {
		if(!$email) {
			return ['success' => false, 'message' => self::ERR_MSG['empty_email']];
		}

		if(!User::checkEmail($email)) {
			return ['success' => false, 'message' => self::ERR_MSG['wrong_email']];
		}

		$user = $this->findOne(['email' => $email]);

		if(!$user) {
			return ['success' => false, 'message' => self::ERR_MSG['user_not_found']];
		}

		$code = $user->makeForgotCode();
		$user->set('forgot_code', $code);
		$user->save();

		$result = $this->app->getMailer()->sendForgotLink($user);

		return $result;
	}

	public function changePassword($forgot_code, $password, $password2) {
		$user = $this->findOne(['forgot_code' => $forgot_code]);
		if(!$user) {
			return ['success' => false, 'message' => self::ERR_MSG['wrong_forgot_code']];
		}

		if(!$password) {
			return ['success' => false, 'message' => self::ERR_MSG['empty_new_password']];
		}

		if(!User::checkPassword( $password )) {
			return ['success' => false, 'message' => self::ERR_MSG['wrong_password']];
		}

		if(!$password2) {
			return ['success' => false, 'message' => self::ERR_MSG['empty_new_password2']];
		}

		if($password != $password2) {
			return ['success' => false, 'message' => self::ERR_MSG['wrong_password2']];
		}

		$user->setProperties([
			'forgot_code' => null,
			'password' => $password
		]);
		$user->save();

		return ['success' => true];
	}
}