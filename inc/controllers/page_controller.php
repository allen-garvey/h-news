<?php 
require_once(MODELS_PATH.'settings_cookie.php');
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
interface HNewsAjaxPage{
	public function getStoryIdsUrl();
}

/**
* Controls such things as initial the settings, which is just visual themes for now
*/
class HNewsSettingsPageController implements HNewsPage{
	public static $userThemeFormName = "userTheme";
	protected $settingsCookie;
	protected $currentTheme;

	function __construct(){
		$this->settingsCookie = new SettingsCookie;
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
	public function getThemeList(){
		return ['default', 'dark', 'blue', 'green', 'purple', 'silver', 'red'];
	}
	public function getThemeIdPrefix(){
		return 'theme_';
	}
	public function getCurrentTheme(){
		if(isset($this->currentTheme)){
			return $this->currentTheme; //required because cookie doesn't refresh immediately after cookies is set
		}
		$userTheme = $this->settingsCookie->getUserTheme();
		if(isset($userTheme) && $this->isValidThemeName($userTheme)){
			return $userTheme;
		}
		return 'default';
	}

	public function isValidThemeName($theme){
		return in_array($theme, $this->getThemeList());
	}

	public function saveUserTheme($userTheme){
		if($this->isValidThemeName($userTheme)){
			$this->settingsCookie->setUserTheme($userTheme);
			$this->currentTheme = $userTheme;
		}
	}
}

/**
* Controls such things as title of the page, and the parent id of the comments displayed
*/
class HNewsCommentsPageController implements HNewsPage, HNewsAjaxPage{
	protected $parentStoryId;
	protected $title;
	
	function __construct($parentStoryId, $title=null) {
		$this->parentStoryId = $parentStoryId;
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
abstract class HNewsAbstractStoryController implements HNewsPage, HNewsAjaxPage{
	/**
	* Returns a js function as string used by the javascript to determine if story should be displayed
	*/
	public function displayStoryFunction(){
		return 'function(story){return true;}';
	}
	public function getPageTitle(){
		return PAGE_TITLE_DEFAULT;
	}
	
	public function getNumStoriesPerPage(){
		return 30;
	}
	public function getControllerType(){
		return 'story';
	}
	public function getCommentsUrl(){
		return COMMENTS_QUERY_URL;
	}
	
}

class HNewsHomePageController extends HNewsAbstractStoryController{
	public function getTitle(){
		return 'home';
	}
	public function getStoryIdsUrl(){
		return HNewsStoriesModel::topStoriesUrl();	
	}

	public function shouldDisplayStory(HNewsStoryController $story){
		if($story->getType() !== 'job'){
			return true;
		}
		return false;
	}
	public function displayStoryFunction(){
		return 'function(story){if(story.type()==="job"){return false;} return true;}';
	}
}

class HNewsShowPageController extends HNewsAbstractStoryController{
	public function getTitle(){
		return 'show';
	}
	public function getPageTitle(){
		return PAGE_TITLE_DEFAULT.'&mdash;Show';
	}
	public function getStoryIdsUrl(){
		return HNewsStoriesModel::showStoriesUrl();	
	}
	public function getCommentsUrl(){
		return SHOW_COMMENTS_QUERY_URL;
	}
}

class HNewsAskPageController extends HNewsAbstractStoryController{
	public function getTitle(){
		return 'ask';
	}
	public function getPageTitle(){
		return PAGE_TITLE_DEFAULT.'&mdash;Ask';
	}
	public function getStoryIdsUrl(){
		return HNewsStoriesModel::askStoriesUrl();	
	}
	public function getCommentsUrl(){
		return ASK_COMMENTS_QUERY_URL;
	}
}