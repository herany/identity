var UserControllerDefinition = [
	"$scope",
	"$log",
	"$stateParams",
	"$ionicModal",
	"$filter",
	"AppConfig",
	"UserService",
	function ($scope, $log, $stateParams, $ionicModal, $filter, AppConfig, UserService) {
		"use strict";
		$log.info("UserController", arguments);

		var fnSuccess, fnError, fnNotify;

		$scope.$watch("user", function(newValue, oldValue) {
			var u = $scope.getLoggedInUser();
			$scope.editable = u.id === $scope.user.id; // or dependants
			$scope.title = $filter("fullName")($scope.user);
		});

		if ($stateParams.id) {
			UserService.user($stateParams.id)
				.then(function (user, status, headers, config) {
					$scope.user = user;
				}, function (message, status, headers, config) {
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
		$ionicModal.fromTemplateUrl(AppConfig.templatesPath + "modals/databit.html", function (modal) {
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