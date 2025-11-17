/**
 * used to display homepage, show and ask pages list of story links
 */
import { HNStory } from './story.js';
import { getJson, getItemUrl } from './ajax.js';

const storyTemplate = document.getElementById('story-item');

export function displayStories(pageSettings) {
    getJson(pageSettings.storiesUrl).then(storyIds => {
        getStoryInfo(pageSettings, storyIds);
    });
}

function getStoryInfo(pageSettings, storyIds) {
    const STORIES_PER_PAGE = 30;
    const storiesCount = Math.min(STORIES_PER_PAGE, storyIds.length);
    const storiesListEl = document.getElementById('top_list');
    //to limit number of dom updates
    let domUpdateTimeout = null;
    let fragment = document.createDocumentFragment();

    for (let i = 0; i < storiesCount; i++) {
        const storyId = storyIds[i];
        const storyInfoUrl = getItemUrl(storyId);

        getJson(storyInfoUrl).then(storyInfo => {
            const storyTemplateEl = getStoryTemplate(
                new HNStory(storyInfo),
                pageSettings
            );
            clearTimeout(domUpdateTimeout);
            fragment.appendChild(storyTemplateEl);
            domUpdateTimeout = setTimeout(() => {
                storiesListEl.appendChild(fragment);
                fragment = document.createDocumentFragment();
            }, 5);
        });
    }
}

function getStoryTemplate(story, pageSettings) {
    const numComments = story.numComments;
    let commentsText = '';
    if (numComments > 0) {
        commentsText = `${numComments} comment`;
        if (numComments > 1) {
            commentsText += 's';
        }
    }

    const template = storyTemplate.content.cloneNode(true);
    template.querySelector('[data-role="title-link"]').href = story.url;
    template.querySelector('[data-role="title"]').textContent = story.title;
    template.querySelector('[data-role="title-source"]').textContent =
        story.urlRoot;
    template.querySelector('[data-role="comments-link"]').href =
        story.commentsUrl(pageSettings.commentsUrl);
    template.querySelector('[data-role="comments-text"]').textContent =
        commentsText;

    return template;
}
