var CheckinControllerDefinition = [
	"$scope",
	"$log",
	"UserService",
	function ($scope, $log, UserService) {
		"use strict";
		$log.info("CheckinController", arguments);

		// if user has children, prompt for who is checking in

		UserService.user().then(function (user) {
			console.log("CheckinController::~ctor (success!)", user);
			$scope.user = user;
		}, function (message) {
			console.log("CheckinController::~ctor (error)", message);
		});

		// add plugin: cordova plugin add org.apache.cordova.vibration
		// ping server for checkin record
		// vibrate/inform user that they are all set
	}
];