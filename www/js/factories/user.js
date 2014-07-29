;(function (SprtId) { "use strict";
	var Self = SprtId.Factories.User = function () {
		return [
			"$window",
			"$http",
			"$q",
			"$log",
			"AppConfig",
			function ($window, $http, $q, $log, AppConfig) {
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
					saveDatabitWithImage: function (userId, databit, imageUri) {
						var config, xhr, deferred = $q.defer(), url, formData;

						// formData = new FormData();
						// formData.append("file", imageUri);
						url = AppConfig.apiBaseUrl + "/v1/users/" + userId + "/databit/file";
						if (databit.id) {
							url += "/" + databit.id;
						}
						// config = {
						// 	url: url,
						// 	data: { // need to use FormData
						// 		file: imageUri,
						// 		databit: JSON.stringify(databit)
						// 	},
						// 	headers: {
						// 		"Content-Type": undefined      // the browser will determine the correct content-type for us
						// 	},
						// 	method: "POST",
						// 	// transformRequest: angular.identity // prevent angular from coercing our data into some serialized form
						// 	transformRequest: function (data) {
						// 		var formData = new FormData();

						// 		angular.forEach(data, function(value, key) {
						// 			this.append(key, value);
						// 		}, formData);

						// 		return formData;
						// 	}
						// };

						// xhr = $http(config)
						// 	.success(function (data, status, headers, config) {
						// 		deferred.resolve(data);
						// 	})
						// 	.error(function (data, status, headers, config) {
						// 		deferred.reject(data);
						// 	})
						// ;

						var fileTransfer, options;

						fileTransfer = new FileTransfer();
						options = new FileUploadOptions();

						options.fileKey = "file";
						options.fileName = imageUri.substr(imageUri.lastIndexOf('/') + 1);
						options.mimeType = "text/plain";
						options.chunkedMode = false;
						options.params = { // Whatever you populate options.params with, will be available in req.body at the server-side.
							databit: JSON.stringify(databit)
						};

						fileTransfer.upload(imageUri, url,
							function (metadata) {
								deferred.resolve();
								console.log("fileTransfer success!", arguments);
							},
							function (fileTransferError) {
								deferred.reject();
								console.log("fileTransfer fail.", arguments);
							}, options);

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
					},
					preregister: function (userId, organizationId, eventId) {
						var config, xhr, deferred = $q.defer(), url;

						url = AppConfig.apiBaseUrl + "/v1/users/" + userId + "/preregister";
						config = {
							url: url,
							data: JSON.stringify({
								userId: userId,
								organizationId: organizationId,
								eventId: eventId
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
					preregisterWithImage: function (userId, organizationId, eventId, signatureImageUri) {
						var deferred = $q.defer(), url;

						url = AppConfig.apiBaseUrl + "/v1/users/" + userId + "/preregister/file";

						var fileTransfer, options;

						fileTransfer = new FileTransfer();
						options = new FileUploadOptions();

						options.fileKey = "file";
						options.fileName = signatureImageUri.substr(signatureImageUri.lastIndexOf('/') + 1);
						options.mimeType = "text/plain";
						options.chunkedMode = false;
						options.params = { // Whatever you populate options.params with, will be available in req.body at the server-side.
							databit: JSON.stringify({
								userId: userId,
								organizationId: organizationId,
								eventId: eventId
							})
						};

						fileTransfer.upload(signatureImageUri, url,
							function (metadata) {
								deferred.resolve();
								console.log("fileTransfer success!", arguments);
							},
							function (fileTransferError) {
								deferred.reject();
								console.log("fileTransfer fail.", arguments);
							}, options);

						return deferred.promise;
					},
					requestMembership: function (userId, organizationId, memberId) {
						var config, xhr, deferred = $q.defer(), url;

						url = AppConfig.apiBaseUrl + "/v1/users/" + userId + "/membership";
						config = {
							url: url,
							data: JSON.stringify({
								userId: userId,
								organizationId: organizationId,
								memberId: memberId
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
					}
				};

				return methods;
			}
		];
	};
})(window.SprtId);
