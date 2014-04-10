;(function (APP_NAME, angular, ScannerClass, undefined) {
	'use strict';

	angular.module(APP_NAME + '.directives', [])
		.directive('appVersion', ['version', function(version) {
			return function(scope, elm, attrs) {
				elm.text(version);
			};
		}])
		.directive('cordovaBarcodeScanner', ['$log', ScannerClass])
	;
})(sprtidApp, angular, AngularCordova.Plugins.BarcodeScanner);
