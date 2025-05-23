<!DOCTYPE html>
<html lang="en">
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
                        <a href='<?= HOME_URL; ?>' class='brand nav-link-home'><?= PAGE_TITLE_DEFAULT; ?></a>
                        <ul class="page_links">
                            <li>
                                <a href='<?= SHOW_URL; ?>' class="nav-link-show">Show</a>
                            </li>
                            <li>
                                <a href='<?= ASK_URL; ?>' class="nav-link-ask">Ask</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            <noscript class='container center'><h3>H-News requires JavaScript in order to download stories and comments</h3></noscript>
            <?php
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
                <p class='small'><a href='https://github.com/allen-garvey/h-news'>Source on GitHub</a></p>
            </div>
        </footer>
         <script src="<?= SCRIPTS_URL.'app.js'; ?>" type="text/javascript"></script>
    </body>
</html>