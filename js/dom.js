/**
 * used to story shared functions used in story and comments pages
 */

/*
 * Used for comments to change ycombinator links to hnews links
 */
export function rewriteHackerNewsLinks() {
    const ycombinatorLink = 'https://news.ycombinator.com/item?id=';
    document
        .querySelectorAll(`#top_list a[href^="${ycombinatorLink}"]`)
        .forEach(link => {
            const hrefSplit = link.href.split(ycombinatorLink);
            //make sure it's a comment url
            if (hrefSplit.length !== 2) {
                return;
            }
            const commentId = hrefSplit[1];
            //make sure comment id is number
            if (!commentId.match(/^[0-9]*$/)) {
                return;
            }
            const hnewsUrl = '/comments/' + commentId;
            link.setAttribute('href', hnewsUrl);
            link.text = hnewsUrl;
        });
}
