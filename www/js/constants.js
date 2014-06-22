;(function (APP_NAME, angular, undefined) {
	"use strict";

	var LogLevel = {
		debug: 0,
		log: 10,
		info: 20,
		warn: 30,
		error: 40,
		exception: 50
	};

	angular.module(APP_NAME + ".constants", [])
		.constant("LogLevel", LogLevel)
		.constant("ModelState", {
			read: 1,
			write: 2
		})
		.constant("AppConfig", {
			// apiBaseUrl: "http://localhost:1212",
			apiBaseUrl: "http://sprtid-api.herokuapp.com",
			logLevel: LogLevel.warn
		})
	;
})("sprtidApp", angular);
