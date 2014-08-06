;(function (SprtId) { "use strict";
	var Self = SprtId.Controllers.Memberships = function () {
		return [
			"$scope",
			"$log",
			"$filter",
			"$ionicModal",
			"AppConfig",
			"UserService",
			"OrganizationService",
			function ($scope, $log, $filter, $ionicModal, AppConfig, UserService, OrganizationService) {
				var user = $scope.getLoggedInUser();
				$scope.memberships = user ? user.memberships : [];

				// Create and load the Modal
				$ionicModal.fromTemplateUrl(AppConfig.templatesPath + "modals/memberships.html", function (modal) {
					$scope.membershipModal = modal;
				}, {
					scope: $scope,
					animation: "slide-in-up"
				});

				// Called when the form is submitted
				$scope.requestMembership = function (membership) {
					var user, organizations, organization;

					user = $scope.getLoggedInUser();
					organizations = $filter("filter")($scope.organizations, {id: membership.organizationId}, true);

					if (!organizations || !organizations.length) {
						$scope.setErrorMessage("Could not Organization");
						return;
					}

					organization = organizations[0];

					$scope.ajaxing();
					$scope.clearErrorMessage();
					UserService.requestMembership(user.id, membership.organizationId, membership.memberId)
						.then(function (data) {
							$scope.memberships = data ? data.memberships : [];
							$scope.membershipModal.hide();
						}, function () {
							$scope.setErrorMessage("Your membership request for " + organization.name + " has failed.");
						})
						.finally(function () {
							$scope.ajaxing(true);
						})
						;
				};

				// Open our new task modal
				$scope.newMembership = function () {
					$scope.requestingOrganizations = true;
					$scope.organizationForm = {};
					$scope.clearErrorMessage();
					OrganizationService.all()
						.then(function (organizations) {
							$scope.organizations = organizations;
						}, function (message) {
							$scope.setErrorMessage("Failed to get organizations. The <span class='wordmark'>SPRTID</span> team has been notified. Please try again later");
							$scope.cancelNewMembership();
						})
						.finally(function () {
							$scope.requestingOrganizations = true;
							$scope.ajaxing(true);
						});
					$scope.membership = {};
					$scope.membershipModal.show();
				};

				// Close the new task modal
				$scope.cancelNewMembership = function () {
					$scope.membershipModal.hide();
				};
			}
		];
	};
})(window.SprtId);
