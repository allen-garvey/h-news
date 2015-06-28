<?php 
/**
* Controls such things as title of the page, which kinds of stories are displayed
*/
abstract class HNewsAbstractPageController{
	/**
	* Title of the page, used to display navigation
	*/
	public abstract function getTitle();
	public abstract function getStoryIds();
	/**
	* Returns a boolean if should display story of that type
	*/
	public abstract function shouldDisplayStory(HNewsStoryController $story);
	
	public function getNumStoriesPerPage(){
		return 30;
	}
	
}

class HNewsHomePageController extends HNewsAbstractPageController{
	public function getTitle(){
		return 'home';
	}
	public function getStoryIds(){
		return HNewsStoriesModel::topStories();
	}

	public function shouldDisplayStory(HNewsStoryController $story){
		if($story->getType() !== 'job'){
			return true;
		}
		return false;
	}
}

class HNewsShowPageController extends HNewsAbstractPageController{
	public function getTitle(){
		return 'show';
	}
	public function getStoryIds(){
		return HNewsStoriesModel::showStories();
	}

	public function shouldDisplayStory(HNewsStoryController $story){
		return true;
	}
}

class HNewsAskPageController extends HNewsAbstractPageController{
	public function getTitle(){
		return 'ask';
	}
	public function getStoryIds(){
		return HNewsStoriesModel::askStories();
	}

	public function shouldDisplayStory(HNewsStoryController $story){
		return true;
	}
}