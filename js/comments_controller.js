/**
* used to display comment and ask pages
*/

import util from './hn_util.js';
import { HNStory } from './story.js';
import { HNComment } from './comment.js';


// HN.clearComments = function(){
// 	document.getElementById('content_main').innerHTML = '';
// };

export function displayComments(commentsType){
	var storyId = window.location.href.match(/\d+\/?$/);
	if(storyId){
		//remove possible trailing slash
		storyId = storyId[0].replace(/\/$/, '');
		var storyUrl = 'https://hacker-news.firebaseio.com/v0/item/' + storyId + '.json';
	}
	else{
		console.log("No story id found");
		return;
	}
	util.getJSON(storyUrl, function(storyInfo){
			if(!storyInfo){
				console.log('No info about the story returned');
				return;
			}
			var story = new HNStory(storyInfo);
			var title_class = 'container'
			var text = story.text();
			var title = '';
			if(text){
				text = "<h6>" + story.author() + "</h6><article>" + util.smartenQuotesHTML(story.text())  + "</article>";
				if(commentsType === 'ask' || story.title().match(/^(Ask|Tell) HN:/)){
					title_class += ' ask';
					title = util.getAskStoryTitle(story);
				}
			}
			else{
				title = util.getStoryTitleHTML(story)
			}
			document.title = document.title + " | " + story.title();
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
		var parentList = cssId ? document.getElementById(cssId) : document.getElementById('top_list');
		var numCommentIds = commentIdArray.length;
		
		commentIdArray.forEach(function(commentId){
			util.getJSON(util.getItemInfoUrlFromId(commentId), function(commentInfo){
					displayComment(commentInfo, parentList, isTopLevelComment);
				},
				function(){console.log("Error retrieving info about comment: " + commentId);}
			);
			
		});
		
		//change hacker news links to hnews links
		util.redirectLinks();

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
		var comment = new HNComment(commentInfo);
		if(comment.isDead()){
			return;
		}
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
		commentHTML += ">" + util.smartenQuotesHTML(comment.text()) + "</article>";
		
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
		return new HNComment(commentInfo);
	}
};

