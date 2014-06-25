;(function (APP_NAME, angular, ScannerClass, undefined) {
	"use strict";

	angular.module(APP_NAME + ".directives", [])
		.directive("appVersion", ["version", function(version) {
			return function(scope, elm, attrs) {
				elm.text(version);
			};
		}])
		// .directive("cordovaBarcodeScanner", ["$log", ScannerClass])
		.directive("sprtidUser", ["AppConfig", function (AppConfig) {
			return {
				restrict: "E",
				scope: {
					user: "=",
					onNewDatabit: "&"
				},
				link: function ($scope, element, attributes) {
					$scope.getTemplateUrl = function () {
						return AppConfig.templatesPath + (attributes.edit === "true" ? "forms" : "partials") + "/_user.html";
					};
				},
				template: '<div ng-include="getTemplateUrl()"></div>'
			};
		}])
		.directive("sprtidDatabit", ["AppConfig", function (AppConfig) {
			return {
				restrict: "E",
				scope: {
					databit: "="
				},
				link: function ($scope, element, attributes) {
					$scope.getTemplateUrl = function () {
						return AppConfig.templatesPath + (attributes.edit === "true" ? "forms" : "partials") + "/_databit.html";
					};
				},
				template: '<div ng-include="getTemplateUrl()"></div>'
			};
		}])
		.directive("sprtidDatabitBarcode", ["AppConfig", function (AppConfig) {
			return {
				restrict: "E",
				scope: {
					databit: "="
				},
				link: function ($scope, element, attributes) {
					// I just happen to know that this app is forced into portrait mode.  #besmarter if that changes
					$scope.size = 0.75 * element[0].parentElement.offsetWidth;
				},
				templateUrl: AppConfig.templatesPath + "partials/_databit_barcode.html"
			};
		}])
		.directive("sprtidDatabitBirthday", ["AppConfig", function (AppConfig) {
			return {
				restrict: "E",
				scope: {
					databit: "="
				},
				templateUrl: AppConfig.templatesPath + "partials/_databit_birthday.html"
			};
		}])
	;
})("sprtidApp", angular, AngularCordova.Plugins.BarcodeScanner);
