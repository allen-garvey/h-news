HN.util = {};
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
HN.util.getItemInfoUrlFromId = function(id){
		return 'https://hacker-news.firebaseio.com/v0/item/' + id + '.json';
	};
/**
* Takes HN.Story object as a parameter and returns the html to display the title and link
*/
HN.util.getStoryTitleHTML = function(story){
	return "<a href='" + story.url() +"'><h4>" + story.title() + "<span class='small'> "+ story.urlRoot() +"</span></h4></a>";
}