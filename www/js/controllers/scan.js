var ScanControllerDefinition = [
	"$scope",
	"$log",
	"$ionicPlatform",
	"$cordovaBarcodeScanner",
	"$location",
	function($scope, $log, $ionicPlatform, $cordovaBarcodeScanner, $location) {
		"use strict";
		$log.info("ScanController", arguments);

		$scope.title = "Scanning";
		$scope.response = "";
		$scope.success = null;
		$scope.barcode = null;

		$ionicPlatform.ready(function () {
			if (cordova && cordova.plugins.barcodeScanner) { // this conditional exists due to a lack of null checking in ngCordova
				$cordovaBarcodeScanner.scan().then(function (scanRespose) {
					$log.info("ScanController :: ~ctor (success)", scanRespose);

					$scope.success = !!scanRespose;
					if ($scope.success) {
						$scope.title = "Success";
						$scope.response = JSON.stringify(scanRespose);

						$scope.gotoUser(scanRespose.text);
						if(!$scope.$$phase) {
							$scope.$digest();
						}
					} else {
						// todo: handle error
					}
				}, function (scanRespose) {
					$log.info("ScanController :: ~ctor (error)", scanRespose);

					$scope.success = false;
					$scope.title = "Failure";
					$scope.response = JSON.stringify(scanRespose);

					if(!$scope.$$phase) {
						$scope.$digest();
					}
				});
			} else {
				$scope.success = false;
				$scope.title = "Scanner Unavailable";
			}
		});

		$scope.scanBarcode = function () {
			$scope.gotoUser($scope.barcode);
		};

		$scope.gotoUser = function (barcodeOrUrl) {
			// $state.go("app.user");
			$location.path("/user/" + barcodeOrUrl + "/scan").replace();
		};
	}
];