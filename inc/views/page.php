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
                        <a href='<?= HOME_URL; ?>'><span class='brand nav-link-home'><?= PAGE_TITLE_DEFAULT; ?></span></a>
                        <ul class="page_links">
                            <li class="nav-link-show">
                                <a href='<?= SHOW_URL; ?>'>Show</a>
                            </li>
                            <li class="nav-link-ask">
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
        HN.settings.themeNames=<?= json_encode(HNewsSettingsPageController::getThemeList()); ?>;
        <?php //used for settings page ?>
        HN.settings.userThemeFormName='<?= HNewsSettingsPageController::$userThemeFormName; ?>';
        HN.settings.themeIdPrefix='<?= HNewsSettingsPageController::$themeIdPrefix; ?>';
         </script>
         <script src="<?= SCRIPTS_URL.'app.js'; ?>" type="text/javascript"></script>
    </body>
</html>