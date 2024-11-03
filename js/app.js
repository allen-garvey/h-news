/*
 * Routes and app initialization
 */
import { routes } from './routes.js';
import { displayStories } from './stories_controller.js';
import { displayComments } from './comments_controller.js';
import { initSettingsPage } from './settings.js';

import css from '../sass/style.scss';

//setup page based on routing
function initPage(pageSettings) {
    if (pageSettings.pageTitle) {
        document.title = pageSettings.pageTitle;
    }
    if (pageSettings.bodyTags) {
        document.body.className += ' ' + pageSettings.bodyTags.join(' ');
    }
}

const currentUrl = window.location.href;

//Comments Route
if (currentUrl.match(/\/comments\/?.*$/i)) {
    const pageSettings = routes.comments;
    if (currentUrl.match(/ask\/comments\/?.*$/i)) {
        var commentsType = 'ask';
        pageSettings.bodyTags.push('nav_ask');
    } else if (currentUrl.match(/show\/comments\/?.*$/i)) {
        var commentsType = 'show';
        pageSettings.bodyTags.push('nav_show');
    } else {
        var commentsType = 'general';
        pageSettings.bodyTags.push('nav_home');
    }
    initPage(pageSettings);
    displayComments(commentsType);
}
//settings route
else if (currentUrl.match(/\/settings\/?$/i)) {
    const pageSettings = routes.settings;
    initPage(pageSettings);
    initSettingsPage();
}
//Main category page routes - Home page, show and ask main pages
//Home page also acts as 404, since unknown routes will end up there
else {
    let pageSettings = routes.home;
    if (currentUrl.match(/ask\/?$/i)) {
        pageSettings = routes.ask;
    } else if (currentUrl.match(/show\/?$/i)) {
        pageSettings = routes.show;
    }
    initPage(pageSettings);
    displayStories(pageSettings);
}
