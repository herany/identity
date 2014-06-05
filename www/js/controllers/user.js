var UserControllerDefinition = [
	"$scope",
	"$log",
	"$stateParams",
	"$ionicModal",
	"$filter",
	"UserService",
	function ($scope, $log, $stateParams, $ionicModal, $filter, UserService) {
		"use strict";
		$log.info("UserController", arguments);

		var fnSuccess, fnError, fnNotify;

		if ($stateParams.id) {
			UserService.user($stateParams.id)
				.then(function (data, status, headers, config) {
					$scope.user = data;
				}, function (data, status, headers, config) {
					$scope.user = null;
				});
		} else {
			$scope.user = $scope.getLoggedInUser();
		}

		fnSuccess = function (user) {
			$log.log("UserController::save ($q.resolve)", arguments);
			$scope.success = true;
			var u = $scope.getLoggedInUser();
			if (u && user && u.id === user.id) {
				$scope.setLoggedInUser(user);
			}
			$scope.user = user;
		};
		fnError = function (message) {
			$log.log("UserController::save ($q.reject)", arguments);
			$scope.error = message;
		};
		fnNotify = function () {
			$log.log("UserController::save ($q.notify)", arguments);
		};

		$scope.save = function () {
			UserService
				.save($scope.user)
				.then(fnSuccess, fnError, fnNotify)
				;
		};

		// Create and load the Modal
		$ionicModal.fromTemplateUrl("/templates/databit.html", function (modal) {
			$scope.databitModal = modal;
		}, {
			scope: $scope,
			animation: "slide-in-up"
		});

		// Called when the form is submitted
		$scope.saveDatabit = function (formObj) {
			var dataBit = {
				type: formObj.type
			};
			angular.extend(dataBit, formObj[formObj.type]);
			// ajaxing indicator
			UserService
				.saveDatabit($scope.getLoggedInUser(), dataBit)
				.then(function () {
					// hide ajaxing indicator
					fnSuccess.apply(this, arguments);
					$scope.databitModal.hide();
				}, function () {
					// hide ajaxing indicator
					fnError.apply(this, arguments);
				}, fnNotify)
				;
		};

		// Open our new task modal
		$scope.newDatabit = function() {
			$scope.databitModal.show();
		};

		// Close the new task modal
		$scope.closeNewDatabit = function() {
			$scope.databitModal.hide();
		};
	}
];