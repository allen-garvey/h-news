//initialize settings
HN.settings.initSettings();

if(HN.pageType === 'comments'){
	//add listener for if user clicks on comments link while on comments page
	window.addEventListener('hashchange', function(){HN.clearComments(); HN.displayComments();}, false);
	HN.displayComments();
}
else if(HN.pageType === 'settings'){
	HN.settings.initSettingsPage();
}
else{
	var currentUrl = window.location.href;
	if(currentUrl.match(/ask\/?$/)){
		var pageSettings = HN.page.ask;
	}
	else if(currentUrl.match(/show\/?$/)){
		var pageSettings = HN.page.show;
	}
	else{
		var pageSettings = HN.page.home;
	}
	HN.displayStories(pageSettings);
}