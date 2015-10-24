//initialize settings
HN.settings.initSettings();

if(HN.pageType === 'comments'){
	HN.displayComments();
}
else if(HN.pageType === 'settings'){
	HN.settings.initSettingsPage();
}
else{
	HN.displayStories();
}