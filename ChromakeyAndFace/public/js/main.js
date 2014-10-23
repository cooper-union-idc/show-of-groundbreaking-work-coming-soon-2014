(function () {

	var URLProtocol,
		URLHost,
		URLPathname;

	var methods = {
		init: function () {
			console.log('Main.js Init!');
			methods.checkURL();
			methods.initMainControls();
		},
		checkURL: function () {
			URLProtocol = window.location.protocol;
			URLHost 	= window.location.host;
			URLPathname = window.location.pathname;

			methods.checkState(URLProtocol, URLHost, URLPathname);
		},
		checkState: function (protocol, host, pathname) {
			console.log('protocol: ' + protocol);
			console.log('host: ' + host);
			console.log('pathname: ' + pathname);

			switch (protocol) {
				case 'http:':
					console.log('Enter the site using HTTPS SSL Encryption');
					break;
				case 'https:':
					console.log('Using HTTPS SSL Encryption');
					break;
				default:
					console.log('Check protocol state defaulted');
					break;
			}		
		},
		initMainControls: function () {

			// MAIN CONTROLS
			$('.display-main-controls').on('click', function () {
				var checkboxState = $(this).is(':checked');

				if (checkboxState) {
					$('#hide-checkbox').addClass('open');
				} else {
					$('#hide-checkbox').removeClass('open');	
				}
				
				methods.changeCheckboxState(checkboxState, '#main-controls');
			});

			// SETUP CONTROLS
			$('.display-setup-controls').on('click', function () {
				var checkboxState = $(this).is(':checked');
				methods.changeCheckboxState(checkboxState, '.setup-controls-wrapper');
			});

			// SCREEN SHARING CONTROLS
			$('.display-screen-sharing-controls').on('click', function () {
				var checkboxState = $(this).is(':checked');
				methods.changeCheckboxState(checkboxState, '.screen-sharing-controls-wrapper');
			});

			// GREEN SCREEN CONTROLS
			$('.display-green-screen-controls').on('click', function () {
				var checkboxState = $(this).is(':checked');
				methods.changeCheckboxState(checkboxState, '.green-screen-controls-wrapper');
			});

			$('.display-green-screen-video').on('click', function () {
				var checkboxState = $(this).is(':checked');
				methods.changeCheckboxState(checkboxState, '#dCanvas');
			});

			$('.display-green-screen-sliders').on('click', function () {
				var checkboxState = $(this).is(':checked');
				methods.changeCheckboxState(checkboxState, '.green-screen-sliders-wrapper');
			})


			// FACE DETECT CONTROLS
			$('.display-face-detect-controls').on('click', function () {
				var checkboxState = $(this).is(':checked');
				methods.changeCheckboxState(checkboxState, '.face-detect-controls-wrapper');
			});

			$('.display-face-detect-video').on('click', function () {
				var checkboxState = $(this).is(':checked');
				methods.changeCheckboxState(checkboxState, '#container');

			});
		},
		changeCheckboxState: function (checkboxState, relatedWrapper) {
			if (checkboxState === false) {
				$(relatedWrapper).fadeOut();
			} else {
				$(relatedWrapper).fadeIn();
			}
		}
	};

	window.Main = methods;
})();