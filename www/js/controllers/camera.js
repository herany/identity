;(function (SprtId) { "use strict";
	var Self = SprtId.Controllers.Camera = function () {
		return [
			"$scope",
			"$log",
			"$cordovaCamera",
			function ($scope, $log, $cordovaCamera) {
				var fnSuccess, fnError, fnNotify;

				function setImageUri (imageUri) {
					$scope.imageUri = imageUri;
				}
				setImageUri();

				fnSuccess = function (imageUri) {
					setImageUri(imageUri);
					$scope.$emit(Self.events.getImage, imageUri);
				};
				fnError = function (err) {
					$scope.setErrorMessage(err);
				};

				$scope.takePicture = function () {
					$scope.clearErrorMessage();
					$cordovaCamera.getPicture({
						quality: 75,
						destinationType: Camera.DestinationType.FILE_URI,
						sourceType: Camera.PictureSourceType.CAMERA,
						allowEdit: true,
						encodingType: Camera.EncodingType.JPEG,
						mediaType: Camera.MediaType.PICTURE
						// See all the possible Camera options from the Camera docs:
						// https://github.com/apache/cordova-plugin-camera/blob/master/doc/index.md#cameraoptions
					}).then(fnSuccess, fnError);
				};

				$scope.choosePicture = function () {
					$scope.clearErrorMessage();
					$cordovaCamera.getPicture({
						quality: 75,
						destinationType: Camera.DestinationType.FILE_URI,
						sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
						allowEdit: true,
						encodingType: Camera.EncodingType.JPEG,
						mediaType: Camera.MediaType.PICTURE
						// See all the possible Camera options from the Camera docs:
						// https://github.com/apache/cordova-plugin-camera/blob/master/doc/index.md#cameraoptions
					}).then(fnSuccess, fnError);
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
