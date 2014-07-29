;(function (appName, angular, undefined) {
	"use strict";

	angular.module(appName + ".factories", [])
		.factory("EventService", SprtId.Factories.Event())
		.factory("LoggerService", SprtId.Factories.Logger())
		.factory("OrganizationService", SprtId.Factories.Organization())
		.factory("UserService", SprtId.Factories.User())
		.factory("sprtidLog", SprtId.Factories.SprtidLog())
		// .factory("sprtidExceptionHandler", SprtId.Factories.SprtidExceptionHandler()) // caused an infinite loop, or something.  debug eventually
	;
})(SprtId.AppName, angular);
