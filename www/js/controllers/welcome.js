;(function (SprtId) { "use strict";
	var Self = SprtId.Controllers.Welcome = function () {
		return [
			"$scope",
			"$state",
			"$ionicSlideBoxDelegate",
			function ($scope, $state, $ionicSlideBoxDelegate) {				
				$scope.skipPreBoard = function() {
					$ionicSlideBoxDelegate.slide(4);
				};				
				$scope.next = function() {
					$ionicSlideBoxDelegate.next();
				};
				$scope.previous = function() {
					$ionicSlideBoxDelegate.previous();
				};

				// Called each time the slide changes
				$scope.slideChanged = function(index) {
					$scope.slideIndex = index;
				};
			}
		];
	};
})(window.SprtId);