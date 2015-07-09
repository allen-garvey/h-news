if(HN.pageType === 'comments'){
	HN.displayComments();
}
else if(HN.pageType === 'settings'){
	HN.initSettingsPage();
}
else{
	HN.displayStories();
}
//add fastclick
FastClick.attach(document.body);