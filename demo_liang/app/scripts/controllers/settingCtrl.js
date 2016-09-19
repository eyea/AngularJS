'use strict';

angular.module('businessApp')
    .controller('settingCtrl', ['$rootScope', '$scope', 'apiService', '$window', '$location', '$ionicPopup',
        '$ionicActionSheet', 'Api', '$ionicLoading', '$ionicHistory', '$timeout',
        function($rootScope, $scope, apiService, $window, $location, $ionicPopup, $ionicActionSheet, Api, $ionicLoading, $ionicHistory, $timeout) {
            var api = new Api();

            $scope.commonData = {};
            $scope.data = {};

            var storageKey = 'businessCenterSetting';
            $scope.data.serverData = api.localStorage.get(storageKey);

            apiService.getCommonData().then(function(commonDataFromApi) {
                apiService.setCommonData(commonDataFromApi);
                $scope.commonData = angular.extend({}, commonDataFromApi);
            });

            function initPage() {
                api.request({
                    url: '{{getBusinessInfoApi}}',
                    method: 'POST',
                    cache: true,
                    data: {}
                }).then(function(res) {
                    res = res.data;

                    if (res.errno === 'C0000') {
                        $scope.data.serverData = res.data;
                        // alert(res.data);
                        api.localStorage.set(storageKey, $scope.data.serverData);
                        $scope.$apply();
                    } else {
                        $scope.errorFlag = true;
                        window.toastError(res.errmsg);
                    }
                }, function() {
                    window.toastError('数据获取失败');
                });
            }

            $scope.changeLogo = function(img) {
                $rootScope.logo = img;
                $scope.data.serverData.logo = img;
                $scope.$apply();

                $ionicLoading.show({
                    template: '<ion-spinner icon="ios-small"></ion-spinner><br>更换LOGO...',
                    noBackdrop: true
                });

                // setTimeout(function(){
                //   $ionicLoading.hide();
                //   window.toastError('更换LOGO超时');
                // },5000);

                api.request({
                    url: '{{modifyBusinessInfoApi}}',
                    method: 'POST',
                    data: {
                        logo: img
                    }
                }).then(function(res) {
                    res = res.data;
                    $ionicLoading.hide();

                    if (res.errno === 'C0000') {
                        window.toast('更换LOGO成功');

                        $timeout(function() {
                            // $location.path('#/index');
                            $ionicHistory.goBack();
                        }, 1500);
                    } else {
                        window.toastError(res.errmsg);
                    }
                }, function() {
                    $ionicLoading.hide();
                    window.toastError('网络错误！');
                });
            };

            //百度统计代码
            $scope.trackEvent = function(key, callback) { //key： such as '/center/business/统计logo点击'
                var cbk = null;
                if (callback && angular.isFunction(callback)) {
                    cbk = callback;
                }
                window.TrackEvent && window.TrackEvent.trackEvent('/center/business/' + key, cbk, cbk);
            };

            $scope.$on('$ionicView.beforeEnter', function() {
                window.SetTitle.setTitle('设置');
            });

            $scope.$on('$ionicView.enter', function(ev) {
                if (ev.targetScope !== $scope) {return;}

                initPage();
            });
        }
    ]);
