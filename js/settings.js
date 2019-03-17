const LS_AUTODARK_KEY = 'Local Storage Key for automatically changing to dark theme at night';
const LS_USER_THEME_KEY = 'Local Storage Key user selected theme';

const themeNames = window.HN.settings.themeNames;
const userThemeFormName = window.HN.settings.userThemeFormName;
const themeIdPrefix = window.HN.settings.themeIdPrefix;

export function initSettingsPage(){
	var ls = window.localStorage;
	if(ls.getItem(LS_AUTODARK_KEY) === 'true'){
		document.getElementById('autodark_checkbox').checked = true;
	}
	var userTheme = getUserTheme();

	themeNames.map(function(theme) {
		var themeRadio = document.getElementById(themeIdPrefix + theme);
		if(theme === userTheme){
			themeRadio.checked = true;
		}
		themeRadio.onclick = function(){
			document.documentElement.className = theme;
		};
	});
	document.getElementById('settings_save_button').onclick = save;
};

function getUserTheme(){
	var ls = window.localStorage;
	var userTheme = ls.getItem(LS_USER_THEME_KEY);
	if(themeNames.indexOf(userTheme) < 0){
		userTheme = themeNames[0];
	}
	return userTheme;
};

export function initSettings(){
	document.documentElement.className = getUserTheme();
	var ls = window.localStorage;
	if(ls.getItem(LS_AUTODARK_KEY) === 'true'){
		darkAtNight();
	}
};

function darkAtNight(){
	var currentDate = new Date();
	var currentHour = currentDate.getHours();
	if(currentHour >= 22 || currentHour < 6){
		document.documentElement.className = 'dark';
	}
};

function save(){
	var ls = window.localStorage;
	ls.setItem(LS_AUTODARK_KEY, document.getElementById('autodark_checkbox').checked);
	var userTheme = document.querySelector('input[name="' + userThemeFormName + '"]:checked').value;
	if(themeNames.indexOf(userTheme) >= 0){
		ls.setItem(LS_USER_THEME_KEY, userTheme);
	}
	window.location.href = document.querySelector('form').action;
};