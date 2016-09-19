'use strict';

angular.module('businessApp')
    .controller('indexCtrl', ['$rootScope', '$scope', 'apiService', '$window', '$location', 'Api', '$ionicLoading',
        function($rootScope, $scope, apiService, $window, $location, Api, $ionicLoading) {

            var api = new Api();

            $scope.commonData = {};
            var URLAPI = '{{getBusinessInfoApi}}';

            apiService.getCommonData().then(function(commonDataFromApi) {
                apiService.setCommonData(commonDataFromApi);
                $scope.commonData = angular.extend({}, commonDataFromApi);
            });

            // 优先从缓存中取
            var storageKey = 'businessCenterIndex' + $scope.commonData.memberID;
            $scope.data = api.localStorage.get(storageKey);

            if (!Object.keys($scope.data).length) {
                $ionicLoading.show({
                    template: '<ion-spinner icon="ios"></ion-spinner>',
                    noBackdrop: true
                });
            }

            $scope.initPage = function() {
                api.request({
                    url: URLAPI,
                    method: 'POST',
                    data: {}
                }).then(function(res) {
                    $scope.$broadcast('scroll.refreshComplete');
                    $ionicLoading.hide();

                    res = res.data || {};
                    res.data.settingList = concatListConf(res.data.settingList);
                    api.localStorage.set(storageKey, res.data);

                    if (res.errno === 'C0000') {
                        $scope.data = res.data;
                        $rootScope.logo = res.data.logo;
                        $scope.$apply();
                    } else {
                        $scope.errorFlag = true;
                        window.toastError(res.errmsg);
                    }
                }, function() {
                    $ionicLoading.hide();
                    $scope.$broadcast('scroll.refreshComplete');
                    window.toastError('数据获取失败');
                });
            };

            // 设置列表：文案和是否显示后端控制，icon和链接前端控制
            function concatListConf(settingList) {
                var settingListConf = {
                    'reduce': {
                        img: './images/businessReduce.png',
                        href: '/discount'
                    },
                    'deliver': {
                        img: './images/businessDeliver.png',
                        href: '/sendInfo'
                    },
                    'setting': {
                        img: './images/businessSetting.png',
                        href: '/setting'
                    }
                };

                angular.forEach(settingList, function(value, key) {
                    if (settingListConf[key]) {
                        settingList[key]['img'] = settingListConf[key]['img'];
                        settingList[key]['href'] = settingListConf[key]['href'];
                    }
                });

                return settingList;
            }

            $scope.openUrl = function(url) {
                $location.path(url);
            };
                //百度统计代码
            $scope.trackEvent = function(key, callback) { //key： such as '/center/business/统计logo点击'
                var cbk = null;
                if (callback && angular.isFunction(callback)) {
                    cbk = callback;
                }
                TrackEvent && TrackEvent.trackEvent('/center/business/' + key, cbk, cbk);
            };
            $scope.longTouchCopy = function(text) {
                window.successCbk = function() { window.toast('复制成功！'); };
                window.failCbk = function() { window.toastError('复制失败！'); };
                window.cordova.plugins.clipboard.copy(text, window.successCbk, window.failCbk);
            };

            $scope.$on('$ionicView.beforeEnter', function() {
                window.SetTitle.setTitle('我是商家');
            });

            $scope.$on('$ionicView.enter', function() {
                $scope.initPage();
            });
        }
    ]);
