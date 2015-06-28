<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8"/>
        <title>H-News</title>
        <meta name="description" content="H News, a mobile friendly version of your favorite programming news site"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="stylesheet" type="text/css" href="<?= STYLES_URL.'style.css'; ?>"/>
        <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->
    </head>
    <body>
        <header class='jumbotron'>
            <div class='container'>
                <nav>
                    <a class='brand' href='<?= HOME_URL; ?>'>H-News</a>
                    <ul>
                        <li><a href='<?= SHOW_URL; ?>'>Show</a></li>
                        <li><a href='<?= ASK_URL; ?>'>Ask</a></li>
                    </ul>
                </nav>
            </div>
        </header>
        <main>
            <ol>
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
            </ol>
        </main>
        <footer>
            <div class='container'>
                <form method='GET' action='https://hn.algolia.com'>
                    <input type='search' name='query' placeholder='Search archives' /><input type='submit' value='search'/>
                </form>
                <a href='https://github.com/allen-garvey/h-news'><p>Source on github</p></a>
            </div>
        </footer>
    </body>
</html>