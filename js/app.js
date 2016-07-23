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
	HN.displayStories();
}