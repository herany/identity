;(function (SprtId) { "use strict";
	var Self = SprtId.Factories.Event = function () {
		return [
			"$http",
			"$q",
			"AppConfig",
			function ($http, $q, AppConfig) {
				var methods = {
					list: function (organizationId) {
						var config, deferred;

						deferred = $q.defer();

						config = {
							url: AppConfig.apiBaseUrl + "/v1/events",
							method: "GET",
							params: {
								organizationId: organizationId
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
					} /*,
					save: function (formObj) {
						var config, xhr, deferred = $q.defer(), url;

						url = AppConfig.apiBaseUrl + "/v1/events";
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
