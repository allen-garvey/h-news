/**
* used to story shared functions used in story and comments pages
*/

import APP_CONSTANTS from './app-constants.js';

/**
* Used for comment HTML text to smarten quotes
* takes html string and returns html string with dumb quotes replaced with smart quotes
* preserves dumbquotes in html attributes
*/
export function smartenQuotes(dumbString){
	return replaceSmartQuoteEntities(transformTextNodes(dumbString, (text)=>{
		return replaceDumbQuotes(text);
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
function transformTextNodes(element, textTransformFunc) {
    var elementType = typeof element;
    
    if(elementType === 'string'){
        var div = document.createElement('div');
        div.innerHTML = element;
        element = div;
    }
    try{
	    var walker = document.createTreeWalker(
	        element, 
	        NodeFilter.SHOW_TEXT, 
	        null, 
	        false
	    );
	}
	catch(e){
		console.log(e);
		return element;
	}

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
function replaceDumbQuotes(dumbString){
	var rightSingleSmartQuote = "&#8217;";
	var leftSingleSmartQuote = "&#8216;";
	var rightDoubleSmartQuote = "&#8221;";
	var leftDoubleSmartQuote = "&#8220;";
	var emDash = "&#8212;";
	var ellipsis = "&#8230;";
	return dumbString
			   		 .replace(/\b'|[\.?,-\/#!$%\^&\*;:{}<>=|\-_`~()\[\]]'/g, function(match, str, offset){return match.replace(/'/g, rightSingleSmartQuote);})
		       		 .replace(/'/g, leftSingleSmartQuote)
		       		 .replace(/\b"|[\.?,-\/#!$%\^&\*;:{}<>|=\-_`~()\[\]]"/g, function(match, str, offset){return match.replace(/"/g, rightDoubleSmartQuote);})
		       		 .replace(/"/g, leftDoubleSmartQuote)
		       		 .replace(/\D\s+-+\s*\D|\D\s*-+\s+\D|\s*--+\s*/g, function(match, str, offset){return match.replace(/\s*-+\s*/g, emDash);})
		       		 .replace(/\.\s?\.\s?\.\s?/g, ellipsis);
};

/**
* Required because the treeWalker automatically escapes ampersands
*/
function replaceSmartQuoteEntities(string){
	if(typeof string != 'string'){
		return string;
	}
	return string.replace(/&amp;#[\d]{4};/g, function(match, str, offset){
		return match.replace('&amp;', '&');
	});
};

/*
* Used for comments to change ycombinator links to hnews links
*/
export function rewriteHackerNewsLinks(){
	const ycombinatorLink = 'https://news.ycombinator.com/item?id=';
	document.querySelectorAll(`#top_list a[href^="${ycombinatorLink}"]`).forEach((link)=>{
		const hrefSplit = link.href.split(ycombinatorLink);
		//make sure it's a comment url
		if(hrefSplit.length !== 2){
			return;
		}
		const commentId = hrefSplit[1];
		//make sure comment id is number
		if(!commentId.match(/^[0-9]*$/)){
			return;
		}
		const hnewsUrl = APP_CONSTANTS.urls.comments + commentId;
		link.setAttribute('href', hnewsUrl);
		link.text = hnewsUrl;
	});
};
