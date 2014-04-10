/*jshint smarttabs:true */

;(function (angular, undefined) {
	'use strict';

	// Demonstrate how to register services
	// In this case it is a simple value service.
	angular.module('sprtidApp.services', [])
		.value('version', '0.1')
	;
})(angular);
