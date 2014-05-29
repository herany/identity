var production = false;

;(function (APP_NAME, angular, apiBaseUrl, undefined) {
	"use strict";

	angular.module(APP_NAME + ".factories", [])
		.factory("UserService", ["$window", "$http", "$q", function ($window, $http, $q) {
			var methods = {
				login: function (username, password) {
					var config, xhr, deferred = $q.defer();

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
							deferred.resolve(data);
						})
						.error(function (data, status, headers, config) {
							deferred.reject(data);
						})
					;

					return deferred.promise;
				},
				signup: function (username, password, passwordConfirmation, email, firstName, lastName) {
					var config, xhr, deferred = $q.defer();

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
							deferred.resolve(data);
						})
						.error(function (data, status, headers, config) {
							deferred.reject(data);
						})
					;

					return deferred.promise;
				},
				save: function (userId, email, firstName, lastName) {
					var config, xhr, deferred = $q.defer();

					config = {
						url: apiBaseUrl + "/v1/users/" + (userId ? userId : "me"),
						data: JSON.stringify({
							firstName: firstName,
							lastName: lastName,
							email: email
						}),
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
