/**
* used to display homepage, show and ask pages list of story links
*/

import util from './util.js';
import APP_CONSTANTS from './app-constants.js';
import { HNStory } from './story.js';

export function displayStories(pageSettings){
	util.getJSON(pageSettings.storiesUrl, function(storyIds){getStoryInfo(storyIds);}, function(){console.log("Error retrieving story ids");});

	function getStoryInfo(storyIds){
		var top_list = document.getElementById('top_list');
		for(let i=0;i<APP_CONSTANTS.storiesPerPage;i++){
			const storyId = storyIds[i];
			const storyInfoUrl = util.getItemInfoUrlFromId(storyId);
			if(storyInfoUrl){
				util.getJSON(storyInfoUrl, function(storyInfo){
								if(!storyInfo){
									console.log('Story info is: ' + storyInfo + ' for story id: ' + storyId);
									return;
								}
								const story = new HNStory(storyInfo);
								if(pageSettings.shouldDisplayStory(story)){
									top_list.insertAdjacentHTML('beforeend', getStoryHTML(story, pageSettings));
								}	
					}, 
					function(){console.log("failed to get info about story: " + storyId);}
				);
			}
		}
	}

	function getStoryHTML(story, pageSettings){
		let html = "<li><div class='container'>" + util.getStoryTitleHTML(story);
		const num_comments = story.numComments;
		if(num_comments > 0){
			let comments_text = ' comment';
			if(num_comments > 1){
				comments_text = ' comments';
			}
			html = html + "<a href='" + story.commentsUrl(pageSettings.commentsUrl) +"'><p>" + num_comments  + comments_text + "</p></a>";
		}
		html = html + "</div></li>";
		return html;
	}
};
