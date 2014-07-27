;(function (SprtId) { "use strict";
	var Self = SprtId.Controllers.Checkin = function () {
		return [
			"$scope",
			"$log",
			"UserService",
			function ($scope, $log, UserService) {
				// if user has children, prompt for who is checking in

				$scope.ajaxing();
				UserService.user()
					.then(function (user) {
						$scope.user = user; // this seems odd
					}, function (message) {
						$scope.user = null;
					})
					.finally(function () {
						$scope.ajaxing(true);
					});

				// add plugin: cordova plugin add org.apache.cordova.vibration
				// ping server for checkin record
				// vibrate/inform user that they are all set
			}
		];
	};
})(window.SprtId);
