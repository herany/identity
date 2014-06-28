;(function (APP_NAME, angular, undefined) {
	"use strict";

	angular.module(APP_NAME + ".factories", [])
		.factory("UserService", ["$window", "$http", "$q", "$log", "AppConfig", function ($window, $http, $q, $log, AppConfig) {
			var methods = {
				login: function (params) {
					var config, xhr, deferred = $q.defer();

					config = {
						url: AppConfig.apiBaseUrl + "/auth/login",
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
						url: AppConfig.apiBaseUrl + "/auth/signup",
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
						url: AppConfig.apiBaseUrl + "/v1/users/" + (params.userId ? params.userId : "me"),
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
						url: AppConfig.apiBaseUrl + (id ? "/v1/user/" + id : "/auth"),
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
				userByBarcode: function (barcode) {
					// how do you force a request?
					var config, deferred;

					deferred = $q.defer();

					config = {
						url: AppConfig.apiBaseUrl + "/v1/users/barcode/" + encodeURIComponent(barcode),
						method: "GET"
					};

					$http(config)
						.success(function (data, status, headers, config) {
							deferred.resolve(data);
						})
						.error(function (data, status, headers, config) {
							deferred.reject(data);
						})
					;

					return deferred.promise;
				},
				saveDatabit: function (userId, databit) {
					var config, xhr, deferred = $q.defer(), url;

					url = AppConfig.apiBaseUrl + "/v1/users/" + userId + "/databit";
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
				deleteDatabit: function (userId, databitId) {
					var config, xhr, deferred = $q.defer(), url;

					url = AppConfig.apiBaseUrl + "/v1/users/" + userId + "/databit/" + databitId;
					config = {
						url: url,
						method: "DELETE"
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
						url: AppConfig.apiBaseUrl + "/auth/logout",
						method: "GET",
						headers: {"Content-Type": "application/json;charset=utf-8"}
					};

					return $http(config);
				}
			};

			return methods;
		}])
		.factory("LoggerService", ["$injector", "$cordovaDevice", "AppConfig", function ($injector, $cordovaDevice, AppConfig) {
			var methods = {};

			angular.forEach(["debug", "log", "info", "warn", "error", "exception"], function (method) {
				this[method] = function () {
					var config;

					if (!arguments || !arguments.length) { return; }

					config = {
						url: AppConfig.apiBaseUrl + "/logs",
						method: "POST",
						headers: {"Content-Type": "application/json;charset=utf-8"},
						data: {
							level: method,
							device: cordova && cordova.plugins.device ? $cordovaDevice.getDevice() : {"device": "n/a"}, // look for update from ngCordova on how to mock in non-app environment
							message: arguments[0],
							detail: Array.prototype.slice.call(arguments, 1)
						}
					};

					return $injector.get("$http")(config);
				};
			}, methods);

			return methods;
		}])
		.factory("sprtidLog", ["LoggerService", "LogLevel", "AppConfig", function (LoggerService, LogLevel, AppConfig) {
			return function($delegate){
				var methods = {};

				angular.forEach(["debug", "log", "info", "warn", "error", "exception"], function (method) {
					this[method] = function () {
						$delegate[method].apply($delegate, arguments);
						if (LogLevel[method] >= AppConfig.logLevel) {
							LoggerService[method].apply(LoggerService, arguments);
						}
					};
				}, methods);

				return methods;
			};
		}])
		// .factory("sprtidExceptionHandler", ["LoggerService", function (LoggerService) {
		// 	return function($delegate){
		// 		return function (exception, cause) {
		// 			$delegate(exception, cause);
		// 			LoggerService.exception(exception.message, arguments);
		// 		};
		// 	};
		// }])
	;
})("sprtidApp", angular);
