HN.initSettingsPage = function(){
	HN.settings.themeNames.map(function(theme) {
		$('#'+HN.settings.themeIdPrefix + theme).on('click', function() {
			$('html').removeClass().addClass(theme);
		});
	});
};