var CheckinControllerDefinition = [
	"$scope",
	"$log",
	"$window",
	"UserService",
	function ($scope, $log, $window, UserService) {
		"use strict";
		$log.info("CheckinController", arguments);

		// if user has children, prompt for who is checking in
		$scope.barcodeSize = 0.75 * Math.min($window.innerWidth, $window.innerHeight);

		UserService.user().then(function (user) {
			console.log("CheckinController::~ctor (success!)", user);
			$scope.user = user;
		}, function (message) {
			console.log("CheckinController::~ctor (error)", message);
		});
	}
];