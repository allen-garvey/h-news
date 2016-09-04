HN.storiesUrl = '<?= $page_controller->getStoryIdsUrl(); ?>';
HN.shouldDisplayStory = <?= $page_controller->displayStoryFunction(); ?>;
HN.commentsUrl = '<?= $page_controller->getCommentsUrl(); ?>';
HN.pageName='<?= $page_controller->getTitle(); ?>';HN.askUrl='<?= ASK_COMMENTS_QUERY_URL; ?>';