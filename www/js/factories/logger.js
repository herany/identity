;(function (SprtId) { "use strict";
	var Self = SprtId.Factories.Logger = function () {
		return [
			"$injector",
			"$cordovaDevice",
			"AppConfig",
			function ($injector, $cordovaDevice, AppConfig) {
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
								device: cordova && cordova.plugins && cordova.plugins.device ? $cordovaDevice.getDevice() : {"device": "n/a"}, // look for update from ngCordova on how to mock in non-app environment
								message: arguments[0],
								detail: Array.prototype.slice.call(arguments, 1)
							}
						};

						return $injector.get("$http")(config);
					};
				}, methods);

				return methods;
			}
		];
	};
})(window.SprtId);
