<?php 
/**
* Controls such things as title of the page, which kinds of stories are displayed
*/
abstract class HNewsAbstractPageController{
	/**
	* Title of the page, used to display navigation
	*/
	public abstract function getTitle();
	public abstract function getStoryIdsUrl();
	public abstract function getControllerType();
	
}

/**
* Controls such things as title of the page, and the parent id of the comments displayed
*/
class HNewsCommentsPageController{
	protected $parentStoryId;
	protected $title;
	
	function __construct($parentStoryId, $title=null) {
		$this->parentStoryId = $parentStoryId;
		if(isset($title)){
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
abstract class HNewsAbstractStoryController extends HNewsAbstractPageController{
	/**
	* Returns a js function as string used by the javascript to determine if story should be displayed
	*/
	public function displayStoryFunction(){
		return 'function(story){return true;}';
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
	public function getStoryIdsUrl(){
		return HNewsStoriesModel::askStoriesUrl();	
	}
	public function getCommentsUrl(){
		return ASK_COMMENTS_QUERY_URL;
	}
}