<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8"/>
        <title><?= PAGE_TITLE_DEFAULT; ?></title>
        <meta name="description" content="H News, a trimmed-down, mobile-friendly, read-only version of your favorite programming and start-up news site"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="stylesheet" type="text/css" href="<?= STYLES_URL.'style.css'; ?>"/>
    </head>
    <body>
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
                include(VIEWS_PATH.'settings_main_content.php');
                include(VIEWS_PATH.'page_main_content.php');   
             ?>
        </div>
        <footer>
            <div class='container'>
                <div class='footer-controls'>
                    <?php 
                        include(VIEWS_PATH.'footer_controls.php');
                     ?>
                 </div>
                <p class='small'>Not affiliated with Hacker News or Y Combinator.</p>
                <p class='small'>Designed and created by <a href='http://www.allengarvey.com'>Allen Garvey</a> using the Hacker News API.</p>
                <p class='small'>Released under the MIT License. <a href='https://github.com/allen-garvey/h-news'>Source on github</a></p>
            </div>
        </footer>
        <script type="text/javascript">
        var HN={};HN.settings = {};
        HN.settings.commentsUrl='<?= COMMENTS_QUERY_URL; ?>';
        HN.settings.themeNames=<?= json_encode(HNewsSettingsPageController::getThemeList()); ?>;
        HN.pages = {
            'home' : {
                storiesUrl: 'https://hacker-news.firebaseio.com/v0/topstories.json',
                shouldDisplayStory: function(story){if(story.type()==="job"){return false;} return true;},
                commentsUrl: '<?= COMMENTS_QUERY_URL; ?>',
                pageTitle: '<?= PAGE_TITLE_DEFAULT ?>',
                bodyTags: ['page_home']
            },
            'ask' : {
                storiesUrl: 'https://hacker-news.firebaseio.com/v0/askstories.json',
                shouldDisplayStory: function(story){return true;},
                commentsUrl: '<?= ASK_COMMENTS_QUERY_URL; ?>',
                pageTitle: '<?= PAGE_TITLE_DEFAULT ?> | Ask',
                bodyTags: ['page_ask']
            },
            'show': {
                storiesUrl: 'https://hacker-news.firebaseio.com/v0/showstories.json',
                shouldDisplayStory: function(story){return true;},
                commentsUrl: '<?= SHOW_COMMENTS_QUERY_URL; ?>',
                pageTitle: '<?= PAGE_TITLE_DEFAULT ?> | Show',
                bodyTags: ['page_show']
            },
            'settings' : {
                pageTitle: '<?= PAGE_TITLE_DEFAULT ?> | Settings',
                bodyTags: ['page_settings']
            },
            'comments' : {
                bodyTags: ['page_comments']
            }
        };
        HN.storiesPerPage = 30;
        <?php //used for settings page ?>
        HN.settings.userThemeFormName='<?= HNewsSettingsPageController::$userThemeFormName; ?>';
        HN.settings.themeIdPrefix='<?= HNewsSettingsPageController::$themeIdPrefix; ?>';
        <?php //used for story pages ?>
        HN.askUrl='<?= ASK_COMMENTS_QUERY_URL; ?>';
         </script>
         <?php if(ENVIRONMENT_CURRENT === ENVIRONMENT_DEVELOPMENT): ?>
            <script src="<?= SCRIPTS_URL.'app.js'; ?>" type="text/javascript"></script>
        <?php else: ?>
            <script src="<?= SCRIPTS_URL.'app.min.js'; ?>" type="text/javascript"></script>
        <?php endif; ?>
    </body>
</html>