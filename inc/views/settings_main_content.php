<main class='container main'>
    <h1>Settings</h1>
    <form action='<?= HOME_URL; ?>' method='POST'>
        <fieldset>
            <legend>Theme</legend>
            <?php 
                $themes = $page_controller->getThemeList();
                foreach ($themes as $theme):
                    $theme_id = HNewsSettingsPageController::$themeIdPrefix.$theme;
            ?>
                <div class='form-group'>
                    <input type="radio" name="<?= HNewsSettingsPageController::$userThemeFormName; ?>" value="<?= $theme; ?>" id="<?= $theme_id; ?>" />
                    <label for="<?= $theme_id; ?>"><?= ucwords($theme); ?></label>
                </div>

            <?php 
                endforeach;
            ?>
            <div class='form-group'>
                <input id='autodark_checkbox' type="checkbox" name="<?= HNewsSettingsPageController::$autoDarkModeFormName; ?>" />
                <label for="autodark_checkbox" >Automatically switch to dark mode from 10pm to 6am</label>
            </div>
        </fieldset>
        <input class='btn btn-primary' type='button' onclick="HN.settings.save()" value='Save' />
    </form>
</main>