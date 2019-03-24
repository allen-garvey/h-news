<?php 

define('ROOT_PATH', dirname(__FILE__, 2).'/');
define('INC_PATH', ROOT_PATH.'inc/');
define('VIEWS_PATH', INC_PATH.'views/');
define('CONTROLLERS_PATH', INC_PATH.'controllers/');
define('MODELS_PATH', INC_PATH.'models/');

define('BASE_URL','/');

define('STYLES_URL', BASE_URL.'assets/');
define('SCRIPTS_URL', BASE_URL.'assets/');

define('HOME_URL', BASE_URL);
define('SHOW_URL', BASE_URL.'show/');
define('ASK_URL', BASE_URL.'ask/');
define('SETTINGS_URL', BASE_URL.'settings/');

define('COMMENTS_QUERY_URL', BASE_URL.'comments/');
define('ASK_COMMENTS_QUERY_URL', ASK_URL.'comments/');
define('SHOW_COMMENTS_QUERY_URL', SHOW_URL.'comments/');

define('PAGE_TITLE_DEFAULT', 'H News');

