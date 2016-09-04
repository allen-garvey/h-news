/**
* Story model
* Used to get process info about a story such as url, title, and type
*/
HN.Story = (function(){

	function HNStory(storyInfo){
		this.storyInfo = storyInfo;
	};

	HNStory.prototype.url = function() {
		//for ask or show HN stories
		if(this.isLocalHNUrl()){
			return HN.askUrl + this.storyInfo['id'];
		}
		return this.storyInfo['url'];
	};
	HNStory.prototype.isLocalHNUrl = function(){
		if(!this.storyInfo['url']){
			return true;
		}
		return false;
	};

	/**
	* gets the url root domain for display with story
	* http://www.nytimes.com/story becomes (nytimes.com)
	*/
	HNStory.prototype.urlRoot = function() {
		//for ask or show HN stories
		if(this.isLocalHNUrl()){
			return ''; 
		}
		//removes first part of url (http://www.)
		var base_url = this.url();
		base_url =  base_url.replace(/^http(s)?:\/\/(www.)?/, '');
		//removes subfolders from url (/index.html)
		base_url = base_url.replace(/\/.*$/, '');
		//removes get requests from url (?q=something)
		return '(' + base_url.replace(/\?.*$/,'') + ')';
	};
	HNStory.prototype.title = function(){
		return this.storyInfo['title'] || '';
	};
	HNStory.prototype.text = function(){
		return this.storyInfo['text'] || '';
	};
	HNStory.prototype.author = function(){
		return this.storyInfo['by'] || '';
	};
	HNStory.prototype.storyType = function(){
		if(this.type() !== 'story'){
			return false;
		}
		if(this.isLocalHNUrl()){
			if(this.title().substring(0,3).toLowerCase() === 'ask'){
				return 'ask';
			}
			return 'show';
		}
		return 'story';
	};
	HNStory.prototype.type = function(){
		return this.storyInfo['type'];
	};
	HNStory.prototype.numComments = function(){
		if(!this.storyInfo['descendants']){
			return 0;
		}
		return this.storyInfo['descendants'];
	};
	HNStory.prototype.getTopLevelCommentsIds = function(){
		if(!this.storyInfo['kids']){
			return [];
		}
		return this.storyInfo['kids'];
	};
	HNStory.prototype.commentsUrl = function(commentsUrl){
		// return 'https://news.ycombinator.com/item?id=' + this.storyInfo['id'];
		return commentsUrl + this.storyInfo['id'];
	};
	return HNStory;
})();
