<?

namespace Models;

use \Core\Model;

class Question extends Model {

	public $id;
	public $question;
	public $answer;
	public $theme_id;

	public function getWrapper() {
		return $this->app->getQuestionWrapper();
	}

	public function getError() {
		if(!$this->question) {
			return $this->getWrapper()::ERR_MSG['empty_question'];
		}

		if(!$this->answer) {
			return $this->getWrapper()::ERR_MSG['empty_answer'];
		}

		if(!$this->theme_id) {
			return $this->getWrapper()::ERR_MSG['empty_theme'];
		}

		return null;
	}
}