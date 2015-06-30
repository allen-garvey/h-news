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
		$('main').prepend("<div class='container'>" + HN.util.getStoryTitleHTML(story) + "</div>");
		displayAllCommentChildren(story.getTopLevelCommentsIds());
		
	})
	.fail(function() {
		console.log("Error retrieving comments");
	});

	function displayAllCommentChildren(commentIdArray, selector){
		if(!commentIdArray){
			return;
		}
		selector = selector || null;
		var numCommentIds = commentIdArray.length;
		for (var i = 0; i < numCommentIds; i++) {
			$.ajax({
				url: HN.util.getItemInfoUrlFromId(commentIdArray[i]),
				type: 'GET',
				dataType: 'json'
			})
			.done(function(commentInfo){
				displayComment(commentInfo, selector);
			})
			.fail(function() {
				console.log("Erro retrieving info about comment: " + commentIdArray[i]);
			});
			
		};

	}

	/**
	* displays comment
	* appendToSelector is a jquery selector string of where the comment should be appended to. 
	* Defaults to the main ol which specifies it is a top level comment
	*/
	function displayComment(commentInfo, appendToSelector){
		if(!commentInfo){
			return;
		}
		var topLevelComment = !appendToSelector;
		appendToSelector = appendToSelector || "#top_list";
		var comment = new HN.Comment(commentInfo);
		if(comment.isDeleted()){
			comment = getDeletedComment(commentInfo);
		}
		var commentHTML = "<li class='comment'>";
		if(topLevelComment){
			commentHTML += "<div class='container'>";
		}
		commentHTML += "<h6>" + comment.author() + "</h6><article";
		if(comment.isDeleted()){
			commentHTML += " class='deleted'";	
		}
		commentHTML += ">" + comment.text() + "</article>";
		
		if(comment.numChildren() > 0){
			commentHTML += "<ol id='" + commentIdToCSSId(comment.commentId()) + "'></ol>";
		}
		if(topLevelComment){
			commentHTML += "</div>";
		}
		commentHTML +=  "</li>";

		$(appendToSelector).append(commentHTML);
		displayAllCommentChildren(comment.children(), '#' + commentIdToCSSId(comment.commentId()));
	}

	function commentIdToCSSId(commentId){
		return 'comment' + commentId;
	}

	function getDeletedComment(commentInfo){
		commentInfo.by = '';
		commentInfo.text = '[deleted]'
		return new HN.Comment(commentInfo);
	}
};

