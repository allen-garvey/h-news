HN.settings.initSettingsPage = function(){
	HN.settings.themeNames.map(function(theme) {
		$('#'+HN.settings.themeIdPrefix + theme).on('click', function() {
			$('html').removeClass().addClass(theme);
		});
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
		$('html').removeClass().addClass('dark');
	}
}