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
                    <a href='<?= HOME_URL; ?>'><span class='brand <?php if($page_controller->getTitle()==='home'){echo 'current';} ?>'>H-News</span></a>
                    <ul>
                        <a href='<?= SHOW_URL; ?>'><li<?php if($page_controller->getTitle()==='show'){echo ' class="current"';} ?>>Show</li></a>
                        <a href='<?= ASK_URL; ?>'><li<?php if($page_controller->getTitle()==='ask'){echo ' class="current"';} ?>>Ask</li></a>
                    </ul>
                </nav>
            </div>
        </header>
        <main>
            <ol>
            </ol>
        </main>
        <footer>
            <div class='container'>
                <form method='GET' action='https://hn.algolia.com'>
                    <input type='search' name='query' placeholder='Search archives' /><input class='hide_for_sm' type='submit' value='search'/>
                </form>
                <a href='https://github.com/allen-garvey/h-news' class='hide_for_sm'><p>Source on github</p></a>
            </div>
        </footer>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js" type="text/javascript"></script>
        <script type="text/javascript">var HN={};HN.storiesUrl = '<?= $page_controller->getStoryIdsUrl(); ?>';
        HN.storiesPerPage = <?= $page_controller->getNumStoriesPerPage(); ?>;
        HN.shouldDisplayStory = <?= $page_controller->displayStoryFunction(); ?>;</script>
        <script src="<?= SCRIPTS_URL.'app.min.js'; ?>" type="text/javascript"></script>
    </body>
</html>