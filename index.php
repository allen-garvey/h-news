<?php 
require_once('inc/config.php');
require_once(MODELS_PATH.'story_model.php');
require_once(CONTROLLERS_PATH.'page_controller.php');

if($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST[HNewsSettingsPageController::$userThemeFormName])){
	$settings_controller = new HNewsSettingsPageController;
	$settings_controller->saveUserTheme($_POST[HNewsSettingsPageController::$userThemeFormName]);
}

if(isset($_GET['comments'])) {
	$comments_for = isset($_GET['page']) ? $_GET['page'] : null;
	$page_controller = new HNewsCommentsPageController((int) $_GET['comments'], $comments_for);
}
else if(isset($_GET['page'])){
	if($_GET['page'] == 'settings'){
		$page_controller = new HNewsSettingsPageController;
	}
	elseif($_GET['page'] == 'ask'){
		$page_controller = new HNewsAskPageController;
	}
	elseif($_GET['page'] == 'show'){
		$page_controller = new HNewsShowPageController;
	}
}

if(!isset($settings_controller)){
	$settings_controller = new HNewsSettingsPageController;
}

if(!isset($page_controller)){
	$page_controller = new HNewsHomePageController;
}

include(VIEWS_PATH.'page.php');






