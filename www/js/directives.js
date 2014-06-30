;(function (APP_NAME, angular, undefined) {
	"use strict";

	angular.module(APP_NAME + ".directives", [])
		.directive("appVersion", ["version", function(version) {
			return function(scope, elm, attrs) {
				elm.text(version);
			};
		}])
		// .directive("cordovaBarcodeScanner", ["$log"])
		.directive("sprtidUser", ["AppConfig", function (AppConfig) {
			return {
				restrict: "E",
				scope: {
					user: "=",
					onNewDatabit: "&",
					onDeleteDatabit: "&"
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
					databit: "=",
					onDelete: "&"
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
		.directive("sprtidHistory", ["AppConfig", function (AppConfig) {
			return {
				restrict: "E",
				scope: {
					user: "="
				},
				templateUrl: AppConfig.templatesPath + "partials/_history.html"
			};
		}])
		.directive("sprtidHistoryCheckin", ["AppConfig", function (AppConfig) {
			return {
				restrict: "E",
				scope: {
					checkin: "="
				},
				templateUrl: AppConfig.templatesPath + "partials/_history_checkin.html"
			};
		}])
		.directive("sprtidHistoryScan", ["AppConfig", function (AppConfig) {
			return {
				restrict: "E",
				scope: {
					scan: "="
				},
				templateUrl: AppConfig.templatesPath + "partials/_history_scan.html"
			};
		}])
	;
})("sprtidApp", angular);
