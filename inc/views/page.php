<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8"/>
        <title><?= $page_controller->getPageTitle(); ?></title>
        <meta name="description" content="H News, a trimmed-down, mobile-friendly, read-only version of your favorite programming and start-up news site"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="stylesheet" type="text/css" href="<?= STYLES_URL.'style.css'; ?>"/>
    </head>
    <body class='<?= $page_controller->getBodyTags(); ?>'>
        <div class='total'>
            <header class='jumbotron'>
                <div class='container'>
                    <nav>
                        <a href='<?= HOME_URL; ?>'><span class='brand <?php if($page_controller->getTitle()==='home'){echo 'current';} ?>'><?= PAGE_TITLE_DEFAULT; ?></span></a>
                        <ul class="page_links">
                            <li<?php if($page_controller->getTitle()==='show'){echo ' class="current"';} ?>>
                                <a href='<?= SHOW_URL; ?>'>Show</a>
                            </li>
                            <li<?php if($page_controller->getTitle()==='ask'){echo ' class="current"';} ?>>
                                <a href='<?= ASK_URL; ?>'>Ask</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            <noscript class='container center'><h3>H-News requires JavaScript in order to download stories and comments</h3></noscript>
            <?php 
                if ($page_controller->getControllerType() === 'settings') {
                    include(VIEWS_PATH.'settings_main_content.php');
                }
                else{
                    include(VIEWS_PATH.'page_main_content.php');   
                }
             ?>
        </div>
        <footer>
            <div class='container'>
                <?php 
                    if($page_controller->getControllerType() !== 'settings'){
                        include(VIEWS_PATH.'footer_controls.php');
                    }
                 ?>
                <p class='small'>Not affiliated with Hacker News or Y Combinator.</p>
                <p class='small'>Designed and created by <a href='http://www.allengarvey.com'>Allen Garvey</a> using the Hacker News API.</p>
                <p class='small'>Released under the MIT License. <a href='https://github.com/allen-garvey/h-news'>Source on github</a></p>
            </div>
        </footer>
        <script type="text/javascript">
        var HN={};HN.pageType='<?= $page_controller->getControllerType(); ?>';HN.settings = {};
        HN.settings.commentsUrl='<?= COMMENTS_QUERY_URL; ?>';
        HN.settings.themeNames=<?= json_encode(HNewsSettingsPageController::getThemeList()); ?>;
        <?php 
            if($page_controller->getControllerType() === 'comments'){
                include(VIEWS_PATH.'comments_scripts.php');
            }
            else if($page_controller->getControllerType() === 'settings'){
                include(VIEWS_PATH.'settings_scripts.php');
            }
            else{
                include(VIEWS_PATH.'story_scripts.php');
            }
         ?>
         </script>
         <?php if(ENVIRONMENT_CURRENT === ENVIRONMENT_DEVELOPMENT): ?>
            <script src="<?= SCRIPTS_URL.'app.js'; ?>" type="text/javascript"></script>
        <?php else: ?>
            <script src="<?= SCRIPTS_URL.'app.min.js'; ?>" type="text/javascript"></script>
        <?php endif; ?>
    </body>
</html>