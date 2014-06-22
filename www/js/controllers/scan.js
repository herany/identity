var ScanControllerDefinition = [
	"$scope",
	"$log",
	"$ionicPlatform",
	"$location",
	function($scope, $log, $ionicPlatform, $location) {
		"use strict";
		$log.info("ScanController", arguments);

		$scope.title = "Scanning";
		$scope.response = "";
		$scope.success = null;
		$scope.barcode = null;

		$ionicPlatform.ready(function () {
			if (cordova && cordova.plugins.screenorientation) {
				var so = cordova.plugins.screenorientation;
				so.setOrientation(so.Orientation.LANDSCAPE);
			}
		});

		$scope.onSuccess = function (scanRespose) {
			$log.info("ScanController :: ~ctor (success)", scanRespose);

			$scope.success = !!scanRespose;
			if ($scope.success) {
				$scope.$apply(function () {
					$scope.title = "Success";
					$scope.response = JSON.stringify(scanRespose);

					$scope.barcode = scanRespose.text.replace(/^.*\/([^?#]+).*/i, "$1");
					$scope.gotoUser();
				});
			} else {
				// todo: handle error
			}
		};

		$scope.onError = function (scanRespose) {
			$log.info("ScanController :: ~ctor (error)", scanRespose);

			$scope.success = false;
			$scope.$apply(function () {
				$scope.title = "Failure";
				$scope.response = JSON.stringify(scanRespose);
			});
		};

		$scope.scanBarcode = function () {
			// $state.go("app.user");
			$location.path("/user/" + $scope.barcode + "/scan").replace();
		};
	}
];