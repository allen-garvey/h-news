<?php 
    $i = 0;
    foreach ($story_ids as $story_id):
        $storyInfo = HNewsStoriesModel::getStoryInfoById($story_id); 
        if(empty($storyInfo)){
            continue;
        }
        $story = new HNewsStoryController($storyInfo);
        if(!$page_controller->shouldDisplayStory($story)){
            continue;
        }
?>
<li>
    <div class='container'>
        <a href='<?= $story->getUrl(); ?>'><h4><?= $story->getTitle(); ?> <span class='small'><?= $story->getUrlRoot(); ?></span><h4></a>
        <?php if($story->getNumComments() > 0): ?>
            <a href='<?= $story->getCommentsUrl(); ?>'><p><?= $story->getNumComments(); ?> comment<?php if($story->getNumComments() > 1){echo 's';} ?></p></a>
        <?php endif; ?>
    </div>
</li>

<?php
    $i++;
    if($i >= $page_controller->getNumStoriesPerPage()){
        break;
    }
    endforeach;
?> 