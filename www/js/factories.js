/*jshint smarttabs:true */

;(function (angular, apiBaseUrl, undefined) {
	"use strict";

	angular.module("sprtidApp.factories", [])
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
			    APP_ID_URL_PATTERN = apiBaseUrl + "/app/id/" + URL_TOKEN_ID;

			return {
				fetch: fetch
			};

			function fetch (id, fnCallback) {
				var url = APP_ID_URL_PATTERN.replace(URL_TOKEN_ID, id);

				return $http.get(url).success(function(data) {
					if(typeof(fnCallback) === 'function') {
						fnCallback.call(null, data.success, data.content);
					}

					$log.log("identityProvider response: ", data);
				});
			}
		}])
	;
})(angular, "http://localhost:1212");
