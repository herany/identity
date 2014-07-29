;(function (SprtId) { "use strict";
	var Self = SprtId.Factories.Organization = function () {
		return [
			"$http",
			"$q",
			"AppConfig",
			function ($http, $q, AppConfig) {
				var methods = {
					list: function (userId) {
						var config, deferred;

						deferred = $q.defer();

						config = {
							url: AppConfig.apiBaseUrl + "/v1/organizations",
							method: "GET",
							params: {
								userId: userId
							}
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
					all: function () {
						var config, deferred;

						deferred = $q.defer();

						config = {
							url: AppConfig.apiBaseUrl + "/v1/organizations",
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
					} /*,
					save: function (formObj) {
						var config, xhr, deferred = $q.defer(), url;

						url = AppConfig.apiBaseUrl + "/v1/organizations";
						if (formObj.id) {
							url += "/" + formObj.id;
						}
						config = {
							url: url,
							data: formObj,
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
					} */
				};

				return methods;
			}
		];
	};
})(window.SprtId);
