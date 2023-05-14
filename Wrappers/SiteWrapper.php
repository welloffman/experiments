<?

namespace Wrappers;

use Models\Site;

class SiteWrapper extends MysqlWrapper {
	public function getName() {
		return 'site';
	}

	public function getObject() {
		return new Site($this->app);
	}
}