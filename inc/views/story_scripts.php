<script type="text/javascript">var HN={};HN.storiesUrl = '<?= $page_controller->getStoryIdsUrl(); ?>';
HN.pageType='<?= $page_controller->getControllerType(); ?>';
HN.storiesPerPage = <?= $page_controller->getNumStoriesPerPage(); ?>;
HN.shouldDisplayStory = <?= $page_controller->displayStoryFunction(); ?>;
HN.commentsUrl = '<?= $page_controller->getCommentsUrl(); ?>';</script>