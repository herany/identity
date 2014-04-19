var AccessLevel = {
					PUBLIC: 0x1,
					PROTECTED: 0x2,
					PRIVATE: 0x4,
					ADMIN: 0x4
				};
var RoutingAccess = {
					PUBLIC: AccessLevel.PUBLIC | AccessLevel.PROTECTED | AccessLevel.PRIVATE | AccessLevel.ADMIN,
					PROTECTED: AccessLevel.PROTECTED | AccessLevel.PRIVATE | AccessLevel.ADMIN,
					PRIVATE: AccessLevel.PRIVATE | AccessLevel.ADMIN,
					ADMIN: AccessLevel.ADMIN,
				};

;(function (APP_NAME, angular, undefined) {
	'use strict';

	angular.module(APP_NAME + '.services', [])
		.value('version', '0.1')
		.service('CordovaService', ['$document', '$q', function ($document, $q) {
			var d = $q.defer(),
			    resolved = false;

			var self = this;
			this.ready = d.promise;

			document.addEventListener('deviceready', function () {
				resolved = true;
				d.resolve(window.cordova);
			});

			// Check to make sure we didn't miss the event or manually resolve for off-device testing
			setTimeout(function () {
				if (!resolved) {
					if (window.cordova) {
						d.resolve(window.cordova);
					}
				}
			}, 1500);
		}])
		.service('AccessLevel', [function () {
			return AccessLevel;
		}])
		.service('RoutingAccess', [function () {
			return RoutingAccess;
		}])
	;
})("sprtidApp", angular);
