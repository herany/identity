;(function (APP_NAME, angular, undefined) {
	"use strict";

	angular.module(APP_NAME + ".constants", [])
		.constant("APP_CONFIG", {
			apiBaseUrl: "http://sprtid-api.herokuapp.com" // "http://localhost:1212" //
		})
		.constant("ModelState", {
			read: 1,
			write: 2
		})
	;
})("sprtidApp", angular);
