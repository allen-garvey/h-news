const HACKER_NEWS_API_URL = 'https://hacker-news.firebaseio.com/v0';
const DEFAULT_PAGE_TITLE = 'H News';

export const routes = {
    'home' : {
        storiesUrl: `${HACKER_NEWS_API_URL}/topstories.json`,
        shouldDisplayStory: (story)=>{if(story.type==="job"){return false;} return true;},
        commentsUrl: '/comments/',
        pageTitle: `${DEFAULT_PAGE_TITLE}`,
        bodyTags: ['page_home']
    },
    'ask' : {
        storiesUrl: `${HACKER_NEWS_API_URL}/askstories.json`,
        shouldDisplayStory: (story)=>{return true;},
        commentsUrl: '/ask/comments/',
        pageTitle: `${DEFAULT_PAGE_TITLE} | Ask`,
        bodyTags: ['page_ask']
    },
    'show': {
        storiesUrl: `${HACKER_NEWS_API_URL}/showstories.json`,
        shouldDisplayStory: (story)=>{return true;},
        commentsUrl: '/show/comments/',
        pageTitle: `${DEFAULT_PAGE_TITLE} | Show`,
        bodyTags: ['page_show']
    },
    'settings' : {
        pageTitle: `${DEFAULT_PAGE_TITLE} | Settings`,
        bodyTags: ['page_settings']
    },
    'comments' : {
        bodyTags: ['page_comments']
    }
};