/**
* Story controller
* Used to get process info about a story such as url, title, and type
*/
HN.Story = (function(){

	function HNStory(storyInfo){
		this.storyInfo = storyInfo;
	}

	HNStory.prototype.url = function() {
		//for ask or show HN stories
		if(this.storyInfo['url'] === ''){
			return "https://news.ycombinator.com/item?id=" + this.storyInfo['id']; 
		}
		return this.storyInfo['url'];
	};

	/**
	* gets the url root domain for display with story
	* http://www.nytimes.com/story becomes (nytimes.com)
	*/
	HNStory.prototype.urlRoot = function() {
		//for ask or show HN stories
		if(this.storyInfo['url'] === ''){
			return ''; 
		}
		//removes first part of url (http://www.)
		var base_url = this.storyInfo['url'];
		base_url =  base_url.replace(/^http(s)?:\/\/(www.)?/, '');
		//removes subfolders from url (/index.html)
		base_url = base_url.replace(/\/.*$/, '');
		//removes get requests from url (?q=something)
		return '(' + base_url.replace(/\?.*$/,'') + ')';
	};
	HNStory.prototype.title = function(){
		return this.storyInfo['title'];
	}
	HNStory.prototype.type = function(){
		return this.storyInfo['type'];
	}	
	HNStory.prototype.numComments = function(){
		if(!this.storyInfo['kids']){
			return 0;
		}
		return this.storyInfo['kids'].length;
	}
	HNStory.prototype.commentsUrl = function(){
		return 'https://news.ycombinator.com/item?id=' + this.storyInfo['id'];
	}
	HNStory.prototype.storyInfoUrl = function() {
		return 'https://hacker-news.firebaseio.com/v0/item/' + this.id + '.json';
	};
	return HNStory;
})();
