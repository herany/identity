;(function (APP_NAME, angular, ScannerClass, undefined) {
	"use strict";

	angular.module(APP_NAME + ".directives", [])
		.directive("appVersion", ["version", function(version) {
			return function(scope, elm, attrs) {
				elm.text(version);
			};
		}])
		.directive("cordovaBarcodeScanner", ["$log", ScannerClass])
		.directive("sprtidUser", function () {
			return {
				restrict: "E",
				scope: {
					user: '=user'
				},
				templateUrl: "/templates/partials/_user.html"
			};
		})
		.directive("sprtidUserForm", function () {
			return {
				restrict: "E",
				scope: {
					user: '=user'
				},
				templateUrl: "/templates/forms/_user.html"
			};
		})
		.directive("sprtidDatabit", function () {
			return {
				restrict: "E",
				scope: {
					databit: '=databit'
				},
				templateUrl: "/templates/partials/_databit.html"
			};
		})
		.directive("sprtidDatabitForm", function () {
			return {
				restrict: "E",
				scope: {
					databit: '=databit'
				},
				templateUrl: "/templates/forms/_databit.html"
			};
		})
	;
})("sprtidApp", angular, AngularCordova.Plugins.BarcodeScanner);
