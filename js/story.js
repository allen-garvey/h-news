/**
 * Story model
 * Used to get process info about a story such as url, title, and type
 */

const storyTitleLinkTemplate = document.getElementById('story-title-link');

export class HNStory {
    constructor(storyInfo) {
        this.storyInfo = storyInfo;
    }

    get url() {
        //for ask or show HN stories
        if (this.isLocalHNUrl) {
            return `/ask/comments/${this.storyInfo.id}`;
        }
        return this.storyInfo.url;
    }

    get isLocalHNUrl() {
        if (!this.storyInfo.url) {
            return true;
        }
        return false;
    }

    /**
     * gets the url root domain for display with story
     * http://www.nytimes.com/story becomes (nytimes.com)
     */
    get urlRoot() {
        //for ask or show HN stories
        if (this.isLocalHNUrl) {
            return '';
        }
        const url = new URL(this.url);
        return `(${url.hostname.replace(/^www\./, '')})`;
    }

    get title() {
        return this.storyInfo.title || '';
    }

    get titleFragment() {
        const template = storyTitleLinkTemplate.content.cloneNode(true);
        template.querySelector('[data-role="title-link"]').href = this.url;
        template.querySelector('[data-role="title"]').textContent = this.title;
        template.querySelector('[data-role="title-source"]').textContent =
            this.urlRoot;

        return template;
    }

    /**
     * Used for ask pages to display without the link
     * It should have the same style as titleHtml()
     */
    get askTitle() {
        const el = document.createElement('h3');
        el.textContent = this.title;
        return el;
    }

    get text() {
        return this.storyInfo.text || '';
    }

    get author() {
        return this.storyInfo.by || '';
    }

    get storyType() {
        if (this.type !== 'story') {
            return false;
        }
        if (this.isLocalHNUrl) {
            if (this.title.substring(0, 3).toLowerCase() === 'ask') {
                return 'ask';
            }
            return 'show';
        }
        return 'story';
    }

    get type() {
        return this.storyInfo.type;
    }

    get numComments() {
        if (!this.storyInfo.descendants) {
            return 0;
        }
        return this.storyInfo.descendants;
    }

    get topLevelCommentsIds() {
        if (!this.storyInfo.kids) {
            return [];
        }
        return this.storyInfo.kids;
    }

    set children(children) {
        this.children = children;
    }

    commentsUrl(commentsUrl) {
        return commentsUrl + this.storyInfo.id;
    }
}
