/**
* Story model
* Used to get process info about a story such as url, title, and type
*/

import APP_CONSTANTS from './app-constants.js';

export class HNStory{
	
	constructor(storyInfo){
		this.storyInfo = storyInfo;
	}

	get url(){
		//for ask or show HN stories
		if(this.isLocalHNUrl){
			return APP_CONSTANTS.urls.ask + this.storyInfo['id'];
		}
		return this.storyInfo['url'];
	}

	get isLocalHNUrl(){
		if(!this.storyInfo['url']){
			return true;
		}
		return false;
	}
	
	/**
	* gets the url root domain for display with story
	* http://www.nytimes.com/story becomes (nytimes.com)
	*/
	get urlRoot() {
		//for ask or show HN stories
		if(this.isLocalHNUrl){
			return ''; 
		}
		//removes first part of url (http://www.)
		var base_url = this.url;
		base_url =  base_url.replace(/^http(s)?:\/\/(www.)?/, '');
		//removes subfolders from url (/index.html)
		base_url = base_url.replace(/\/.*$/, '');
		//removes get requests from url (?q=something)
		return '(' + base_url.replace(/\?.*$/,'') + ')';
	}

	get title(){
		return this.storyInfo['title'] || '';
	}

	get titleHtml(){
		let title = `<a href="${this.url}"><h3>${this.title}`;
		if(this.urlRoot !== ''){
			title += ` <span class='small url_source'>${this.urlRoot}</span>`;
		}
		title += '</h3></a>';
		return title;
	}

	/**
	* Used for ask pages to display without the link
	* It should have the same style as titleHtml()
	*/
	get askTitle(){
		return `<h3>${this.title}</h3>`;
	}

	get text(){
		return this.storyInfo['text'] || '';
	}

	get author(){
		return this.storyInfo['by'] || '';
	}

	get storyType(){
		if(this.type !== 'story'){
			return false;
		}
		if(this.isLocalHNUrl){
			if(this.title.substring(0,3).toLowerCase() === 'ask'){
				return 'ask';
			}
			return 'show';
		}
		return 'story';
	}

	get type(){
		return this.storyInfo['type'];
	}

	get numComments(){
		if(!this.storyInfo['descendants']){
			return 0;
		}
		return this.storyInfo['descendants'];
	}

	get topLevelCommentsIds(){
		if(!this.storyInfo['kids']){
			return [];
		}
		return this.storyInfo['kids'];
	}

	commentsUrl(commentsUrl){
		// return 'https://news.ycombinator.com/item?id=' + this.storyInfo['id'];
		return commentsUrl + this.storyInfo['id'];
	}
}