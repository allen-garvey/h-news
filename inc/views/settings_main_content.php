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
            <div class='form-group'>
                <input type="checkbox" id="auto_dark_mode" name="<?= HNewsSettingsPageController::$autoDarkModeFormName; ?>" <?php if($settings_controller->getShouldAutoDarkMode()){echo "checked='checked'";} ?> />
                <label for="auto_dark_mode" >Automatically switch to dark mode from 11pm to 6am</label>
            </div>
        </fieldset>
        <input class='btn btn-primary' type='submit' value='Save' />
        <p class='small'>By clicking the save button you are agreeing to accept cookies to save your preferences</p>
    </form>
</main>