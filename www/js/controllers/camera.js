var CameraControllerDefinition = [
	"$scope",
	"$log",
	"$cordovaCamera",
	function ($scope, $log, $cordovaCamera) {
		"use strict";
		$log.info("CameraController", arguments);

		var fnSuccess, fnError, fnNotify;
		var TRANSPARENT_IMAGE = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

		function setError (msg) {
			$scope.error = msg;
			$scope.success = !!$scope.error;
		}

		function setImageSource (source) {
			$scope.imageSource = source;
			$scope.safemageSource = $scope.imageSource || TRANSPARENT_IMAGE;
		}
		setImageSource();

		fnSuccess = function (imageData) {
			$log.log("CameraController#takePicture (success)", arguments);

			setImageSource(imageData);
			setError(null);
		};
		fnError = function (err) {
			$log.log("CameraController#takePicture (failure)", arguments);

			setError(err);
		};
		fnNotify = function () {
			$log.log("CameraController#takePicture (notify)", arguments);
		};

		$scope.takePicture = function () {
			$cordovaCamera.getPicture({
				quality: 75,
				destinationType: Camera.DestinationType.DATA_URL,
				sourceType: Camera.PictureSourceType.CAMERA,
				allowEdit: true,
				encodingType: Camera.EncodingType.JPEG,
				mediaType: Camera.MediaType.PICTURE
				// See all the possible Camera options from the Camera docs:
				// https://github.com/apache/cordova-plugin-camera/blob/master/doc/index.md#cameraoptions
			}).then(fnSuccess, fnError, fnNotify);
		};
	}
];