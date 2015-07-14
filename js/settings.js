HN.settings.initSettingsPage = function(){
	HN.settings.themeNames.map(function(theme) {
		$('#'+HN.settings.themeIdPrefix + theme).on('click', function() {
			$('html').removeClass().addClass(theme);
		});
	});
};

HN.settings.initSettings = function(){
	if(HN.settings.shouldAutoDarkMode){
		HN.settings.darkAtNight();
	}
}

HN.settings.darkAtNight = function(){
	var currentDate = new Date();
	var currentHour = currentDate.getHours();
	if(currentHour >= 23 || currentHour < 6){
		$('html').removeClass().addClass('dark');
	}
}

/*
* Used for comments to change ycombinator links to hnews links
*/
HN.settings.redirectLinks = function(){
	var ycombinatorLink = 'https://news.ycombinator.com/item?id=';
	$("#top_list a[href^='" + ycombinatorLink + "']").each(function() {
		var link = $(this);
		var hrefSplit = link.attr('href').split(ycombinatorLink);
		//make sure it's a comment url
		if(hrefSplit.length !== 2){
			return;
		}
		var commentId = hrefSplit[1];
		//make sure comment id is number
		if(!commentId.match(/^[0-9]*$/)){
			return;
		}
		var hnewsUrl = HN.settings.commentsUrl + commentId;
		link.attr('href', hnewsUrl);
		link.text(hnewsUrl);
	});
}