/**
 * Comment model
 * Used to get process info about a comment such as kids and parent id
 */

export class HNComment {
    constructor(commentInfo) {
        this.commentInfo = commentInfo;

        if (this.isDeleted) {
            this.commentInfo.by = '';
            this.commentInfo.text = '[deleted]';
        }
    }

    get isDeleted() {
        return !!this.commentInfo['deleted'];
    }
    get isDead() {
        return !!this.commentInfo['dead'];
    }
    get children() {
        return this.commentInfo['kids'] || [];
    }
    get parentId() {
        return this.commentInfo['parent'];
    }
    get text() {
        return this.commentInfo['text'];
    }
    get author() {
        return this.commentInfo['by'];
    }
    get commentId() {
        return this.commentInfo['id'];
    }

    get numChildren() {
        if (!this.children) {
            return 0;
        }
        return this.children.length;
    }

    get childNodes() {
        return this._childNodes || [];
    }

    set childNodes(childNodes) {
        this._childNodes = childNodes;
    }
}
