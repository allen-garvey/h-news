<?php 
/**
* Controls saving and retrieving values for settings from the user's cookie
*/
class SettingsCookie{
	public static $cookieNameUserTheme = "HNews_settings_theme";
	public static $cookieExpirationDate = 60 * 60 * 24 * 365;

	protected $userTheme;

	function __construct(){
		if(isset($_COOKIE[SettingsCookie::$cookieNameUserTheme])){
			$this->userTheme = $_COOKIE[SettingsCookie::$cookieNameUserTheme];
		}
		else{
			$this->userTheme = null;	
		}
	}

	public function getUserTheme(){
		return $this->userTheme;
	}

	public function setUserTheme($userTheme){
		if(ENVIRONMENT_CURRENT === ENVIRONMENT_DEVELOPMENT){
			setcookie(SettingsCookie::$cookieNameUserTheme, $userTheme, time() + SettingsCookie::$cookieExpirationDate, COOKIE_URL);
		}
		else{
			setcookie(SettingsCookie::$cookieNameUserTheme, $userTheme, time() + SettingsCookie::$cookieExpirationDate, '/', COOKIE_URL);	
		}
		
	}
}