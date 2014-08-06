;(function (SprtId) { "use strict";
	var Self = SprtId.Controllers.Scan = function () {
		return [
			"$scope",
			"$log",
			"$state",
			"$ionicPlatform",
			"$cordovaBarcodeScanner",
			"$location",
			function($scope, $log, $state, $ionicPlatform, $cordovaBarcodeScanner, $location) {
				$scope.title = "Scanning";
				$scope.response = "";
				$scope.barcode = {code: null};

				function gotoUser (barcodeOrUrl) {
					$state.go("app.barcode", {barcode: barcodeOrUrl});
				}

				$ionicPlatform.ready(function () {
					if (cordova && cordova.plugins.barcodeScanner) { // this conditional exists due to a lack of null checking in ngCordova
						$cordovaBarcodeScanner.scan().then(function (scanRespose) {
							if (scanRespose) {
								$scope.title = "Success";
								$scope.response = JSON.stringify(scanRespose);

								gotoUser(scanRespose.text);
								if(!$scope.$$phase) { $scope.$digest(); }
							} else {
								// todo: handle error
							}
						}, function (scanRespose) {
							$scope.title = "Failure";
							$scope.response = JSON.stringify(scanRespose);

							if(!$scope.$$phase) { $scope.$digest(); }
						});
					} else {
						$scope.title = "Scanner Unavailable";
					}
				});

				$scope.scanBarcode = function () {
					gotoUser($scope.barcode.code);
				};
			}
		];
	};
})(window.SprtId);
