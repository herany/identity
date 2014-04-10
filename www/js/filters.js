/*jshint smarttabs:true */

;(function (APP_NAME, angular, undefined) {
	'use strict';

	angular.module(APP_NAME + '.filters', [])
		.filter('interpolate', ['version', function(version) {
			return function(text) {
				return String(text).replace(/\%VERSION\%/mg, version);
			};
		}])
		.filter('ageFormatter', function() {
			return function(unformattedDate, emptyStrText) {
				return ViewHelpers.age(unformattedDate);
			};
		})
		.filter('asClassname', function() {
			return function(str) {
				return str.replace(/[^0-9a-z]/gi, '-').toLowerCase();
			};
		})
		.filter('jsonFormatter', function() {
			return function(obj) {
				return JSON.stringify(obj, null, "  ");
			};
		})
	;
})("sprtidApp", angular);
