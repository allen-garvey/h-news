/**
 * used to display comment and ask pages
 */

import { rewriteHackerNewsLinks } from './dom.js';
import { HNStory } from './story.js';
import { HNComment } from './comment.js';
import { getJson, getItemUrl } from './ajax.js';

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
        let titleClass = 'container';
        let text = story.text;
        let title = story.titleFragment;
        if (text) {
            const template =
                commentsHeaderContentTemplate.content.cloneNode(true);
            template.querySelector('[data-role="author"]').textContent =
                story.author;
            //TODO replace with setHTML() when supported
            template.querySelector('[data-role="content"]').innerHTML = text;
            text = template;
            if (
                commentsType === 'ask' ||
                story.title.match(/^(Ask|Tell) HN:/)
            ) {
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
        displayAllCommentChildren(story.topLevelCommentsIds);
    });
}

/**
 * displays comment children of an array of comment ids
 * if no cssId is given, assumes it is top level comment and creates appropriate jquery cssId object
 */
function displayAllCommentChildren(commentIdArray, cssId) {
    if (!commentIdArray) {
        return;
    }
    const isTopLevelComment = !cssId;
    const parentList = cssId
        ? document.getElementById(cssId)
        : document.getElementById('top_list');

    commentIdArray.forEach(commentId => {
        const commentUrl = getItemUrl(commentId);

        getJson(commentUrl).then(commentInfo => {
            displayComment(commentInfo, parentList, isTopLevelComment);
        });
    });

    //change hacker news links to hnews links
    //TODO fix this so it happens after all the promises complete
    rewriteHackerNewsLinks();
}

/**
 * displays comment
 * parentList is a dom object that the comment should be appended to
 * isTopLevelComment is used for styling purposes, since top level comments are styled different than child comments
 */
function displayComment(commentInfo, parentList, isTopLevelComment) {
    if (!commentInfo) {
        return;
    }
    const comment = new HNComment(commentInfo);
    if (comment.isDead) {
        return;
    }
    let commentHTML = "<li class='comment'>";
    if (isTopLevelComment) {
        commentHTML += "<div class='container'>";
    }
    commentHTML += `<h6>${comment.author}</h6><article`;
    if (comment.isDeleted) {
        commentHTML += ' class="deleted"';
    }
    commentHTML += `>${comment.text}</article>`;

    if (comment.numChildren > 0) {
        commentHTML += `<ol id="${commentIdToCSSId(comment.commentId)}"></ol>`;
    }
    if (isTopLevelComment) {
        commentHTML += '</div>';
    }
    commentHTML += '</li>';

    parentList.insertAdjacentHTML('beforeend', commentHTML);
    displayAllCommentChildren(
        comment.children,
        commentIdToCSSId(comment.commentId)
    );
}

/**
 * Returns the correct jquery id cssId for the parent ol to append comment to
 */
function commentIdToCSSId(commentId) {
    return `comment${commentId}`;
}
