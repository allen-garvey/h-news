/*
 * Routes and app initialization
 */
(function(){
	//initialize settings based on saved settings in localStorage
	HN.settings.initSettings();

	//setup page based on routing
	function initPage(pageSettings){
		if(pageSettings.pageTitle){
			document.title = pageSettings.pageTitle;
		}
		if(pageSettings.bodyTags){
			document.body.className += (' ' + pageSettings.bodyTags.join(' '));
		}
	}


	var currentUrl = window.location.href;

	//Comments Route
	if(currentUrl.match(/\/comments\/?.*$/i)){
		var commentsType = 'general';
		if(currentUrl.match(/ask\/comments\/?.*$/i)){
			commentsType = 'ask';
		}
		else if(currentUrl.match(/show\/comments\/?.*$/i)){
			commentsType = 'show';
		}
		var pageSettings = HN.pages.comments;
		initPage(pageSettings);
		HN.displayComments(commentsType);
	}
	//settings route
	else if(currentUrl.match(/\/settings\/?$/i)){
		var pageSettings = HN.pages.settings;
		initPage(pageSettings);
		HN.settings.initSettingsPage();
	}
	//Main category page routes - Home page, show and ask main pages
	//Home page also acts as 404, since unknown routes will end up there
	else{
		var pageSettings = HN.pages.home;
		if(currentUrl.match(/ask\/?$/i)){
			pageSettings = HN.pages.ask;
		}
		else if(currentUrl.match(/show\/?$/i)){
			pageSettings = HN.pages.show;
		}
		initPage(pageSettings);
		HN.displayStories(pageSettings);
	}

})();