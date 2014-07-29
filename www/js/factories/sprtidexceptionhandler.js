;(function (SprtId) { "use strict";
	var Self = SprtId.Factories.SprtidExceptionHandler = function () {
		return [
			"LoggerService",
			function (LoggerService) {
				return function($delegate){
					return function (exception, cause) {
						$delegate(exception, cause);
						LoggerService.exception(exception.message, arguments);
					};
				};
			}
		];
	};
})(window.SprtId);
