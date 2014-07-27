;(function (SprtId) { "use strict";
	var Self = SprtId.Controllers.Home = function () {
		return [
			"$scope",
			"$log",
			function ($scope, $log) {
				$scope.$parent.$watch("_loggedInUser", function(value){
					$scope.user = $scope.getLoggedInUser();
				});
				$scope.user = $scope.getLoggedInUser();
			}
		];
	};
})(window.SprtId);
