HN.settings.LS_AUTODARK_KEY = 'Local Storage Key for automatically changing to dark theme at night';
HN.settings.LS_USER_THEME_KEY = 'Local Storage Key user selected theme';

HN.settings.initSettingsPage = function(){
	var ls = window.localStorage;
	if(ls.getItem(HN.settings.LS_AUTODARK_KEY) === 'true'){
		document.getElementById('autodark_checkbox').checked = true;
	}
	var userTheme = HN.settings.getUserTheme();

	HN.settings.themeNames.map(function(theme) {
		var themeRadio = document.getElementById(HN.settings.themeIdPrefix + theme);
		if(theme === userTheme){
			themeRadio.checked = true;
		}
		themeRadio.onclick = function(){
			document.documentElement.className = theme;
		};
	});
};

HN.settings.getUserTheme = function(){
	var ls = window.localStorage;
	var userTheme = ls.getItem(HN.settings.LS_USER_THEME_KEY);
	if(HN.settings.themeNames.indexOf(userTheme) < 0){
		userTheme = HN.settings.themeNames[0];
	}
	return userTheme;
};

HN.settings.initSettings = function(){
	document.documentElement.className = HN.settings.getUserTheme();
	var ls = window.localStorage;
	if(ls.getItem(HN.settings.LS_AUTODARK_KEY) === 'true'){
		HN.settings.darkAtNight();
	}
};

HN.settings.darkAtNight = function(){
	var currentDate = new Date();
	var currentHour = currentDate.getHours();
	if(currentHour >= 23 || currentHour < 6){
		document.documentElement.className = 'dark';
	}
};

HN.settings.save = function(){
	var ls = window.localStorage;
	ls.setItem(HN.settings.LS_AUTODARK_KEY, document.getElementById('autodark_checkbox').checked);
	var userTheme = document.querySelector('input[name="' + HN.settings.userThemeFormName + '"]:checked').value;
	if(HN.settings.themeNames.indexOf(userTheme) >= 0){
		ls.setItem(HN.settings.LS_USER_THEME_KEY, userTheme);
	}
	window.location.href = document.querySelector('form').action;
};