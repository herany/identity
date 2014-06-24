// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// "starter" is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of "requires"
// "starter.controllers" is found in controllers.js
;(function (APP_NAME, angular, cordova, StatusBar, undefined) {
	"use strict";

	angular
		.module("starter", [
			"ionic",
			"ngCordova", // https://github.com/driftyco/ng-cordova.git
			"http-auth-interceptor",
			// "facebook",
			"monospaced.qrcode",
			APP_NAME + ".constants",
			APP_NAME + ".filters",
			APP_NAME + ".services",
			APP_NAME + ".factories",
			APP_NAME + ".directives",
			APP_NAME + ".controllers"
		])

		.run(function ($ionicPlatform) {
			$ionicPlatform.ready(function () {
				// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
				// for form inputs)
				if (cordova && cordova.plugins.Keyboard) {
					cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				}
				if (StatusBar) {
					// org.apache.cordova.statusbar required
					StatusBar.styleDefault();
				}
			});
		})

		.config(["$stateProvider", "$urlRouterProvider", "$provide", function ($stateProvider, $urlRouterProvider, $provide) {
			$stateProvider
				.state("app", {
					url: "/app",
					abstract: true,
					templateUrl: "templates/menu.html",
					controller: "AppController"
				})

				.state("app.home", {
					url: "/home",
					views: {
						"menuContent": {
							templateUrl: "templates/home.html",
							controller: "HomeController"
						}
					}
				})

				.state("app.checkin", {
					url: "/checkin",
					views: {
						"menuContent": {
							templateUrl: "templates/checkin.html",
							controller: "CheckinController"
						}
					}
				})

				.state("app.user", {
					url: "/user/:id",
					views: {
						"menuContent": {
							templateUrl: "templates/user/index.html",
							controller: "UserController"
						}
					}
				})

				.state("app.user.edit", {
					url: "/edit",
					views: {
						"menuContent": {
							templateUrl: "templates/user/edit.html",
							controller: "UserController"
						}
					}
				})

				.state("app.user.scan", {
					url: "/scan",
					views: {
						"menuContent": {
							templateUrl: "templates/user/index.html",
							controller: "UserController"
						}
					}
				})

				.state("app.profile", {
					url: "/profile",
					views: {
						"menuContent": {
							templateUrl: "templates/profile.html",
							controller: "UserController"
						}
					}
				})

				// .state("app.databit", {
				// 	url: "/databit/:id",
				// 	views: {
				// 		"menuContent": {
				// 			templateUrl: "templates/databit.html",
				// 			controller: "DatabitController"
				// 		}
				// 	}
				// })

				.state("app.login", {
					url: "/login",
					views: {
						"menuContent": {
							templateUrl: "templates/login.html",
							controller: "LoginController"
						}
					}
				})

				.state("app.signup", {
					url: "/signup",
					views: {
						"menuContent": {
							templateUrl: "templates/signup.html",
							controller: "SignupController"
						}
					}
				})

				.state("app.logout", {
					url: "/logout",
					views: {
						"menuContent": {
							templateUrl: "templates/logout.html",
							controller: "LogoutController"
						}
					}
				})

				.state("app.scan", {
					url: "/scan",
					views: {
						"menuContent": {
							templateUrl: "templates/scan.html",
							controller: "ScanController"
						}
					}
				})
			;
			// if none of the above states are matched, use this as the fallback
			$urlRouterProvider.otherwise("/app/home");

			$provide.decorator("$log", function ($delegate, sprtidLog) {
				return sprtidLog($delegate);
			});

			// $provide.decorator("$exceptionHandler", function ($delegate, sprtidExceptionHandler) {
			// 	return sprtidExceptionHandler($delegate);
			// });
		}])
	;

})("sprtidApp", angular, window.cordova, window.StatusBar);
