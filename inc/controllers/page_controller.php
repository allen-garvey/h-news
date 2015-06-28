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
	/**
	* Returns a js function as string used by the javascript to determine if story should be displayed
	*/
	public function displayStoryFunction(){
		return 'function(story){return true;}';
	}
	
	public function getNumStoriesPerPage(){
		return 30;
	}
	
}

class HNewsHomePageController extends HNewsAbstractPageController{
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

class HNewsShowPageController extends HNewsAbstractPageController{
	public function getTitle(){
		return 'show';
	}
	public function getStoryIdsUrl(){
		return HNewsStoriesModel::showStoriesUrl();	
	}
}

class HNewsAskPageController extends HNewsAbstractPageController{
	public function getTitle(){
		return 'ask';
	}
	public function getStoryIdsUrl(){
		return HNewsStoriesModel::askStoriesUrl();	
	}
}