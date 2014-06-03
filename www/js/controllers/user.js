var UserControllerDefinition = [
	"$scope",
	"$log",
	"$filter",
	"$stateParams",
	"$ionicModal",
	"UserService",
	function ($scope, $log, $filter, $stateParams, $ionicModal, UserService) {
		"use strict";
		$log.info("UserController", arguments);

		var fnSuccess, fnError, fnNotify;

		$scope.title = "My Profile";

		$scope.user = $scope.getUser();

		fnSuccess = function (user) {
			$log.log("UserController::save ($q.resolve)", arguments);
			$scope.success = true;
			var u = $scope.getUser();
			if (u && user && u.id === user.id) {
				$scope.setUser(user);
			}
			$scope.user = user;

			$scope.title = $filter("fullName")(user);
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
				.save($scope.user.id, $scope.user.email, $scope.user.firstName, $scope.user.lastName)
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
				.saveDatabit($scope.getUser(), dataBit)
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