<?php 
/**
* Used to get process info about a story such as url, title, and type
*/
class HNewsStoryController{
	protected $storyInfo;

	/**
	* takes an associative array of story info returned from HNewsStoriesModel::getStoryInfoFromId
	*/
	function __construct(array $storyInfo){
		$this->storyInfo = $storyInfo;
	}

	public function getUrl(){
		//for ask or show HN stories
		if($this->storyInfo['url'] === ''){
			return "https://news.ycombinator.com/item?id=" . $this->storyInfo['id']; 
		}
		return $this->storyInfo['url'];
	}

	/**
	* gets the url root domain for display with story
	* http://www.nytimes.com/story becomes (nytimes.com)
	*/
	public function getUrlRoot(){
		if($this->storyInfo['url'] === ''){
			return '';
		}
		//removes first part of url (http://www.)
		$base_url = preg_replace('|^http(s)?://(www.)?|', '', $this->storyInfo['url']);
		//removes subfolders from url (/index.html)
		$base_url = preg_replace('|/.*$|', '', $base_url);
		//removes get requests from url (?q=something)
		return '(' . preg_replace('|\?.*$|', '', $base_url) . ')';
	}

	public function getTitle(){
		return $this->storyInfo['title'];
	}

	public function getType(){
		return $this->storyInfo['type'];
	}

	public function getNumComments(){
		if(!isset($this->storyInfo['kids'])){
			return 0;
		}
		return count($this->storyInfo['kids']);
	}
	public function getCommentsUrl(){
		return 'https://news.ycombinator.com/item?id='. $this->storyInfo['id'];
	}
}