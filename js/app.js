if(HN.pageType === 'comments'){
	HN.displayComments();
}
else if(HN.pageType === 'settings'){
	HN.settings.initSettingsPage();
}
else{
	HN.displayStories();
}
//add fastclick
FastClick.attach(document.body);

//initialize settings
HN.settings.initSettings();