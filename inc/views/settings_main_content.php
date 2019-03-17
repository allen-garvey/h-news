<main class='container main settings-main'>
    <h1>Settings</h1>
    <form action='<?= HOME_URL; ?>' method='POST'>
        <fieldset>
            <legend>Theme</legend>
            <?php 
                $themes = HNewsSettingsPageController::getThemeList();
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
                <label for="autodark_checkbox" >Automatically switch to dark mode from 9pm to 5am</label>
            </div>
        </fieldset>
        <input class='btn btn-primary' type='button' id='settings_save_button' value='Save' />
    </form>
</main>