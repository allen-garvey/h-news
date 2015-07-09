<!DOCTYPE html>
<html class='<?= $page_controller->getCurrentTheme(); ?>'>
    <head>
        <meta charset="utf-8"/>
        <title>H-News&mdash;Settings</title>
        <meta name="description" content="H News, a mobile friendly version of your favorite programming and start-up news site"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="stylesheet" type="text/css" href="<?= STYLES_URL.'style.css'; ?>"/>
    </head>
    <body>
        <div class='total'>
            <header class='jumbotron'>
                <div class='container'>
                    <nav>
                        <a href='<?= HOME_URL; ?>'><span class='brand'>H-News</span></a>
                        <ul>
                            <a href='<?= SHOW_URL; ?>'><li>Show</li></a>
                            <a href='<?= ASK_URL; ?>'><li>Ask</li></a>
                        </ul>
                    </nav>
                </div>
            </header>
            <main class='container'>
                <h1>Settings</h1>
                <form action='<?= HOME_URL; ?>' method='POST'>
                    <fieldset>
                        <legend>Theme</legend>
                        <?php 
                            $themes = $page_controller->getThemeList();
                            $current_theme = $page_controller->getCurrentTheme();
                            foreach ($themes as $theme):
                                $theme_id = $page_controller->getThemeIdPrefix().$theme;
                        ?>
                            <div class='form-group'>
                                <input type="radio" name="<?= HNewsSettingsPageController::$userThemeFormName; ?>" value="<?= $theme; ?>" id="<?= $theme_id; ?>" <?php if($theme === $current_theme){echo 'checked="checked"';} ?> />
                                <label for="<?= $theme_id; ?>"><?= ucwords($theme); ?></label>
                            </div>

                        <?php 
                            endforeach;
                        ?>
                    </fieldset>
                    <button type='submit'>Save</button>
                </form>
            </main>
        </div>
        <footer>
            <div class='container'>
                <p class='small'>Not affiliated with Hacker News or Y Combinator.</p>
                <p class='small'>Designed and created by <a href='http://www.allengarvey.com'>Allen Garvey</a> using the Hacker News API.</p>
                <p class='small'>Released under the MIT License. <a href='https://github.com/allen-garvey/h-news'>Source on github</a></p>
            </div>
        </footer>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js" type="text/javascript"></script>
        <?php include(VIEWS_PATH.'settings_scripts.php'); ?>
        <?php if(ENVIRONMENT_CURRENT === ENVIRONMENT_DEVELOPMENT): ?>
            <script src="<?= SCRIPTS_URL.'app.js'; ?>" type="text/javascript"></script>
        <?php else: ?>
            <script src="<?= SCRIPTS_URL.'app.min.js'; ?>" type="text/javascript"></script>
        <?php endif; ?>
    </body>
</html>