//initialize settings
HN.settings.initSettings();

var currentUrl = window.location.href;

if(HN.pageType === 'comments'){
	if(currentUrl.match(/ask\/comments\/?.*$/i)){
		var commentsType = 'ask';
	}
	else if(currentUrl.match(/show\/comments\/?.*$/i)){
		var commentsType = 'show';
	}
	else{
		var commentsType = 'general';
	}
	//add listener for if user clicks on comments link while on comments page
	window.addEventListener('hashchange', function(){HN.clearComments(); HN.displayComments(commentsType);}, false);
	HN.displayComments(commentsType);
}
else if(HN.pageType === 'settings'){
	HN.settings.initSettingsPage();
}
else{
	if(currentUrl.match(/ask\/?$/i)){
		var pageSettings = HN.pages.ask;
	}
	else if(currentUrl.match(/show\/?$/i)){
		var pageSettings = HN.pages.show;
	}
	else{
		var pageSettings = HN.pages.home;
	}
	HN.displayStories(pageSettings);
}