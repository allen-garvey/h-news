if(HN.pageType === 'comments'){
	HN.displayComments();
}
else{
	HN.displayStories();
}
//add fastclick
FastClick.attach(document.body);