<?

namespace Services;

use \Core\Service;

class CurlService extends Service {
	private $ch;
	private $url;

	private function init() {
		$this->close();
		$this->ch = curl_init();
		curl_setopt($this->ch, CURLOPT_URL, $this->url);
		curl_setopt($this->ch, CURLOPT_HEADER, 0);
		curl_setopt($this->ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($this->ch, CURLOPT_TIMEOUT, 10);
	}

	private function close() {
		if($this->ch) {
			curl_close($this->ch);
			$this->ch = null;
		}
	}
	
	public function getContent($url) {
		$this->url = $url;
		$this->init();
		$result = $this->execute();

		if($result === false) {
			$this->app->log('CurlService', [
				'Url' => $url,
				'Message' => 'Curl error: ' . curl_error($this->ch)
			]);
			$result = '';
		}

		$this->close();

		return $result;
	}

	private function execute() {
		return curl_exec($this->ch);
	}
}