(function(){
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
		for(var i=0;i<HN.storiesPerPage;i++){
			var storyInfoUrl = getStoryInfoUrlFromId(storyIds[i]);
			if(storyInfoUrl){
				$.ajax({
					url: storyInfoUrl,
					type: 'GET',
					dataType: 'json'
				})
				.done(function(storyInfo) {
					var story = new HN.Story(storyInfo);
					console.log(story);
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
	/**
		* returns object of info about a story based on integer id
		* id		The item's unique id.
		* deleted	true if the item is deleted.
		* type		The type of item. One of "job", "story", "comment", "poll", or "pollopt".
		* by		The username of the item's author.
		* time		Creation date of the item, in Unix Time.
		* text		The comment, story or poll text. HTML.
		* dead		true if the item is dead.
		* parent	The item's parent. For comments, either another comment or the relevant story. For pollopts, the relevant poll.
		* kids		The ids of the item's comments, in ranked display order.
		* url		The URL of the story.
		* score		The story's score, or the votes for a pollopt.
		* title		The title of the story, poll or job.
		* parts		A list of related pollopts, in display order.
		* descendants	In the case of stories or polls, the total comment count.
		*/
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
		if(story.type() === 'job'){
			return false;
		}

		return true;
	}
})();
