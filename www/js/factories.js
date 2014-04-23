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
		.factory("$identityFactory", ["$http", "$log", function ($http, $log) {
			var URL_TOKEN_ID = "#{id}",
			    APP_ID_URL_PATTERN = apiBaseUrl + "/v1/logins/" + URL_TOKEN_ID;

			return {
				fetch: fetch
			};

			function fetch (id, fnCallback) {
				var url = APP_ID_URL_PATTERN.replace(URL_TOKEN_ID, id);

				// test to see if you can add several done methods.
				// $http.get(url).done(function () {
				// 	console.log("first!", arguments);
				// }).done(function () {
				// 	console.log("second!", arguments);
				// });

				return $http.get(url).success(function(data) {
					if(typeof(fnCallback) === 'function') {
						fnCallback.call(null, data.success, data.content);
					}

					$log.log("identityProvider response: ", data);
				});
			}
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
