var DatabitControllerDefinition = [
	"$scope",
	"$log",
	"DatabitService",
	"$stateParams",
	function ($scope, $log, DatabitService, $stateParams) {
		"use strict";
		$log.info("DatabitController", arguments);

		$scope.databit = {
			birthday: {
				visibility: 'protected' // move to contant
			},
			phone: {
				visibility: 'private' // move to contant
			},
			health: {
				visibility: 'protected' // move to contant
			},
			other: {
				visibility: 'public' // move to contant
			}
		};

		DatabitService.user($stateParams.id).then(function (data, status, headers, config) {
			console.log("DatabitService::login (success!)", data);
			$scope.user = data;
		}, function (data, status, headers, config) {
			console.log("DatabitService::login (error)", data, status);
			$scope.user = null;
		});

		$scope.save = function () {
			var fnSuccess, fnError, fnNotify;

			fnSuccess = function (user) {
				$log.log("DatabitController::save ($q.resolve)", arguments);
				$scope.success = true;
				$scope.setUser(user);
			};
			fnError = function (message) {
				$log.log("DatabitController::save ($q.reject)", arguments);
				$scope.error = message;
			};
			fnNotify = function () {
				$log.log("DatabitController::save ($q.notify)", arguments);
			};

			UserService.saveDatabit($scope.databit).then(fnSuccess, fnError, fnNotify);
		};
	}
];