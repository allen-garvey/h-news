<?php 
/**
* Controls saving and retrieving values for settings from the user's cookie
*/
class SettingsCookie{
	public static $cookieNameUserTheme = "HNews_settings_theme";
	public static $cookieNameShouldAutoDarkMode = "HNews_settings_should_auto_dark_mode";
	public static $cookieExpirationDate = 60 * 60 * 24 * 365;

	protected $userTheme;
	protected $shouldAutoDark;

	function __construct(){
		if(isset($_COOKIE[SettingsCookie::$cookieNameUserTheme])){
			$this->userTheme = $_COOKIE[SettingsCookie::$cookieNameUserTheme];
		}
		else{
			$this->userTheme = null;	
		}
		if(isset($_COOKIE[SettingsCookie::$cookieNameShouldAutoDarkMode]) && $_COOKIE[SettingsCookie::$cookieNameShouldAutoDarkMode] === '1'){
			$this->shouldAutoDark = true;
		}
		else{
			$this->shouldAutoDark = false;	
		}
	}

	public function getUserTheme(){
		return $this->userTheme;
	}
	public function getShouldAutoDarkMode(){
		return $this->shouldAutoDark;
	}

	public function setUserTheme($userTheme){
		$this->setCookie(SettingsCookie::$cookieNameUserTheme, $userTheme);	
	}

	public function setAutoDarkModeSetting($shouldAutoDark){
		$autoDarkCookieVal = $shouldAutoDark ? '1' : '0';
		$this->setCookie(SettingsCookie::$cookieNameShouldAutoDarkMode, $autoDarkCookieVal);
	}

	protected function setCookie($cookieName, $cookieValue){
		if(ENVIRONMENT_CURRENT === ENVIRONMENT_DEVELOPMENT){
			setcookie($cookieName, $cookieValue, time() + SettingsCookie::$cookieExpirationDate, COOKIE_URL);
		}
		else{
			setcookie($cookieName, $cookieValue, time() + SettingsCookie::$cookieExpirationDate, '/', COOKIE_URL);	
		}
	}
}