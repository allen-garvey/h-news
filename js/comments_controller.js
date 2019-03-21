/**
* used to display comment and ask pages
*/

import util from './util.js';
import { HNStory } from './story.js';
import { HNComment } from './comment.js';

export function displayComments(commentsType){
	const storyIdMatch = window.location.pathname.match(/\d+\/?$/);
	if(!storyIdMatch){
		console.log('No story id found');
		return;
	}
	//remove possible trailing slash
	const storyId = storyIdMatch[0].replace(/\/$/, '');
	const storyUrl = `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`;

	util.getJSON(storyUrl, function(storyInfo){
			if(!storyInfo){
				console.log('No info about the story returned');
				return;
			}
			const story = new HNStory(storyInfo);
			let titleClass = 'container'
			let text = story.text;
			let title = '';
			if(text){
				text = `<h6>${story.author}</h6><article>${util.smartenQuotesHTML(story.text)}</article>`;
				if(commentsType === 'ask' || story.title.match(/^(Ask|Tell) HN:/)){
					titleClass += ' ask';
					title = story.askTitle;
				}
			}
			else{
				title = story.titleHtml;
			}
			document.title =`${document.title} | ${story.title}`;
			document.getElementById('content_main').insertAdjacentHTML('afterbegin', `<section class="${titleClass}">${title}${text}</section>`);
			displayAllCommentChildren(story.topLevelCommentsIds);	
		},

		function(){console.log('Error retrieving comments');}
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
		if(comment.isDead){
			return;
		}
		var commentHTML = "<li class='comment'>";
		if(isTopLevelComment){
			commentHTML += "<div class='container'>";
		}
		commentHTML += "<h6>" + comment.author + "</h6><article";
		if(comment.isDeleted){
			commentHTML += " class='deleted'";	
		}
		commentHTML += ">" + util.smartenQuotesHTML(comment.text) + "</article>";
		
		if(comment.numChildren > 0){
			commentHTML += "<ol id='" + commentIdToCSSId(comment.commentId) + "'></ol>";
		}
		if(isTopLevelComment){
			commentHTML += "</div>";
		}
		commentHTML +=  "</li>";

		parent_list.insertAdjacentHTML('beforeend', commentHTML);
		displayAllCommentChildren(comment.children, commentIdToCSSId(comment.commentId));
	}
	
	/**
	* Returns the correct jquery id cssId for the parent ol to append comment to
	*/
	function commentIdToCSSId(commentId){
		return `comment${commentId}`;
	}
};

