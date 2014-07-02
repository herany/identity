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

		$scope.databit = {}; // initialize in order to pass to the databit directive
		var u = $scope.getLoggedInUser();
		$scope.editable = $scope.user && u && u.id === $scope.user.id; // or dependants
		if ($scope.editable) {
			$scope.title = $filter("fullName")($scope.user);
		}

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
			// show ajaxing indicator
			UserService
				.saveDatabit($scope.user.id, dataBit)
				.then(function () {
					// hide ajaxing indicator
					fnSuccess.apply(this, arguments);
					$scope.databit = {};
					$scope.databitModal.hide();
				}, function () {
					// hide ajaxing indicator
					fnError.apply(this, arguments);
				}, fnNotify)
				;
		};

		// Open our new task modal
		$scope.newDatabit = function () {
			$scope.databitModal.show();
		};

		// Open our new task modal
		$scope.newPhotoDatabit = function () {
			$scope.databit = {
				type: "photo"
			};
			$scope.databitModal.show();
		};

		$scope.editDatabit = function () {
			// show ajaxing indicator
			UserService.editDatabit($scope.user.id, $scope.databit)
				.then(function () {
					// hide ajaxing indicator
					fnSuccess.apply(this, arguments);
				}, function () {
					// hide ajaxing indicator
					fnError.apply(this, arguments);
				}, fnNotify)
				;
		};

		$scope.deleteDatabit = function (databit) {
			// show ajaxing indicator
			UserService.deleteDatabit($scope.user.id, databit.id)
				.then(function () {
					// hide ajaxing indicator
					fnSuccess.apply(this, arguments);
				}, function () {
					// hide ajaxing indicator
					fnError.apply(this, arguments);
				}, fnNotify)
				;
		};

		// Close the new task modal
		$scope.closeNewDatabit = function () {
			$scope.databitModal.hide();
		};
	}
];

var BarcodeUserControllerDefinition = [
	"$scope",
	"$log",
	"$state",
	"$stateParams",
	"UserService",
	function ($scope, $log, $state, $stateParams, UserService) {
		"use strict";
		$log.info("BarcodeUserController", arguments);

		if ($stateParams.barcode) {
			UserService.userByBarcode($stateParams.barcode)
				.then(function (user, status, headers, config) {
					$state.go("app.user", {id: user.id});
				}, function (message, status, headers, config) {
					$scope.success = false;
					$scope.message = message;
				});
		} else {
			$scope.user = $scope.getLoggedInUser();
		}
	}
];