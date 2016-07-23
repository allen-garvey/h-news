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
	HNStory.prototype.commentsUrl = function(){
		// return 'https://news.ycombinator.com/item?id=' + this.storyInfo['id'];
		return HN.commentsUrl + this.storyInfo['id'];
	};
	return HNStory;
})();

/**
* Comment model
* Used to get process info about a comment such as kids and parent id
*/

HN.Comment = (function(){

	function HNComment(commentInfo){
		this.commentInfo = commentInfo;
	}
	HNComment.prototype.isDeleted = function(){
		if(this.commentInfo['deleted'] === true){
			return true;
		}
		return false;
	}
	HNComment.prototype.children = function(){
		return this.commentInfo['kids'];
	}
	HNComment.prototype.parentId = function(){
		return this.commentInfo['parent'];
	}
	HNComment.prototype.text = function(){
		return this.commentInfo['text'];
	}
	HNComment.prototype.author = function(){
		return this.commentInfo['by'];
	}
	HNComment.prototype.commentId = function(){
		return this.commentInfo['id'];
	}
	
	HNComment.prototype.numChildren = function(){
		if(!this.children()){
			return 0;
		}
		return this.children().length;
	}

	return HNComment;
})();
/**
* used to story shared functions used in story and comments pages
*/
HN.util = {};
/**
		* returns object of info about a story based on integer id
		* id		The item's unique id.
		* deleted	true if the item is deleted.
		* type		The type of item. One of "job", "story", "comment", "poll", or "pollopt".
		* by		The username of the item's author.
		* time		Creation date of the item, in Unix Time.
		* text		The comment, story or poll text. HTML.
		* dead		true if the item is dead.
		* parent	The item's parent. For comments, either another comment or the relevant story. For pollopts, the relevant poll.
		* kids		The ids of the item's comments, in ranked display order.
		* url		The URL of the story.
		* score		The story's score, or the votes for a pollopt.
		* title		The title of the story, poll or job.
		* parts		A list of related pollopts, in display order.
		* descendants	In the case of stories or polls, the total comment count.
		*/
HN.util.getItemInfoUrlFromId = function(id){
		return 'https://hacker-news.firebaseio.com/v0/item/' + id + '.json';
	};
/**
* Takes HN.Story object as a parameter and returns the html to display the title and link
*/
HN.util.getStoryTitleHTML = function(story){
	var title = "<a href='" + story.url() +"'><h3>" + story.title();
	if(story.urlRoot() !== ''){
		title += "<span class='small url_source'> " + story.urlRoot() + "</span>";
	}
	title += "</h3></a>";
	return title;
};

/**
* Used for ask pages to display without the link
* Even though code only used on ask pages, is kept here because it should have the same style as getStoryTitleHTML()
*/
HN.util.getAskStoryTitle = function(story){
	return "<h3>" + story.title() + "</h3>";
};

/**
* Used for comment HTML text to smarten quotes
* takes html string and returns html string with dumb quotes replaced with smart quotes
* preserves dumbquotes in html attributes
*/
HN.util.smartenQuotesHTML = function(dumbString){
	return HN.util.replaceSmartQuoteEntities(HN.util.transformTextNodes(dumbString, function(text){
		return HN.util.replaceDumbQuotes(text);
	}));
};

/**
* Used to transform just the textNodes in html
* used for smarten quotes
* @element first argument is either the result of document.getElementById() 
* or a string of html such as 'text' or 'text <div>more text</div>' or '<div>text</div>'
* @textTransformFunc is a function used to transform the text nodes
* it should be of the format: function(text){return text.toUpperCase();} or however the text is to be transformed
* @returns either the transformed string if was originally a string or transformed element if was originally an element
*/
HN.util.transformTextNodes = function (element, textTransformFunc) {
    var elementType = typeof element;
    
    if(elementType === 'string'){
        var div = document.createElement('div');
        div.innerHTML = element;
        element = div;
    }
    try{
	    var walker = document.createTreeWalker(
	        element, 
	        NodeFilter.SHOW_TEXT, 
	        null, 
	        false
	    );
	}
	catch(e){
		console.log(e);
		return element;
	}

    var textNode;

    while(textNode = walker.nextNode()) {
        textNode.nodeValue = textTransformFunc(textNode.nodeValue);
    }
    if(elementType === 'string'){
        return element.innerHTML;
    }
    return element;
};

/**
* Used to replace dumb quotes in a text string
* uses a second replace in the function passed to replace to preserve the non word characters before the quote, such as spaces or parens
*/
HN.util.replaceDumbQuotes = function(dumbString){
	var rightSingleSmartQuote = "&#8217;";
	var leftSingleSmartQuote = "&#8216;";
	var rightDoubleSmartQuote = "&#8221;";
	var leftDoubleSmartQuote = "&#8220;";
	var emDash = "&#8212;";
	var ellipsis = "&#8230;";
	return dumbString
			   		 .replace(/\b'|[\.?,-\/#!$%\^&\*;:{}<>=|\-_`~()\[\]]'/g, function(match, str, offset){return match.replace(/'/g, rightSingleSmartQuote);})
		       		 .replace(/'/g, leftSingleSmartQuote)
		       		 .replace(/\b"|[\.?,-\/#!$%\^&\*;:{}<>|=\-_`~()\[\]]"/g, function(match, str, offset){return match.replace(/"/g, rightDoubleSmartQuote);})
		       		 .replace(/"/g, leftDoubleSmartQuote)
		       		 .replace(/\D\s+-+\s*\D|\D\s*-+\s+\D|\s*--+\s*/g, function(match, str, offset){return match.replace(/\s*-+\s*/g, emDash);})
		       		 .replace(/\.\s?\.\s?\.\s?/g, ellipsis);
};

/**
* Required because the treeWalker automatically escapes ampersands
*/
HN.util.replaceSmartQuoteEntities = function(string){
	if(typeof string != 'string'){
		return string;
	}
	return string.replace(/&amp;#[\d]{4};/g, function(match, str, offset){
		return match.replace('&amp;', '&');
	});
};

/*
 * Wrapper for ajax
 * 
 * @param url - string for url to get request
 * @param success - function to be run on success - takes one argument of the data returned
 * @param failure - function to be run on error - take one argument of error
 * @return null
 */
HN.getJSON = function(url, success, failure){
	var request = new XMLHttpRequest();
	request.open('GET', url, true);

	request.onload = function() {
	  if (this.status >= 200 && this.status < 400) {
	    var data = JSON.parse(this.response);
	    success(data);
	  } else {
	    // We reached our target server, but it returned an error
	    failure(this.response);
	  }
	};

	request.onerror = function() {
	  // There was a connection error of some sort
	  failure(this.response);
	};

	request.send();
};

/*
 * Used to iterate over array or array-like collection (e.g. NodeList)
 * 
 * @param collection - collection to be iterated over
 * @param action - anynomous function to be called for each item in collection - arguments are item, and (int) index of item
 * @return null
 */

 HN.util.each = function(collection, action){
 	var length = collection.length;
 	for (var i = 0; i < length; i++) {
 		action(collection[i], i);
 	};
 };

/*
* Used for comments to change ycombinator links to hnews links
*/
HN.util.redirectLinks = function(){
	var ycombinatorLink = 'https://news.ycombinator.com/item?id=';
	var links = document.querySelectorAll("#top_list a[href^='" + ycombinatorLink + "']");
	HN.util.each(links, function(link){
		var hrefSplit = link.href.split(ycombinatorLink);
		//make sure it's a comment url
		if(hrefSplit.length !== 2){
			return;
		}
		var commentId = hrefSplit[1];
		//make sure comment id is number
		if(!commentId.match(/^[0-9]*$/)){
			return;
		}
		var hnewsUrl = HN.settings.commentsUrl + commentId;
		link.setAttribute('href', hnewsUrl);
		link.text = hnewsUrl;
	});
};

/**
* used to display homepage, show and ask pages list of story links
*/
HN.displayStories = function(){
	HN.getJSON(HN.storiesUrl, function(storyIds){getStoryInfo(storyIds);}, function(){console.log("Error retrieving story ids");});

	function getStoryInfo(storyIds){
		var top_list = document.getElementById('top_list');
		for(var i=0;i<HN.storiesPerPage;i++){
			var storyInfoUrl = HN.util.getItemInfoUrlFromId(storyIds[i]);
			if(storyInfoUrl){
				HN.getJSON(storyInfoUrl, function(storyInfo){
								if(!storyInfo){
									console.log('Story info is: ' + storyInfo + ' for story id: ' + storyIds[i]);
									return;
								}
								var story = new HN.Story(storyInfo);
								if(HN.shouldDisplayStory(story)){
									top_list.insertAdjacentHTML('beforeend', getStoryHTML(story));
								}	
					}, 
					function(){console.log("failed to get info about story: " + story.id);}
				);
			}
		}
	}

	function getStoryHTML(story){
		var html = "<li><div class='container'>" + HN.util.getStoryTitleHTML(story);
		var num_comments = story.numComments();
		if(num_comments > 0){
			var comments_text = ' comment';
			if(num_comments > 1){
				comments_text = ' comments';
			}
			html = html + "<a href='" + story.commentsUrl() +"'><p>" + num_comments  + comments_text + "</p></a>";
		}
		html = html + "</div></li>";
		return html;
	}
};

/**
* used to display comment and ask pages
*/
HN.clearComments = function(){
	document.getElementById('content_main').innerHTML = '';
};

HN.displayComments = function(){
	var storyId = window.location.href.match(/\d+\/?$/);
	if(storyId){
		var storyUrl = 'https://hacker-news.firebaseio.com/v0/item/' + storyId[0] + '.json';
	}
	else{
		console.log("No story id found");
		return;
	}
	HN.getJSON(storyUrl, function(storyInfo){
			if(!storyInfo){
				console.log('No info about the story returned');
				return;
			}
			var story = new HN.Story(storyInfo);
			var title_class = 'container'
			var text = story.text();
			var title = '';
			if(text){
				text = "<h6>" + story.author() + "</h6><article>" + HN.util.smartenQuotesHTML(story.text())  + "</article>";
				if(HN.pageName === 'ask' || story.title().match(/^(Ask|Tell) HN:/)){
					title_class += ' ask';
					title = HN.util.getAskStoryTitle(story);
				}
			}
			else{
				title = HN.util.getStoryTitleHTML(story)
			}
			document.title = document.title + " - " + story.title();
			document.getElementById('content_main').insertAdjacentHTML('afterbegin', "<section class='" + title_class + "'>" + title + text + "</section>");
			displayAllCommentChildren(story.getTopLevelCommentsIds());	
		},

		function(){console.log("Error retrieving comments");}
	);

	/**
	* displays comment children of an array of comment ids
	* if no cssId is given, assumes it is top level comment and creates appropriate jquery cssId object
	*/
	function displayAllCommentChildren(commentIdArray, cssId){
		if(!commentIdArray){
			return;
		}
		var isTopLevelComment = !cssId;
		var parent_list = cssId ? document.getElementById(cssId) : document.getElementById('top_list');
		var numCommentIds = commentIdArray.length;
		for (var i = 0; i < numCommentIds; i++) {
			HN.getJSON(HN.util.getItemInfoUrlFromId(commentIdArray[i]), function(commentInfo){
					displayComment(commentInfo, parent_list, isTopLevelComment);
				},
				
				function(){console.log("Error retrieving info about comment: " + commentIdArray[i]);}
			);

		};
		//change hacker news links to hnews links
		HN.util.redirectLinks();

	}

	/**
	* displays comment
	* parent_list is a dom object that the comment should be appended to
	* isTopLevelComment is used for styling purposes, since top level comments are styled different than child comments
	*/
	function displayComment(commentInfo, parent_list, isTopLevelComment){
		if(!commentInfo){
			return;
		}
		var comment = new HN.Comment(commentInfo);
		if(comment.isDeleted()){
			comment = getDeletedComment(commentInfo);
		}
		var commentHTML = "<li class='comment'>";
		if(isTopLevelComment){
			commentHTML += "<div class='container'>";
		}
		commentHTML += "<h6>" + comment.author() + "</h6><article";
		if(comment.isDeleted()){
			commentHTML += " class='deleted'";	
		}
		commentHTML += ">" + HN.util.smartenQuotesHTML(comment.text()) + "</article>";
		
		if(comment.numChildren() > 0){
			commentHTML += "<ol id='" + commentIdToCSSId(comment.commentId()) + "'></ol>";
		}
		if(isTopLevelComment){
			commentHTML += "</div>";
		}
		commentHTML +=  "</li>";

		parent_list.insertAdjacentHTML('beforeend', commentHTML);
		displayAllCommentChildren(comment.children(), commentIdToCSSId(comment.commentId()));
	}
	
	/**
	* Returns the correct jquery id cssId for the parent ol to append comment to
	*/
	function commentIdToCSSId(commentId){
		return 'comment' + commentId;
	}

	/**
	* Returns the text used in place of deleted comments
	*/
	function getDeletedComment(commentInfo){
		commentInfo.by = '';
		commentInfo.text = '[deleted]'
		return new HN.Comment(commentInfo);
	}
};


HN.settings.LS_AUTODARK_KEY = 'Local Storage Key for automatically changing to dark theme at night';
HN.settings.LS_USER_THEME_KEY = 'Local Storage Key user selected theme';

HN.settings.initSettingsPage = function(){
	var ls = window.localStorage;
	if(ls.getItem(HN.settings.LS_AUTODARK_KEY) === 'true'){
		document.getElementById('autodark_checkbox').checked = true;
	}
	var userTheme = HN.settings.getUserTheme();

	HN.settings.themeNames.map(function(theme) {
		var themeRadio = document.getElementById(HN.settings.themeIdPrefix + theme);
		if(theme === userTheme){
			themeRadio.checked = true;
		}
		themeRadio.onclick = function(){
			document.documentElement.className = theme;
		};
	});
};

HN.settings.getUserTheme = function(){
	var ls = window.localStorage;
	var userTheme = ls.getItem(HN.settings.LS_USER_THEME_KEY);
	if(HN.settings.themeNames.indexOf(userTheme) < 0){
		userTheme = HN.settings.themeNames[0];
	}
	return userTheme;
};

HN.settings.initSettings = function(){
	document.documentElement.className = HN.settings.getUserTheme();
	var ls = window.localStorage;
	if(ls.getItem(HN.settings.LS_AUTODARK_KEY) === 'true'){
		HN.settings.darkAtNight();
	}
};

HN.settings.darkAtNight = function(){
	var currentDate = new Date();
	var currentHour = currentDate.getHours();
	if(currentHour >= 22 || currentHour < 6){
		document.documentElement.className = 'dark';
	}
};

HN.settings.save = function(){
	var ls = window.localStorage;
	ls.setItem(HN.settings.LS_AUTODARK_KEY, document.getElementById('autodark_checkbox').checked);
	var userTheme = document.querySelector('input[name="' + HN.settings.userThemeFormName + '"]:checked').value;
	if(HN.settings.themeNames.indexOf(userTheme) >= 0){
		ls.setItem(HN.settings.LS_USER_THEME_KEY, userTheme);
	}
	window.location.href = document.querySelector('form').action;
};
//initialize settings
HN.settings.initSettings();

if(HN.pageType === 'comments'){
	//add listener for if user clicks on comments link while on comments page
	window.addEventListener('hashchange', function(){HN.clearComments(); HN.displayComments();}, false);
	HN.displayComments();
}
else if(HN.pageType === 'settings'){
	HN.settings.initSettingsPage();
}
else{
	HN.displayStories();
}
//# sourceMappingURL=app.js.map