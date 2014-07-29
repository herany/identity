;(function (SprtId) { "use strict";
	var Self = SprtId.Factories.SprtidLog = function () {
		return [
			"LoggerService",
			"LogLevel",
			"AppConfig",
			function (LoggerService, LogLevel, AppConfig) {
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
			}
		];
	};
})(window.SprtId);
