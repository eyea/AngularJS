/**
依赖，ng-cordova
*/

angular.module("businessApp")
    .directive("imgUploadDirective", [
        '$q', '$window', '$parse',
        '$cordovaCamera', '$cordovaActionSheet', '$cordovaKeyboard', '$ionicActionSheet',
        '$ionicLoading',
        function(
            $q, $window, $parse,
            $cordovaCamera, $cordovaActionSheet, $cordovaKeyboard, $ionicActionSheet,
            $ionicLoading
        ) {
            return {
                restrict: 'E',
                transclude: true,
                scope: {
                    img: '=',
                    onImgChange: '&'
                },
                template: function() {
                    var _html = '';
                    _html += '<div ng-click="uploadClick()" class="upload-img">';
                    _html += '<img ng-src="{{img}}">';
                    _html += '</div>';
                    return _html;
                },
                link: function(scope, element, attrs) {
                    console.log($cordovaActionSheet);
                    scope.paddingImgNum = 0;
                    scope.limitupImageNum = attrs.limitupImageNum * 1;
                    scope.uploadClick = function() {
                        $ionicActionSheet.show({
                            buttons: [
                                { text: '拍照' },
                                { text: '相册' }
                            ],
                            cancelText: '取消',
                            cancel: function() {},
                            buttonClicked: function(index) {
                                if (index == 0) {
                                    $cordovaCamera.getPicture({
                                        quality: 100,
                                        destinationType: window.Camera.DestinationType.FILE_URI,
                                        sourceType: window.Camera.PictureSourceType.CAMERA,
                                        encodingType: window.Camera.EncodingType.JPEG,
                                        targetWidth: 500,
                                        targetHeight: 500,
                                        popoverOptions: window.CameraPopoverOptions,
                                        correctOrientation: true
                                    }).then(function(imageURI) {
                                        //alert(imageURI);
                                        imgUploadFun(imageURI);
                                    }, function() {
                                        window.toastError('获取相片数据失败');
                                    });
                                } else if (index == 1) {
                                    navigator.camera.getPicture(function(imageURI) {
                                        scope.paddingImgNum++;
                                        imgUploadFun(imageURI);
                                    }, function() {
                                        window.toastError('获取相片数据失败');
                                    }, {
                                        quality: 100,
                                        destinationType: window.Camera.DestinationType.FILE_URI,
                                        sourceType: window.Camera.PictureSourceType.PHOTOLIBRARY
                                    });
                                }
                                return true;
                            }
                        });
                    };
                    function uploadImageTest(imgURItest) {
                        var d = $q.defer();

                        $window.ImageUpload.uploadImage(imgURItest, function(uploadImgUrl) {
                            d.resolve(uploadImgUrl);
                        }, function(e) {
                            d.reject(e);
                        });
                        return d.promise;
                    }
                    function imgUploadFun(imgURI) {
                        try {
                            $ionicLoading.show({
                                template: '<ion-spinner icon="ios"></ion-spinner><br>上传中...',
                                noBackdrop: true
                            });

                            uploadImageTest(imgURI).then(function(uploadImgUrl) {
                                $ionicLoading.hide();

                                scope.img = uploadImgUrl;

                                scope.onImgChange({
                                    img: uploadImgUrl
                                });
                            }, function(e) {
                                $ionicLoading.hide();

                                alert(e);
                            });
                        } catch (e) {
                            alert(e);
                        }
                    }
                }
            };
        }
    ]);
