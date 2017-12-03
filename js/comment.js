/**
* Comment model
* Used to get process info about a comment such as kids and parent id
*/

HN.Comment = (function(){

	function HNComment(commentInfo){
		this.commentInfo = commentInfo;
	};
	HNComment.prototype.isDeleted = function(){
		return !!this.commentInfo['deleted'];
	};
	HNComment.prototype.isDead = function(){
		return !!this.commentInfo['dead'];	
	};
	HNComment.prototype.children = function(){
		return this.commentInfo['kids'];
	};
	HNComment.prototype.parentId = function(){
		return this.commentInfo['parent'];
	};
	HNComment.prototype.text = function(){
		return this.commentInfo['text'];
	};
	HNComment.prototype.author = function(){
		return this.commentInfo['by'];
	};
	HNComment.prototype.commentId = function(){
		return this.commentInfo['id'];
	};
	
	HNComment.prototype.numChildren = function(){
		if(!this.children()){
			return 0;
		}
		return this.children().length;
	};

	return HNComment;
})();