/**
* used to story shared functions used in story and comments pages
*/
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
	return "<a href='" + story.url() +"'><h3>" + story.title() + "<span class='small url_source'> "+ story.urlRoot() + "</span></h3></a>";
};

/**
* Used for ask pages to display without the link
* Even though code only used on ask pages, is kept here because it should have the same style as getStoryTitleHTML()
*/
HN.util.getAskStoryTitle = function(story){
	return "<h3>" + story.title() + "</h3>";
};

/**
* Used for comment HTML text to smarten quotes
* takes html string and returns html string with dumb quotes replaced with smart quotes
* preserves dumbquotes in html attributes
*/
HN.util.smartenQuotesHTML = function(dumbString){
	return HN.util.replaceSmartQuoteEntities(HN.util.transformTextNodes(dumbString, function(text){
		return HN.util.replaceDumbQuotes(text);
	}));
};

/**
* Used to transform just the textNodes in html
* used for smarten quotes
* @element first argument is either the result of document.getElementById() 
* or a string of html such as 'text' or 'text <div>more text</div>' or '<div>text</div>'
* @textTransformFunc is a function used to transform the text nodes
* it should be of the format: function(text){return text.toUpperCase();} or however the text is to be transformed
* @returns either the transformed string if was originally a string or transformed element if was originally an element
*/
HN.util.transformTextNodes = function (element, textTransformFunc) {
    var elementType = typeof element;
    
    if(elementType === 'string'){
        var div = document.createElement('div');
        div.innerHTML = element;
        element = div;
    }

    var walker = document.createTreeWalker(
        element, 
        NodeFilter.SHOW_TEXT, 
        null, 
        false
    );

    var textNode;

    while(textNode = walker.nextNode()) {
        textNode.nodeValue = textTransformFunc(textNode.nodeValue);
    }
    if(elementType === 'string'){
        return element.innerHTML;
    }
    return element;
};

/**
* Used to replace dumb quotes in a text string
* uses a second replace in the function passed to replace to preserve the non word characters before the quote, such as spaces or parens
*/
HN.util.replaceDumbQuotes = function(dumbString){
	var rightSingleSmartQuote = "&#8217;";
	var leftSingleSmartQuote = "&#8216;";
	var rightDoubleSmartQuote = "&#8221;";
	var leftDoubleSmartQuote = "&#8220;";
	var emDash = "&#8212;";
	return dumbString
			   		 .replace(/^'|\b'/g, function(match, str, offset){return match.replace(/'/g, leftSingleSmartQuote);})
		       		 .replace(/'/g, rightSingleSmartQuote)
		       		 .replace(/^"|\b"/g, function(match, str, offset){return match.replace(/"/g, leftDoubleSmartQuote);})
		       		 .replace(/"/g, rightDoubleSmartQuote)
		       		 .replace(/\D\s*-+\s*\D|\s*[-]{2,}\s*/, function(match, str, offset){return match.replace(/\s*-+\s*/g, emDash);});
};

/**
* Required because the treeWalker automatically escapes ampersands
*/
HN.util.replaceSmartQuoteEntities = function(string){
	return string.replace(/&amp;#[\d]{4};/g, function(match, str, offset){
		return match.replace('&amp;', '&');
	});
};


