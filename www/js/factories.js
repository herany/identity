var production = true;

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
		.factory("UserService", ["$window", "$http", "$q", function ($window, $http, $q) {
			var user;
			var methods = {
				login: function (username, password) {
					var config, xhr;

					config = {
						url: apiBaseUrl + "/auth/login",
						data: {
							username: username,
							password: password
						},
						method: "POST"
					};

					xhr = $http(config)
						.success(function (data, status, headers, config) {
							user = data; // user a proper User object
						})
						.error(function (data, status, headers, config) {
							user = null;
						})
					;

					return $q.when(xhr);
				},
				signup: function (username, password, passwordConfirmation, email, firstName, lastName) {
					var config, xhr;

					// if (this.user) { return; }

					config = {
						url: apiBaseUrl + "/auth/signup",
						data: JSON.stringify({
							firstName: firstName,
							lastName: lastName,
							email: email,
							login: {
								username: username,
								password: password,
								passwordConfirmation: passwordConfirmation,
								email: email
							}
						}),
						method: "POST",
						headers: {"Content-Type": "application/json;charset=utf-8"}
					};

					xhr = $http(config)
						.success(function (data, status, headers, config) {
							user = data; // user a proper User object
						})
						.error(function (data, status, headers, config) {
							user = null;
						})
					;

					return $q.when(xhr);
				},
				user: function () {
					// how do you force a request?
					var config;

					if (methods.user.deferred) {
						return methods.user.deferred.promise;
					}

					// attach a property to the `user` method to store/cache the Q.
					methods.user.deferred = $q.defer();

					config = {
						url: apiBaseUrl + "/auth",
						method: "GET"
					};

					$http(config)
						.success(function (data, status, headers, config) {
							user = data; // user a proper User object
							methods.user.deferred.resolve(user);
						})
						.error(function (data, status, headers, config) {
							user = null;
							methods.user.deferred.reject(data);
						})
					;

					return methods.user.deferred.promise;
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

			return methods;
		}])
	;
})("sprtidApp", angular, production ? "http://sprtid-api.herokuapp.com" : "http://localhost:1212");
