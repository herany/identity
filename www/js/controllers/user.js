var UserControllerDefinition = [
	"$scope",
	"$log",
	"$routeParams",
	"$scanFactory",
	function ($scope, $log, $routeParams, $scanFactory) {
		"use strict";
		$log.info("UserController", arguments);

		$scanFactory.fetchByBarcode($routeParams.id).success(function(data, status, headers, config) {
			$log.info("UserController :: $scanResponse.fetchByBarcode", data, status);

			$scope.user = data;

			// if(identityResponse.success) {
			// 	$scanDispatcher.scan(identityResponse.content);
			// }
		});
	}
];