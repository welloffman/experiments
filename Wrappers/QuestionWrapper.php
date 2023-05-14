<?

namespace Wrappers;

use Models\Question;

class QuestionWrapper extends MysqlWrapper {
	const ERR_MSG = [
		'empty_question' => 'Введите текст вопроса',
		'empty_answer' => 'Введите текст ответа',
		'empty_theme' => 'Укажите тему',
		'not_found' => 'Вопрос не найден'
	];

	public function getName() {
		return 'question';
	}

	public function getObject() {
		return new Question($this->app);
	}

	public function createQuestion($data) {
		$question = $this->getObject();
		$question->setProperties($data);
		$question->id = null;

		$error = $question->getError();
		if($error) {
			return ['success' => false, 'message' => $error];
		}

		$question->save();
		return ['success' => true, 'id' => $question->id];
	}

	public function updateQuestion($data) {
		$question = $this->findById($data['id']);

		if(!$question) {
			return ['success' => false, 'message' => $this::ERR_MSG['not_found']];
		}

		$question->setProperties($data);
		$error = $question->getError();
		if($error) {
			return ['success' => false, 'message' => $error];
		}

		$question->save();
		return ['success' => true, 'id' => $question->id];
	}
}