;(function (APP_NAME, angular, undefined) {
	"use strict";

	angular.module(APP_NAME + ".directives", [])
		.directive("appVersion", ["version", function(version) {
			return function(scope, elm, attrs) {
				elm.text(version);
			};
		}])
		.directive("actionIndicatorBar", function () {
			return {
				// restrict: "E",
				restrict: "A",
				scope: false,
				// replace: true,
				// transclude: true,
				// template: '<div class="action-indicator-bar" ng-class="{\'performing-action\': inAction}" ng-transclude></div>'
				link: function (scope, element, attributes) {
					scope.$watch(attributes.inAction, function (isInAction, wasInAction) {
						if (isInAction) {
							element.addClass("performing-action");
						} else {
							element.removeClass("performing-action");
						}
					});
					element.addClass("action-indicator-bar");
				}
			};
		})
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
		.directive("sprtidDatabitHealth", ["AppConfig", function (AppConfig) {
			return {
				restrict: "E",
				scope: {
					databit: "="
				},
				templateUrl: AppConfig.templatesPath + "partials/_databit_health.html"
			};
		}])
		.directive("sprtidDatabitPhoto", ["AppConfig", function (AppConfig) {
			return {
				restrict: "E",
				scope: {
					databit: "="
				},
				templateUrl: AppConfig.templatesPath + "partials/_databit_photo.html"
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
		.directive("radioSet", function () {
			return {
				restrict: 'E',
				// replace: true,
				scope: {
					ngModel: '=?',
					ngChange: '&',
					name: '@'
				},
				transclude: true,
				template: '<div class="radio-set row" ng-transclude></div>',
				controller: function () {}
			};
		})
		.directive("radioSetButton", function () {
			// function link (scope, element, attrs, controller) {
			// 	var pController, name;

			// 	pController = controller.length ? controller[controller.length - 2] : controller;

			// 	if (!pController) { return; }
			// 	name = pController.getName ? pController.getName() : null;
			// 	// this feels more like compile stuff, but we need the parent scope's name attribute
			// 	if (name) {
			// 		element.children().eq(0).attr("name", name);
			// 	}

			// 	scope.ngModel = pController.getNgModel ? pController.getNgModel() : null;
			// 	scope.ngChange = pController.getNgChange ? pController.getNgChange() : null;
			// }
			return {
				restrict: 'E',
				replace: true,
				require: ['^radioSet', '?ngModel'],
				scope: {
					ngModel: '=?', // should be provided by radioSet but can't get it to work
					ngValue: '=?',
					ngChange: '&', // should be provided by radioSet but can't get it to work
					icon: '@',
					name: '=' // should be provided by radioSet but can't get it to work
				},
				transclude: true,
				template: '<label class="radio-set-button">' +
				            '<input type="radio" name="name" ng-model="ngModel" ng-value="ngValue" ng-change="ngChange()">' +
				            '<i class="radio-icon disable-pointer-events icon"></i>' +
				            '<div class="radio-content disable-pointer-events" ng-transclude></div>' +
				          '</label>',
				link: function (scope, element, attr) {
					element.children().eq(0).attr("name", attr.name);
					if (attr.icon) {
						element.children().eq(1).addClass(attr.icon);
					} else {
						element.children().eq(1).remove();
					}
				}
			};
		})
	;
})("sprtidApp", angular);
