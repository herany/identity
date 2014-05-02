;(function (APP_NAME, angular, apiBaseUrl, undefined) {
	"use strict";

	angular.module(APP_NAME + ".factories", [])
		// .factory('cordovaReady', function() {
		// 	return function (fn) {
		// 		var queue = [];

		// 		var impl = function () {
		// 			queue.push(Array.prototype.slice.call(arguments));
		// 		};

		// 		document.addEventListener('deviceready', function () {
		// 			queue.forEach(function (args) {
		// 				fn.apply(this, args);
		// 			});
		// 			impl = fn;
		// 		}, false);

		// 		return function () {
		// 			return impl.apply(this, arguments);
		// 		};
		// 	};
		// })
		.factory("$scanFactory", ["$http", "$log", function ($http, $log) {
			var URL_TOKEN_ID = "#{id}",
			    APP_ID_URL_PATTERN = apiBaseUrl + "/v1/scans/" + URL_TOKEN_ID;

			function fetchByBarcode (id, fnCallback) {
				var url = APP_ID_URL_PATTERN.replace(URL_TOKEN_ID, id);

				return $http.get(url);
			}

			return {
				fetchByBarcode: fetchByBarcode
			};
		}])
		.factory("UserService", ["$window", "$http", function ($window, $http) {
			return {
				login: function (username, password) {
					var config,
					    _this = this;

					config = {
						url: apiBaseUrl + "/auth/login",
						params: {
							username: username,
							password: password
						},
						method: "POST"
					};

					return $http(config)
						.success(function (data, status, headers, config) {
							_this.setToken(data.token);
						})
						.error(function (data, status, headers, config) {
							_this.setToken("");
						})
					;
				},
				user: function () {
					// cache the result...
					var config;

					config = {
						url: apiBaseUrl + "/auth",
						method: "GET"
					};

					return $http(config);
				},
				logout: function () {
				},
				isLoggedIn: function () {
					return !!this.getToken();
				},
				setToken: function (token) {
					$window.sessionStorage.setItem("token", token);
				},
				getToken: function () {
					return $window.sessionStorage.getItem("token");
				}
			};
		}])
	;
})("sprtidApp", angular, "http://localhost:1212");
