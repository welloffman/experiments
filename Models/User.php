<?

namespace Models;

use \Core\Model;

class User extends Model {

	protected $id;
	protected $email;
	protected $password;
	protected $created;
	protected $updated;
	protected $role; // guest, admin
	protected $status; // active, disabled, pending
	protected $activation_code;
	protected $forgot_code;

	public function getWrapper() {
		return $this->app->getUserWrapper();
	}

	public function isAdmin() {
		return $this->get('role') === 'admin';
	}

	public function isGuest() {
		return $this->get('role') === 'guest';
	}

	public function isActive() {
		return $this->get('status') == 'active';
	}

	public function save() {
		if(!$this->id) {
			$this->created = date('Y-m-d H:i:s');
		}

		if(is_string($this->email)) {
			$this->email = trim($this->email);
		}

		$this->updated = date('Y-m-d H:i:s');
		parent::save();
	}

	public function makePassword($passwordLength = 8) {
		$chars = [
			'q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m',
			'Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M',
			'1','2','3','4','5','6','7','8','9','0','_'
		];

		$password = '';
		for($i = 0; $i < $passwordLength; $i++) {
			$pos = random_int(0, count($chars) - 1);
			$password .= $chars[$pos];
		}
		return $password;
	}

	public function makeActivationCode() {
		return md5( $this->makePassword(16) );
	}

	public function makeForgotCode() {
		return md5( $this->makePassword(16) );
	}

	public function generatePassword() {
		$password = md5(uniqid(true));
		$this->set('password', $password);
	}

	public function getPasswordError() {
		$errorMessage = null;
		if(!self::checkPassword( $this->get('password') )) {
			$errorMessage = UserWrapper::ERR_MSG['wrong_email'];
		}
		return $errorMessage;
	}

	public function getPublicData() {
		$public_fields = array_fill_keys(['email', 'role', 'status'], 1);
		return array_intersect_key($this->getProperties(), $public_fields);
	}

	public static function checkPhone($phone) {
		return preg_match('/^\d \(\d\d\d\) \d\d\d\-\d\d\-\d\d$/', $phone);
	}

	public static function checkEmail($email) {
		return preg_match('/^.+@.+\..+$/', $email);
	}

	public static function checkPassword($password) {
		return preg_match('/^[\w]{8,16}$/', $password);
	}

	public function makeToken($life_time = 86400) {
		$time = time() + $life_time;
		$token = md5(uniqid(true));
		$this->getWrapper()->saveToken($this->get('id'), $token);
		setcookie("token", $token, $time, '/');
		return $token;
	}

	public function getActivationLink() {
		return $this->app->protocol . $this->app->baseUrl . '/registration/confirm/' . $this->get('activation_code');
	}

	public function getForgotLink() {
		return $this->app->protocol . $this->app->baseUrl . '/change/password/' . $this->get('forgot_code');

	}
}