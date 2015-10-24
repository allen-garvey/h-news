HN.settings.initSettingsPage = function(){
	HN.settings.themeNames.map(function(theme) {
		document.getElementById(HN.settings.themeIdPrefix + theme).onclick = function(){
			document.documentElement.className = theme;
		};
	});
};

HN.settings.initSettings = function(){
	if(HN.settings.shouldAutoDarkMode){
		HN.settings.darkAtNight();
	}
}

HN.settings.darkAtNight = function(){
	var currentDate = new Date();
	var currentHour = currentDate.getHours();
	if(currentHour >= 23 || currentHour < 6){
		document.documentElement.className = 'dark';
	}
}