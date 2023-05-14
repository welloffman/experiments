<?

namespace Services;

use \Core\Service;

class ScannerService extends Service {
	private $raw_data;
	private $url;

	public function scan($url) {
		$this->url = $url;
		$curl_service = new CurlService($this->app);
		$this->raw_data = $curl_service->getContent($this->url);
	}

	public function getRawData() {
		return $this->raw_data;
	}
	
	public function getLinks() {
		$links = [];
		$parts = explode('href', $this->raw_data);
		array_shift($parts);

		foreach($parts as $item) {
			$has_link = preg_match('/"(.*?)"/', $item, $matches);
			if($has_link) {
				$links[] = $matches[1];
			}
		}

		return $links;
	}

	public function getAbsoluteLinks() {
		$links = $this->getLinks();
		$filtered_links = array_filter($links, function($item) {
			return preg_match('/^http/', $item);
		});

		return array_values($filtered_links);
	}

	public function getExternalLinks() {
		$links = $this->getLinks();
		$filtered_links = array_filter($links, function($item) {
			return preg_match('/^http/', $item) && strpos($item, $this->url) !== 0;
		});

		return array_values( array_unique($filtered_links) );
	}

	public function getExternalHosts() {
		$links = $this->getExternalLinks();

		$links = array_map(function($item) {
			$p = parse_url($item);
			if(isset($p['scheme']) && isset($p['host'])) {
				return $p['scheme'] . '://' . $p['host'];
			} else {
				return null;
			}
		}, $links);

		return array_values( array_filter(array_unique($links)) );
	}

	public function getTitle() {
		$title = '';
		$success = preg_match('/<title>(.*?)<\/title>/', $this->raw_data, $matches);
		if($success) {
			$title = $matches[1];
		}

		return $title;
	}

	public function getDescription() {
		$description = '';
		$success = preg_match('/name="description"(.*?)>/', $this->raw_data, $matches);
		if($success) {
			$description = $matches[1];

			$success = preg_match('/content="(.*?)"/', $description, $matches);
			if($success) {
				$description = $matches[1];
			}
		}

		return $description;
	}

	public function getKeywords() {
		$keywords = '';
		$success = preg_match('/name="keywords"(.*?)>/', $this->raw_data, $matches);
		if($success) {
			$keywords = $matches[1];

			$success = preg_match('/content="(.*?)"/', $keywords, $matches);
			if($success) {
				$keywords = $matches[1];
			}
		}

		return $keywords;
	}
}