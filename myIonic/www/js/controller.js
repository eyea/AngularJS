(function () {
    'use strict'
    angular
    .module('starter')
    .controller("homeCtrl", homeCtrl, ['$cordovaCamera'])

    function homeCtrl ($scope, $cordovaCamera) {
        $scope.openCamera = function () {
            var options = {
              quality: 50,
              destinationType: Camera.DestinationType.DATA_URL,
              sourceType: Camera.PictureSourceType.CAMERA,
              allowEdit: true,
              encodingType: Camera.EncodingType.JPEG,
              targetWidth: 100,
              targetHeight: 100,
              popoverOptions: CameraPopoverOptions,
              saveToPhotoAlbum: false
            };

            $cordovaCamera.getPicture(options).then(function(imageData) {
              var image = document.getElementById('myImage');
              image.src = "data:image/jpeg;base64," + imageData;
            }, function(err) {
              // error
            });
        }
    }

})();