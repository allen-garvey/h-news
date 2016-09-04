<?php 
/**
* Controls such things as title of the page, which kinds of stories are displayed
*/
interface HNewsPage{
	/**
	* Title of the page, used to display navigation
	*/
	public function getTitle();
	public function getControllerType();
	public function getPageTitle();
	
}

/**
* Controls such things as initial the settings, which is just visual themes for now
*/
class HNewsSettingsPageController implements HNewsPage{
	public static $userThemeFormName = "userTheme";
	public static $autoDarkModeFormName = "autoDark";
	public static $themeIdPrefix = "theme_";
	public static function getThemeList(){
		return ['default', 'dark', 'blue', 'green', 'purple', 'silver', 'red'];
	}
	public function getTitle(){
		return 'settings';
	}
	public function getControllerType(){
		return 'settings';
	}
	public function getPageTitle(){
		return PAGE_TITLE_DEFAULT.'&mdash;Settings';
	}

}

/**
* Controls such things as title of the page, and the parent id of the comments displayed
*/
class HNewsCommentsPageController implements HNewsPage{
	protected $title;
	
	function __construct($title=null) {
		if(isset($title) & in_array($title, ['show', 'ask'])){
			$this->title = $title;
		}
		else{
			$this->title = 'home';
		}
	}
	/**
	* Title of the page, used to display navigation
	*/
	public function getTitle(){
		return $this->title;
	}
	public function getPageTitle(){
		return PAGE_TITLE_DEFAULT;
	}
	/**
	* Used to retrieve json about parent story and get its comment ids
	*/
	public function getStoryIdsUrl(){
		return 'https://hacker-news.firebaseio.com/v0/item/' . $this->parentStoryId . '.json';
	}
	public function getControllerType(){
		return 'comments';
	}
	
}

/**
* Controls such things as title of the page, which kinds of stories are displayed
* for stories (homepage, ask and show main pages)
*/
abstract class HNewsAbstractStoryController implements HNewsPage{
	public function getPageTitle(){
		return PAGE_TITLE_DEFAULT;
	}
	public function getControllerType(){
		return 'story';
	}
}

class HNewsHomePageController extends HNewsAbstractStoryController{
	public function getTitle(){
		return 'home';
	}
}

class HNewsShowPageController extends HNewsAbstractStoryController{
	public function getTitle(){
		return 'show';
	}
	public function getPageTitle(){
		return PAGE_TITLE_DEFAULT.'&mdash;Show';
	}
}

class HNewsAskPageController extends HNewsAbstractStoryController{
	public function getTitle(){
		return 'ask';
	}
	public function getPageTitle(){
		return PAGE_TITLE_DEFAULT.'&mdash;Ask';
	}
}