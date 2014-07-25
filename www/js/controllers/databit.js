var DatabitControllerDefinition = [
	"$scope",
	"$log",
	"$stateParams",
	"DatabitService",
	function ($scope, $log, $stateParams, DatabitService) {
		"use strict";
		$log.info("DatabitController", arguments);

		$scope.ajaxing();
		DatabitService.user($stateParams.id).then(function (data, status, headers, config) {
			console.log("DatabitService::login (success!)", data);
			$scope.user = data;
			$scope.ajaxing(true);
		}, function (data, status, headers, config) {
			console.log("DatabitService::login (error)", data, status);
			$scope.user = null;
			$scope.ajaxing(true);
		});

		$scope.save = function () {
			var fnSuccess, fnError, fnNotify;

			fnSuccess = function (user) {
				$log.log("DatabitController::save ($q.resolve)", arguments);
				$scope.success = true;
				$scope.setLoggedInUser(user);
				$scope.ajaxing(true);
			};
			fnError = function (message) {
				$log.log("DatabitController::save ($q.reject)", arguments);
				$scope.error = message;
				$scope.ajaxing(true);
			};
			fnNotify = function () {
				$log.log("DatabitController::save ($q.notify)", arguments);
			};

			$scope.ajaxing();
			UserService.saveDatabit($scope.user.id, $scope.databit).then(fnSuccess, fnError, fnNotify);
		};
	}
];