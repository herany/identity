;(function (APP_NAME, angular, apiBaseUrl, undefined) {
	"use strict";

	angular.module(APP_NAME + ".factories", [])
		// .factory('cordovaReady', function() {
		// 	return function (fn) {
		// 		var queue = [];

		// 		var impl = function () {
		// 			queue.push(Array.prototype.slice.call(arguments));
		// 		};

		// 		document.addEventListener('deviceready', function () {
		// 			queue.forEach(function (args) {
		// 				fn.apply(this, args);
		// 			});
		// 			impl = fn;
		// 		}, false);

		// 		return function () {
		// 			return impl.apply(this, arguments);
		// 		};
		// 	};
		// })
		.factory("$identityFactory", ["$http", "$log", function($http, $log) {
			var URL_TOKEN_ID = "#{id}",
			    APP_ID_URL_PATTERN = apiBaseUrl + "/identities/" + URL_TOKEN_ID;

			return {
				fetch: fetch
			};

			function fetch (id, fnCallback) {
				var url = APP_ID_URL_PATTERN.replace(URL_TOKEN_ID, id);

				// test to see if you can add several done methods.
				$http.get(url).done(function () {
					console.log("first!", arguments);
				}).done(function () {
					console.log("second!", arguments);
				});

				return $http.get(url).success(function(data) {
					if(typeof(fnCallback) === 'function') {
						fnCallback.call(null, data.success, data.content);
					}

					$log.log("identityProvider response: ", data);
				});
			}
		}])
		.factory('UserService', ['AccessLevel', function (AccessLevel) {
			var user = {
				state: AccessLevel.PUBLIC,
				username: '',
				isLoggedIn: function () {
					return this.state > AccessLevel.PUBLIC;
				},
				canAccess: function (accessLevel) {
					return !!(accessLevel & this.state);
				}
			};
			return user;
		}])
	;
})("sprtidApp", angular, "http://localhost:1212/v1");
