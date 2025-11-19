/**
 * used to display comment and ask pages
 */

import { rewriteHackerNewsLinks } from './dom.js';
import { HNStory } from './story.js';
import { getJson, getItemUrl, fetchCommentChain } from './ajax.js';

const commentsHeaderContentTemplate = document.getElementById(
    'comments-header-content'
);

export function displayComments(commentsType) {
    const storyIdMatch = window.location.pathname.match(/\d+\/?$/);
    if (!storyIdMatch) {
        console.log('No story id found');
        return;
    }
    //remove possible trailing slash
    const storyId = storyIdMatch[0].replace(/\/$/, '');
    const storyUrl = getItemUrl(storyId);

    getJson(storyUrl).then(storyInfo => {
        if (!storyInfo) {
            console.log('No info about the story returned');
            return;
        }
        const story = new HNStory(storyInfo);

        renderCommentHeader(story, commentsType);

        story.topLevelCommentsIds.map(id => fetchAndRenderCommentChain(id));
    });
}

function renderCommentHeader(story, commentsType) {
    let titleClass = 'container';
    let text = document.createTextNode(story.text);
    let title = story.titleFragment;
    if (story.text) {
        const template = commentsHeaderContentTemplate.content.cloneNode(true);
        template.querySelector('[data-role="author"]').textContent =
            story.author;
        //TODO replace with setHTML() when supported
        template.querySelector('[data-role="content"]').innerHTML = story.text;
        text = template;
        if (commentsType === 'ask' || story.title.match(/^(Ask|Tell) HN:/)) {
            titleClass += ' ask';
            title = story.askTitle;
        }
    }
    document.title = `${document.title} | ${story.title}`;
    const commentsEl = document.createElement('section');
    commentsEl.className = titleClass;
    commentsEl.appendChild(title);
    commentsEl.appendChild(text);
    const contentMain = document.getElementById('content_main');
    contentMain.insertBefore(commentsEl, contentMain.firstChild);
}

function fetchAndRenderCommentChain(id) {
    fetchCommentChain(id).then(comment => {
        document
            .getElementById('top_list')
            .appendChild(renderCommentChain(comment, true));
        rewriteHackerNewsLinks();
    });
}

function renderCommentChain(comment, isRoot) {
    const root = document.createElement('li');
    root.className = 'comment';
    let top = root;
    if (isRoot) {
        top = document.createElement('div');
        top.className = 'container';
        root.appendChild(top);
    }

    const authorEl = document.createElement('h6');
    authorEl.textContent = comment.author;
    top.appendChild(authorEl);

    const textEl = document.createElement('article');
    if (comment.isDeleted) {
        textEl.className = 'deleted';
    }
    // TODO replace to setHTML() when supported
    textEl.innerHTML = comment.text;
    top.appendChild(textEl);

    if (comment.childNodes.length) {
        const list = document.createElement('ol');
        for (let child of comment.childNodes) {
            list.appendChild(renderCommentChain(child, false));
        }
        top.appendChild(list);
    }

    return root;
}
