/**
* used to display homepage, show and ask pages list of story links
*/
HN.displayStories = function(){
	$.ajax({
		url: HN.storiesUrl,
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
		var $top_list = $('#top_list');
		for(var i=0;i<HN.storiesPerPage;i++){
			var storyInfoUrl = HN.util.getItemInfoUrlFromId(storyIds[i]);
			if(storyInfoUrl){
				$.ajax({
					url: storyInfoUrl,
					type: 'GET',
					dataType: 'json'
				})
				.done(function(storyInfo) {
					if(!storyInfo){
						console.log('Story info is: ' + storyInfo + ' for story id: ' + storyIds[i]);
						return;
					}
					var story = new HN.Story(storyInfo);
					// console.log(story);
					if(HN.shouldDisplayStory(story)){
						$top_list.append(getStoryHTML(story));
					}
				})
				.fail(function() {
					console.log("failed to get info about story: " + story.id);
				});
			}
		}
	}

	function getStoryHTML(story){
		var html = "<li><div class='container'>" + HN.util.getStoryTitleHTML(story);
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
};
