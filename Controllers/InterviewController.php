<?

namespace Controllers;

use \Models\TemplateHandler;
use \Core\Controller;

class InterviewController extends Controller {
	public function saveQuestion() {
		$data = $this->app->request('data');
		if(@$data['id']) {
			$result = $this->app->getQuestionWrapper()->updateQuestion($data);
		} else {
			$result = $this->app->getQuestionWrapper()->createQuestion($data);
		}
		$this->jsonResponse($result);
	}

	public function fetchQuestions() {
		$questions = $this->app->getQuestionWrapper()->find([]);

		$items = [];
		foreach($questions as $question) {
			$items[] = $question->getProperties();
		}

		$this->jsonResponse(['success' => true, 'items' => $items]);
	}

	public function deleteQuestion() {
		$id = $this->app->request('id');
		$question = $this->app->getQuestionWrapper()->findById($id);

		if(!$question) {
			return $this->jsonResponse([
				'success' => false, 
				'message' => $this->app->getQuestionWrapper()::ERR_MSG['not_found']
			]);
		}

		$question->delete();
		
		return $this->jsonResponse(['success' => true]);
	}
}