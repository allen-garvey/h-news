$.ajax({
	url: storiesUrl,
	type: 'GET',
	dataType: 'json'
})
.done(function(storyIds) {
	getStoryInfo(storyIds);

})
.fail(function() {
	console.log("Error retrieving story ids");
});

function getStoryInfo(storyIds){
	for(var i=0;i<storiesPerPage;i++){
		var storyInfoUrl = getStoryInfoUrlFromId(storyIds[i]);
		if(storyInfoUrl){
			$.ajax({
				url: storyInfoUrl,
				type: 'GET',
				dataType: 'json'
			})
			.done(function(storyInfo) {
				var story = new HNStory(storyInfo);
				if(shouldDisplayStory(story)){
					$('main ol').append(getStoryHTML(story));
				}
			})
			.fail(function() {
				console.log("failed to get info about story: " + story.id);
			});
		}
	}
}

function getStoryInfoUrlFromId(id){
	return 'https://hacker-news.firebaseio.com/v0/item/' + id + '.json';
}

function getStoryHTML(story){
	var html = "<li><div class='container'><a href='" + story.url() +"'><h4>" + story.title() + "<span class='small'> "+ story.urlRoot() +"</span></h4></a>";
	var num_comments = story.numComments();
	if(num_comments > 0){
		var comments_text = ' comment';
		if(num_comments > 1){
			comments_text = ' comments';
		}
		html = html + "<a href='" + story.commentsUrl() +"'><p>" + num_comments  + comments_text + "</p></a>";
	}
	html = html + "</div></li>";
	return html;
}

function shouldDisplayStory(story){
	var typesToHide = ['job'];
	for (var i = typesToHide.length - 1; i >= 0; i--) {
		if(typesToHide[i] === story.type()){
			return false;
		}
	};
	return true;
}
