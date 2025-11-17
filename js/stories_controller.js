/**
 * used to display homepage, show and ask pages list of story links
 */
import { HNStory } from './story.js';
import { getJson, getItemUrl } from './ajax.js';

export function displayStories(pageSettings) {
    getJson(pageSettings.storiesUrl).then(storyIds => {
        getStoryInfo(pageSettings, storyIds);
    });
}

function getStoryInfo(pageSettings, storyIds) {
    const STORIES_PER_PAGE = 30;
    const storiesCount = Math.min(STORIES_PER_PAGE, storyIds.length);

    const storiesArray = new Array(storiesCount);
    const storiesListEl = document.getElementById('top_list');
    //to limit number of dom updates
    let domUpdateTimeout = null;

    for (let i = 0; i < storiesCount; i++) {
        const storyId = storyIds[i];
        const storyInfoUrl = getItemUrl(storyId);

        getStoryPromise(storyInfoUrl, pageSettings).then(storyHtml => {
            storiesArray[i] = storyHtml;
            //no error if null
            clearTimeout(domUpdateTimeout);
            domUpdateTimeout = setTimeout(() => {
                insertStoriesHtml(storiesArray, storiesListEl);
            }, 5);
        });
    }
}

function getStoryPromise(storyInfoUrl, pageSettings) {
    return getJson(storyInfoUrl).then(storyInfo => {
        return storyHtml(new HNStory(storyInfo), pageSettings);
    });
}

function storyHtml(story, pageSettings) {
    let html = `<li><div class="container">${story.titleHtml}`;
    const numComments = story.numComments;
    if (numComments > 0) {
        let commentsText = `${numComments} comment`;
        if (numComments > 1) {
            commentsText += 's';
        }
        html += `<a href="${story.commentsUrl(
            pageSettings.commentsUrl
        )}"><p>${commentsText}</p></a>`;
    }
    html = html + '</div></li>';
    return html;
}

function insertStoriesHtml(storiesArray, targetEl) {
    targetEl.innerHTML = storiesArray.filter(html => html).join('');
}
