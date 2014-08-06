;(function (SprtId) { "use strict";
	var Self = SprtId.Controllers.Databit = function () {
		return [
			"$scope",
			"$log",
			"$stateParams",
			"DatabitService",
			function ($scope, $log, $stateParams, DatabitService) {
				$scope.ajaxing();
				DatabitService.user($stateParams.id)
					.then(function (data, status, headers, config) {
						$scope.user = data;
					}, function (data, status, headers, config) {
						$scope.user = null;
					})
					.finally(function () {
						$scope.ajaxing(true);
					});

				$scope.save = function () {
					var fnSuccess, fnError;

					fnSuccess = function (user) {
						$scope.setLoggedInUser(user);
					};
					fnError = function (message) {
						$scope.setErrorMessage(message);
					};

					$scope.ajaxing();
					$scope.clearErrorMessage();
					UserService.saveDatabit($scope.user.id, $scope.databit)
						.then(fnSuccess, fnError, fnNotify)
						.finally(function () {
							$scope.ajaxing(true);
						});
				};
			}
		];
	};
})(window.SprtId);
