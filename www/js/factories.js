var $$$settings$$$ = window.$$$settings$$$ || {};
var apiBaseUrl = $$$settings$$$.apihost || "http://localhost:1212";
apiBaseUrl = "http://sprtid-api.herokuapp.com";

;(function (APP_NAME, angular, apiBaseUrl, undefined) {
	"use strict";

	angular.module(APP_NAME + ".factories", [])
		.factory("UserService", ["$window", "$http", "$q", "$log", function ($window, $http, $q, $log) {
			var methods = {
				login: function (params) {
					var config, xhr, deferred = $q.defer();

					config = {
						url: apiBaseUrl + "/auth/login",
						method: "POST",
						headers: {"Content-Type": "application/json;charset=utf-8"},
						data: {
							username: params.username,
							password: params.password
						}
					};

					xhr = $http(config)
						.success(function (data, status, headers, config) {
							$log.log("UserService#login -> success", arguments);
							deferred.resolve(data);
						})
						.error(function (data, status, headers, config) {
							$log.log("UserService#login -> error", arguments);
							deferred.reject(data);
						})
						.finally(function () {
							$log.log("UserService#login -> finally", arguments);
						})
					;

					return deferred.promise;
				},
				signup: function (params) {
					var config, xhr, deferred = $q.defer();

					config = {
						url: apiBaseUrl + "/auth/signup",
						method: "POST",
						headers: {"Content-Type": "application/json;charset=utf-8"},
						data: JSON.stringify({
							firstName: params.firstName,
							lastName: params.lastName,
							email: params.email,
							login: {
								username: params.username || params.email,
								password: params.password,
								passwordConfirmation: params.passwordConfirmation,
								email: params.email
							}
						})
					};

					xhr = $http(config)
						.success(function (data, status, headers, config) {
							$log.log("UserService#signup -> success", arguments);
							deferred.resolve(data);
						})
						.error(function (data, status, headers, config) {
							$log.log("UserService#signup -> error", arguments);
							deferred.reject(data);
						})
					;

					return deferred.promise;
				},
				save: function (params) {
					var config, xhr, deferred = $q.defer();

					config = {
						url: apiBaseUrl + "/v1/users/" + (params.userId ? params.userId : "me"),
						data: JSON.stringify({
							firstName: params.firstName,
							lastName: params.lastName,
							email: params.email
						}),
						method: "POST",
						headers: {"Content-Type": "application/json;charset=utf-8"}
					};

					xhr = $http(config)
						.success(function (data, status, headers, config) {
							$log.log("UserService#save -> success", arguments);
							deferred.resolve(data);
						})
						.error(function (data, status, headers, config) {
							$log.log("UserService#save -> error", arguments);
							deferred.reject(data);
						})
					;

					return deferred.promise;
				},
				user: function (id) {
					// how do you force a request?
					var config;

					if (methods.user.deferred) {
						return methods.user.deferred.promise;
					}

					// attach a property to the `user` method to store/cache the Q.
					methods.user.deferred = $q.defer();

					config = {
						url: apiBaseUrl + "/auth" + (id ? "/" + id : ""),
						method: "GET"
					};

					$http(config)
						.success(function (data, status, headers, config) {
							methods.user.deferred.resolve(data);
						})
						.error(function (data, status, headers, config) {
							methods.user.deferred.reject(data);
						})
					;

					return methods.user.deferred.promise;
				},
				saveDatabit: function (user, databit) {
					var config, xhr, deferred = $q.defer(), url;

					url = apiBaseUrl + "/v1/users/" + user.id + "/databit";
					if (databit.id) {
						url += "/" + databit.id;
					}
					config = {
						url: url,
						data: JSON.stringify(databit),
						method: "POST",
						headers: {"Content-Type": "application/json;charset=utf-8"}
					};

					xhr = $http(config)
						.success(function (data, status, headers, config) {
							deferred.resolve(data);
						})
						.error(function (data, status, headers, config) {
							deferred.reject(data);
						})
					;

					return deferred.promise;
				},
				logout: function () {
					var config;

					config = {
						url: apiBaseUrl + "/auth/logout",
						method: "GET",
						headers: {"Content-Type": "application/json;charset=utf-8"}
					};

					return $http(config);
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
})("sprtidApp", angular, apiBaseUrl);
