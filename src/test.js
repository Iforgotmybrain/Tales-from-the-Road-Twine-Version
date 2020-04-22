let googleAnalytics = function() {
	if (settings.dataCollection === true) {
		var lockID = LoadScreen.lock(); // Lock loading screen
		importScripts('https://www.googletagmanager.com/gtag/js?id=UA-143749082-4')
		.then(function () {
		window.dataLayer = window.dataLayer || [];
		window.gtag = function () {
			dataLayer.push(arguments);
		};
		gtag('js', new Date());
		gtag('config', 'UA-143749082-4',{ 'anonymize_ip': true });
		$(document).on('click', 'a[data-passage]', function () {
			gtag('event', 'Navigation', {
				event_label    : $(this).attr('data-passage'),
				event_category : 'GuestClick'
			});
		});
		if (State.size > 0) {
			Engine.show();
		}
		LoadScreen.unlock(lockID); // Unlock loading screen
	})
	.catch(function (error) {
		console.warn('Could not load "gtag" library.');
		LoadScreen.unlock(lockID); // Unlock loading screen
	});
	} else {
		window['ga-disable-UA-143749082-4'] = true;
	}
};

Setting.addToggle("dataCollection", {
	label : "Allow collection of data using Google Analytics",
	desc : "Send data to GA about how you play the game, such as time spent playing and what parts of the game you've completed.",
	default : false,
	onChange : googleAnalytics,
});