var ScanControllerDefinition = [
	"$scope",
	"$log",
	"$state",
	"$ionicPlatform",
	"$cordovaBarcodeScanner",
	"$location",
	function($scope, $log, $state, $ionicPlatform, $cordovaBarcodeScanner, $location) {
		"use strict";
		$log.info("ScanController", arguments);

		$scope.title = "Scanning";
		$scope.response = "";
		$scope.success = null;
		$scope.barcode = {code: null};

		function gotoUser (barcodeOrUrl) {
			$state.go("app.barcode", {barcode: barcodeOrUrl});
		}

		$ionicPlatform.ready(function () {
			if (cordova && cordova.plugins.barcodeScanner) { // this conditional exists due to a lack of null checking in ngCordova
				$cordovaBarcodeScanner.scan().then(function (scanRespose) {
					$log.info("ScanController :: ~ctor (success)", scanRespose);

					$scope.success = !!scanRespose;
					if ($scope.success) {
						$scope.title = "Success";
						$scope.response = JSON.stringify(scanRespose);

						gotoUser(scanRespose.text);
						if(!$scope.$$phase) { $scope.$digest(); }
					} else {
						// todo: handle error
					}
				}, function (scanRespose) {
					$log.info("ScanController :: ~ctor (error)", scanRespose);

					$scope.success = false;
					$scope.title = "Failure";
					$scope.response = JSON.stringify(scanRespose);

					if(!$scope.$$phase) { $scope.$digest(); }
				});
			} else {
				$scope.success = false;
				$scope.title = "Scanner Unavailable";
			}
		});

		$scope.scanBarcode = function () {
			gotoUser($scope.barcode.code);
		};
	}
];