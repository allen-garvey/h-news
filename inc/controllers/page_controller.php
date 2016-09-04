<?php 

/**
* Constants for saved user settings
*/
class HNewsSettingsPageController{
	public static $userThemeFormName = "userTheme";
	public static $autoDarkModeFormName = "autoDark";
	public static $themeIdPrefix = "theme_";
	public static function getThemeList(){
		return ['default', 'dark', 'blue', 'green', 'purple', 'silver', 'red'];
	}

}