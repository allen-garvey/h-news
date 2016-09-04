//initialize settings
HN.settings.initSettings();

var currentUrl = window.location.href;

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
else if(currentUrl.match(/\/settings\/?$/i)){
	HN.settings.initSettingsPage();
}
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