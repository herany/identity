;(function (SprtId) { "use strict";
	var Self = SprtId.Controllers.Camera = function () {
		return [
			"$scope",
			"$log",
			"$cordovaCamera",
			function ($scope, $log, $cordovaCamera) {
				$log.info("CameraController", arguments);

				var fnSuccess, fnError, fnNotify;

				function setError (msg) {
					$scope.error = msg;
					$scope.success = !!$scope.error;
				}

				function setImageUri (imageUri) {
					$scope.imageUri = imageUri;
				}
				setImageUri();

				fnSuccess = function (imageUri) {
					$log.log("CameraController#takePicture (success)", arguments);

					setImageUri(imageUri);
					setError(null);
					$scope.$emit(Self.events.getImage, imageUri);
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
						destinationType: Camera.DestinationType.FILE_URI,
						sourceType: Camera.PictureSourceType.CAMERA,
						allowEdit: true,
						encodingType: Camera.EncodingType.JPEG,
						mediaType: Camera.MediaType.PICTURE
						// See all the possible Camera options from the Camera docs:
						// https://github.com/apache/cordova-plugin-camera/blob/master/doc/index.md#cameraoptions
					}).then(fnSuccess, fnError, fnNotify);
				};

				$scope.choosePicture = function () {
					$cordovaCamera.getPicture({
						quality: 75,
						destinationType: Camera.DestinationType.FILE_URI,
						sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
						allowEdit: true,
						encodingType: Camera.EncodingType.JPEG,
						mediaType: Camera.MediaType.PICTURE
						// See all the possible Camera options from the Camera docs:
						// https://github.com/apache/cordova-plugin-camera/blob/master/doc/index.md#cameraoptions
					}).then(fnSuccess, fnError, fnNotify);
				};
			}
		];
	};

	Self.events = {
		getImage: "camera:getImage"
	};
	Self.constants = {
		transparentImage: "R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
	};
})(window.SprtId);
