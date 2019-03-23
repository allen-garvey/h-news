/**
* used to display comment and ask pages
*/

import util from './util.js';
import { HNStory } from './story.js';
import { HNComment } from './comment.js';
import { getJson } from './ajax.js';

export function displayComments(commentsType){
	const storyIdMatch = window.location.pathname.match(/\d+\/?$/);
	if(!storyIdMatch){
		console.log('No story id found');
		return;
	}
	//remove possible trailing slash
	const storyId = storyIdMatch[0].replace(/\/$/, '');
	const storyUrl = `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`;

	getJson(storyUrl).then((storyInfo)=>{
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
	});
};

/**
* displays comment children of an array of comment ids
* if no cssId is given, assumes it is top level comment and creates appropriate jquery cssId object
*/
function displayAllCommentChildren(commentIdArray, cssId){
	if(!commentIdArray){
		return;
	}
	const isTopLevelComment = !cssId;
	const parentList = cssId ? document.getElementById(cssId) : document.getElementById('top_list');
	
	commentIdArray.forEach((commentId)=>{
		const commentUrl = util.getItemInfoUrlFromId(commentId);
		
		getJson(commentUrl).then((commentInfo)=>{
			displayComment(commentInfo, parentList, isTopLevelComment);
		});
	});
	
	//change hacker news links to hnews links
	util.redirectLinks();

}

/**
* displays comment
* parentList is a dom object that the comment should be appended to
* isTopLevelComment is used for styling purposes, since top level comments are styled different than child comments
*/
function displayComment(commentInfo, parentList, isTopLevelComment){
	if(!commentInfo){
		return;
	}
	const comment = new HNComment(commentInfo);
	if(comment.isDead){
		return;
	}
	let commentHTML = "<li class='comment'>";
	if(isTopLevelComment){
		commentHTML += "<div class='container'>";
	}
	commentHTML += `<h6>${comment.author}</h6><article`;
	if(comment.isDeleted){
		commentHTML += ' class="deleted"';	
	}
	commentHTML += `>${util.smartenQuotesHTML(comment.text)}</article>`;
	
	if(comment.numChildren > 0){
		commentHTML += `<ol id="${commentIdToCSSId(comment.commentId)}"></ol>`;
	}
	if(isTopLevelComment){
		commentHTML += '</div>';
	}
	commentHTML +=  '</li>';

	parentList.insertAdjacentHTML('beforeend', commentHTML);
	displayAllCommentChildren(comment.children, commentIdToCSSId(comment.commentId));
}

/**
* Returns the correct jquery id cssId for the parent ol to append comment to
*/
function commentIdToCSSId(commentId){
	return `comment${commentId}`;
}

