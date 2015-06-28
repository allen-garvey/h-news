<?php 
/**
* Class downloads post ids and info from ids
*/
class HNewsStoriesModel{
	
	/**
	* returns ids of up to 500 new and top stories
	*/
	public static function topStories(){
		return json_decode(file_get_contents('https://hacker-news.firebaseio.com/v0/topstories.json'), true);
	}

	/**
	* returns ids of up to 200 new ask stories
	*/
	public static function askStories(){
		return json_decode(file_get_contents('https://hacker-news.firebaseio.com/v0/askstories.json'), true);
	}

	/**
	* returns ids of up to 200 new ask stories
	*/
	public static function showStories(){
		return json_decode(file_get_contents('https://hacker-news.firebaseio.com/v0/showstories.json'), true);
	}

	/**
	* returns associative array of info about a story based on integer id
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
	public static function getStoryInfoById($storyId){
		return json_decode(file_get_contents("https://hacker-news.firebaseio.com/v0/item/{$storyId}.json"), true);
	}
}








