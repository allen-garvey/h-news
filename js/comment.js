/**
* Comment model
* Used to get process info about a comment such as kids and parent id
*/

export class HNComment{
	constructor(commentInfo){
		this.commentInfo = commentInfo;
	}

	isDeleted(){
		return !!this.commentInfo['deleted'];
	};
	isDead(){
		return !!this.commentInfo['dead'];	
	};
	children(){
		return this.commentInfo['kids'];
	};
	parentId(){
		return this.commentInfo['parent'];
	};
	text(){
		return this.commentInfo['text'];
	};
	author(){
		return this.commentInfo['by'];
	};
	commentId(){
		return this.commentInfo['id'];
	};
	
	numChildren(){
		if(!this.children()){
			return 0;
		}
		return this.children().length;
	};
}