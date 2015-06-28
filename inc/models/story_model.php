<?php 
/**
* Class stores urls of story ids
*/
class HNewsStoriesModel{
	
	/**
	* returns ids of up to 500 new and top stories
	*/
	public static function topStoriesUrl(){
		return 'https://hacker-news.firebaseio.com/v0/topstories.json';
	}

	/**
	* returns ids of up to 200 new ask stories
	*/

	public static function askStoriesUrl(){
		return 'https://hacker-news.firebaseio.com/v0/askstories.json';
	}

	/**
	* returns ids of up to 200 new ask stories
	*/

	public static function showStoriesUrl(){
		return 'https://hacker-news.firebaseio.com/v0/showstories.json';
	}
}








