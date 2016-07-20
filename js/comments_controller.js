/**
* used to display comment and ask pages
*/
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

