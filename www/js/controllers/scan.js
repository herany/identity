var ScanControllerDefinition = [
	"$scope",
	"$log",
	"$location",
	function($scope, $log, $location) {
		"use strict";
		$log.info("ScanController", arguments);

		$scope.title = "Scanning";
		$scope.response = "";
		$scope.success = null;
		$scope.barcode = null;

		$scope.onSuccess = function (scanRespose) {
			$log.info("ScanController :: ~ctor (success)", scanRespose);

			$scope.success = !!scanRespose;
			if ($scope.success) {
				$scope.$apply(function() {
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
			$scope.$apply(function() {
				$scope.title = "Failure";
				$scope.response = JSON.stringify(scanRespose);
			});
		};

		$scope.gotoUser = function (e) {
			if (e) {
				e.preventDefault();
			}

			$location.path("/user/" + $scope.barcode).replace();
		};
	}
];