<?php 
define('ENVIRONMENT_DEVELOPMENT', 0);
define('ENVIRONMENT_PRODUCTION', 1);
define('ENVIRONMENT_CURRENT', ENVIRONMENT_DEVELOPMENT);

if(ENVIRONMENT_CURRENT === ENVIRONMENT_DEVELOPMENT){
	define('BASE_URL','/h-news/');
	define('ROOT_PATH',$_SERVER['DOCUMENT_ROOT'] . '/h-news/');
}

define('INC_PATH', ROOT_PATH.'inc/');
define('VIEWS_PATH', INC_PATH.'views/');
define('CONTROLLERS_PATH', INC_PATH.'controllers/');
define('MODELS_PATH', INC_PATH.'models/');

define('STYLES_URL', BASE_URL.'styles/');
define('SCRIPTS_URL', BASE_URL.'scripts/');

define('HOME_URL', BASE_URL.'index.php');
define('SHOW_URL', HOME_URL.'show/');
define('ASK_URL', BASE_URL.'ask/');

