/**
* used to display homepage, show and ask pages list of story links
*/

import util from './util.js';
import APP_CONSTANTS from './app-constants.js';
import { HNStory } from './story.js';
import { getJson } from './ajax.js';

export function displayStories(pageSettings){
	getJson(pageSettings.storiesUrl).then((storyIds)=>{
		getStoryInfo(pageSettings, storyIds);
	});
};

function getStoryInfo(pageSettings, storyIds){
	const storyPromises = [];
	
	for(let i=0;i<APP_CONSTANTS.storiesPerPage;i++){
		const storyId = storyIds[i];
		const storyInfoUrl = util.getItemInfoUrlFromId(storyId);
		storyPromises.push(getStoryPromise(storyInfoUrl));
	}

	Promise.all(storyPromises).then((stories)=>{
		let storiesHtml = '';
		stories.forEach((story)=>{
			if(pageSettings.shouldDisplayStory(story)){
				storiesHtml += getStoryHTML(story, pageSettings);
			}
		});
		document.getElementById('top_list').insertAdjacentHTML('beforeend', storiesHtml);
	});
}


function getStoryPromise(storyInfoUrl){
	return getJson(storyInfoUrl).then((storyInfo)=>{
		return new HNStory(storyInfo);
	});
}

function getStoryHTML(story, pageSettings){
	let html = `<li><div class="container">${story.titleHtml}`;
	const numComments = story.numComments;
	if(numComments > 0){
		let commentsText = `${numComments} comment`;
		if(numComments > 1){
			commentsText += 's';
		}
		html += `<a href="${story.commentsUrl(pageSettings.commentsUrl)}"><p>${commentsText}</p></a>`;
	}
	html = html + "</div></li>";
	return html;
}
