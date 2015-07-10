/**
* used to display comment and ask pages
*/
HN.displayComments = function(){
	$.ajax({
		url: HN.storiesUrl,
		type: 'GET',
		dataType: 'json'
	})
	.done(function(storyInfo) {
		if(!storyInfo){
			console.log('No info about the story returned');
			return;
		}
		var story = new HN.Story(storyInfo);
		var title_class = 'container'
		var text = "";
		var title;
		if(HN.pageName === 'ask'){
			title_class += ' ask';
			text = "<h6>" + storyInfo.by + "</h6><article>" + HN.util.smartenQuotesHTML(storyInfo.text)  + "</article>";
			title = HN.util.getAskStoryTitle(story);
		}
		else{
			title = HN.util.getStoryTitleHTML(story)
		}
		document.title = document.title + " - " + story.title();
		$('main').prepend("<section class='" + title_class + "'>" + title + text + "</section>");
		displayAllCommentChildren(story.getTopLevelCommentsIds());
		
	})
	.fail(function() {
		console.log("Error retrieving comments");
	});

	/**
	* displays comment children of an array of comment ids
	* if no selector is given, assumes it is top level comment and creates appropriate jquery selector object
	*/
	function displayAllCommentChildren(commentIdArray, selector){
		if(!commentIdArray){
			return;
		}
		var isTopLevelComment = !selector;
		var $parent_list = selector ? $(selector) : $("#top_list");
		var numCommentIds = commentIdArray.length;
		for (var i = 0; i < numCommentIds; i++) {
			$.ajax({
				url: HN.util.getItemInfoUrlFromId(commentIdArray[i]),
				type: 'GET',
				dataType: 'json'
			})
			.done(function(commentInfo){
				displayComment(commentInfo, $parent_list, isTopLevelComment);
			})
			.fail(function() {
				console.log("Error retrieving info about comment: " + commentIdArray[i]);
			});
			
		};

	}

	/**
	* displays comment
	* $parent_list is a jquery object that the comment should be appended to
	* isTopLevelComment is used for styling purposes, since top level comments are styled different than child comments
	*/
	function displayComment(commentInfo, $parent_list, isTopLevelComment){
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

		$parent_list.append(commentHTML);
		displayAllCommentChildren(comment.children(), '#' + commentIdToCSSId(comment.commentId()));
	}
	
	/**
	* Returns the correct jquery id selector for the parent ol to append comment to
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

