;(function (SprtId) { "use strict";
	var Self = SprtId.Controllers.Preregister = function () {
		return [
			"$scope",
			"$log",
			"UserService",
			"EventService",
			"$filter",
			function ($scope, $log, UserService, EventService, $filter) {
				// if user has children, prompt for who is checking in

				$scope.current = $scope.current || {};
				$scope.getCurrentOrganization = function (property, defaultValue) {
					var o = $scope.current.organization;
					if (o && property) {
						return o[property] || defaultValue;
					}
					return o;
				};
				$scope.setCurrentOrganization = function (organization) {
					$scope.current.organization = organization;
					$scope.clearCurrentEvent();

					$scope.listEvents(organization); // what is best practice here?  should there be a $watch statement somewhere else?
				};
				$scope.hasCurrentOrganization = function (organization) {
					return $scope.current.organization && $scope.current.organization.id;
				};
				$scope.hasOrganizations = function () {
					return !!($scope.organizations && $scope.organizations.length);
				};
				$scope.clearCurrentOrganization = function () {
					$scope.current.organization = null;
				};
				$scope.getCurrentEvent = function () {
					return $scope.current.event;
				};
				$scope.setCurrentEvent = function (event) {
					$scope.current.event = event;
				};
				$scope.hasCurrentEvent = function (event) {
					return $scope.current.event && $scope.current.event.id;
				};
				$scope.clearCurrentEvent = function () {
					$scope.current.event = null;
				};
				$scope.hasEvents = function () {
					if (!$scope.hasCurrentOrganization()) { return; }

					return !!($scope.events && $scope.events.length);
				};

				$scope.fetchingEvents = false;
				$scope.listEvents = function (organization) {
					$scope.fetchingEvents = true;
					$scope.ajaxing();
					$scope.clearErrorMessage();
					EventService.list(organization.id)
						.then(function (events) {
							$scope.events = events;
							$scope.unregisteredEvents = $filter("unregisteredEvents")(events, $scope.getCurrentUser())
						}, function (message) {
							$scope.setErrorMessage(message);
							$scope.unregisteredEvents = $scope.events = null;
						})
						.finally(function () {
							$scope.ajaxing(true);
							$scope.fetchingEvents = false;
						});
				};

				$scope.preregister = function () {
					var user, organization, event;

					user = $scope.getCurrentUser();
					organization = $scope.getCurrentOrganization();
					event = $scope.getCurrentEvent();

					$scope.ajaxing();
					$scope.clearErrorMessage();
					UserService.preregister(user.id, organization.id, event.id)
						.then(function () {

						}, function (message) {
							$scope.setErrorMessage(message);
						})
						.finally(function () {
							$scope.ajaxing(true);
						});
				};

				var user = $scope.getCurrentUser();
				$scope.organizations = user && user.memberships ? $filter("getUserOrganizations")(user) : [];
				$scope.events = [];
				// check state params, preset org/event
				if ($scope.organizations.length === 1) {
					$scope.current.organization = $scope.organizations[0];
					$scope.listEvents($scope.current.organization);
				}
			}
		];
	};
})(window.SprtId);
