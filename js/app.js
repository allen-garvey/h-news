/*
 * Routes and app initialization
 */
(function(){
	//initialize settings based on saved settings in localStorage
	HN.settings.initSettings();

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
		//add listener for if user clicks on comments link while on comments page
		window.addEventListener('hashchange', function(){HN.clearComments(); HN.displayComments(commentsType);}, false);
		HN.displayComments(commentsType);
	}
	//settings route
	else if(currentUrl.match(/\/settings\/?$/i)){
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
		HN.displayStories(pageSettings);
	}

})();