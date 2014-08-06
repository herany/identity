;(function (SprtId) { "use strict";
	var Self = SprtId.Controllers.User = function () {
		return [
			"$scope",
			"$log",
			"$stateParams",
			"$ionicModal",
			"$filter",
			"AppConfig",
			"UserService",
			function ($scope, $log, $stateParams, $ionicModal, $filter, AppConfig, UserService) {
				var fnSuccess, fnError;

				function initializeDatabit (type) {
					$scope.databit = {
						type: type || "",
						birthday: {
							visibility: 'protected' // move to constant
						},
						phone: {
							visibility: 'private' // move to constant
						},
						photo: {
							visibility: 'protected' // move to constant
						},
						health: {
							visibility: 'protected' // move to constant
						},
						other: {
							visibility: 'public' // move to constant
						},
						imageUr: ""
					};
				}
				initializeDatabit(); // initialize in order to pass to the databit directive

				var u = $scope.getLoggedInUser();
				$scope.editable = $scope.user && u && u.id === $scope.user.id; // or dependants
				if ($scope.editable) {
					$scope.title = $filter("fullName")($scope.user);
				}

				if ($stateParams.id) {
					$scope.ajaxing();
					$scope.clearErrorMessage();
					UserService.user($stateParams.id)
						.then(function (user, status, headers, config) {
							$scope.user = user;
						}, function (message, status, headers, config) {
							$scope.setErrorMessage(message);
							$scope.user = null;
						})
						.finally(function () {
							$scope.ajaxing(true);
						});
				} else {
					$scope.user = $scope.getLoggedInUser();
				}

				fnSuccess = function (user) {
					var u = $scope.getLoggedInUser();
					if (u && user && u.id === user.id) {
						$scope.setLoggedInUser(user);
					}
					$scope.user = user;
				};
				fnError = function (message) {
					$scope.setErrorMessage(message);
				};

				$scope.clearErrorMessage();
				$scope.save = function () {
					$scope.ajaxing();
					UserService
						.save($scope.user)
						.then(fnSuccess, fnError)
						.finally(function () {
							$scope.ajaxing(true);
						});
				};

				$scope.$on(SprtId.Controllers.Camera.events.getImage, function (event, imageUri) {
					$scope.databit.imageUri = imageUri;
				});

				// Create and load the Modal
				$ionicModal.fromTemplateUrl(AppConfig.templatesPath + "modals/databit.html", function (modal) {
					$scope.databitModal = modal;
				}, {
					scope: $scope,
					animation: "slide-in-up"
				});

				// Called when the form is submitted
				$scope.saveDatabit = function (formObj) {
					var fn, dataBit = {
						type: formObj.type
					};
					angular.extend(dataBit, formObj[formObj.type]);

					fn = dataBit.type === "photo" ? UserService.saveDatabitWithImage : UserService.saveDatabit;

					$scope.ajaxing();
					$scope.clearErrorMessage();
					fn($scope.user.id, dataBit, formObj.imageUri)
						.then(function () {
							fnSuccess.apply(this, arguments);
							initializeDatabit();
							$scope.databitModal.hide();
						}, function () {
							fnError.apply(this, arguments);
						})
						.finally(function () {
							$scope.ajaxing(true);
						})
						;
				};

				// Open our new task modal
				$scope.newDatabit = function () {
					$scope.databitModal.show();
				};

				// Open our new task modal
				$scope.newPhotoDatabit = function () {
					initializeDatabit("photo");
					$scope.databitModal.show();
				};

				$scope.editDatabit = function () {
					$scope.ajaxing();
					$scope.clearErrorMessage();
					UserService.editDatabit($scope.user.id, $scope.databit)
						.then(function () {
							fnSuccess.apply(this, arguments);
						}, function () {
							fnError.apply(this, arguments);
						})
						.finally(function () {
							$scope.ajaxing(true);
						});
				};

				$scope.deleteDatabit = function (databit) {
					$scope.ajaxing();
					$scope.clearErrorMessage();
					UserService.deleteDatabit($scope.user.id, databit.id)
						.then(function () {
							fnSuccess.apply(this, arguments);
						}, function () {
							fnError.apply(this, arguments);
						})
						.finally(function () {
							$scope.ajaxing(true);
						});
				};

				// Close the new task modal
				$scope.closeNewDatabit = function () {
					$scope.databitModal.hide();
				};
			}
		];
	};
})(window.SprtId);

;(function (SprtId) { "use strict";
	var Self = SprtId.Controllers.BarcodeUser = function () {
		return [
			"$scope",
			"$log",
			"$state",
			"$stateParams",
			"UserService",
			function ($scope, $log, $state, $stateParams, UserService) {
				if ($stateParams.barcode) {
					$scope.ajaxing();
					$scope.clearErrorMessage();
					UserService.userByBarcode($stateParams.barcode)
						.then(function (user, status, headers, config) {
							$state.go("app.user", {id: user.id});
						}, function (message, status, headers, config) {
							$scope.setErrorMessage(message);
						})
						.finally(function () {
							$scope.ajaxing(true);
						});
				} else {
					$scope.user = $scope.getLoggedInUser();
				}
			}
		];
	};
})(window.SprtId);
