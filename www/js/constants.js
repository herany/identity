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

	var scripts = document.getElementsByTagName("script"),
	    currentScriptPath = scripts[scripts.length-1].src,
	    wwwIndex = currentScriptPath.indexOf("/www/"),
	    templatesPath = (wwwIndex >= 0 ? currentScriptPath.substring(0, wwwIndex + 5) : "/") + "templates/";

	angular.module(APP_NAME + ".constants", [])
		.constant("LogLevel", LogLevel)
		.constant("ModelState", {
			read: 1,
			write: 2
		})
		.constant("AppConfig", {
			// apiBaseUrl: "http://localhost:1212",
			apiBaseUrl: "http://sprtid-api.herokuapp.com",
			logLevel: LogLevel.warn,
			templatesPath: templatesPath
		})
	;
})("sprtidApp", angular);
