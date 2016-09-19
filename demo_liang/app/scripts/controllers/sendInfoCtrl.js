'use strict';

angular.module('businessApp')
    .controller('sendInfoCtrl', ['$scope', 'apiService', '$window', '$location', '$ionicPopup', '$ionicActionSheet', 'Api', '$timeout', '$ionicHistory',
        function($scope, apiService, $window, $location, $ionicPopup, $ionicActionSheet, Api, $timeout, $ionicHistory) {
            var api = new Api();

            $scope.commonData = {};
            $scope.data = {};
            $scope.data.name = '';
            $scope.data.phone = '';
            $scope.data.addr = '';
            $scope.data.isEdit = false;
            $scope.data.requesting = false;
            $scope.btnContent = '提交申请';

            var storageKey = 'businessCenterSendInfo';
            $scope.data.serverData = api.localStorage.get(storageKey);

            apiService.getCommonData().then(function(commonDataFromApi) {
                apiService.setCommonData(commonDataFromApi);
                $scope.commonData = angular.extend({}, commonDataFromApi);
            });

            $scope.businessNameChange = function() {
                $scope.data.serverData.name = $scope.data.serverData.name.replace(/[^\u4E00-\u9FA5]/g, "");
            };

            function initPage() {
                api.request({
                    url: "{{sendInfoApi}}",
                    method: 'POST',
                    data: {
                        action: 'get'
                    }
                }).then(function(res) {
                    res = res.data;

                    if (res.errno === 'C0000') {
                        if (!res.data) {
                            window.toastError('数据错误');
                        } else {
                            $scope.data.serverData = res.data;
                            api.localStorage.set(storageKey, $scope.data.serverData);
                            $scope.$apply();
                        }
                    } else {
                        window.toastError(res.errmsg);
                    }
                }, function() {
                    window.toastError('数据获取失败');
                });
            }

            $scope.handleSubmitSendInfo = function() {
                $scope.btnContent = '提交中...';
                $scope.data.requesting = true;

                api.request({
                    url: "{{sendInfoApi}}",
                    method: 'POST',
                    data: {
                        action: 'set',
                        name: $scope.data.serverData.name,
                        phone: $scope.data.serverData.phone,
                        address: $scope.data.serverData.address
                    }
                }).then(function(result) {
                    result = result.data;

                    if (result.errno === 'C0000') {
                        window.toast('提交成功');
                        $scope.btnContent = '已申请';
                        $scope.$apply();

                        $timeout(function() {
                            $ionicHistory.goBack();
                        }, 1500);
                    } else {
                        $scope.btnContent = '提交申请';
                        $scope.data.requesting = false;
                        $scope.$apply();
                        window.toastError(result.errmsg);
                    }
                }, function() {
                    $scope.btnContent = '提交申请';
                    $scope.data.requesting = false;
                    window.toastError('网络错误!');
                });
            };
            //百度统计代码
            $scope.trackEvent = function(key, callback) { //key： such as '/center/business/统计logo点击'
                var cbk = null; //alert(key);
                if (callback && angular.isFunction(callback)) {
                    cbk = callback;
                }
                window.TrackEvent && window.TrackEvent.trackEvent('/center/business/' + key, cbk, cbk);
            };

            /**
             * @description 姓名输入框只能输入汉字
             */
            // $scope.$watch('data.serverData.name', function(newValue, oldValue) {
            //     $scope.data.serverData.name = newValue.replace(/[^\u4E00-\u9FA5]/g, "");
            // });

            /**
             * @description 电话输入框只能输入数字
             */
            $scope.$watch('data.serverData.phone', function(newValue) {
                $scope.data.serverData.phone = newValue.replace(/\D+/g, "");
            });

            $scope.$on('$ionicView.beforeEnter', function() {
                window.SetTitle.setTitle('申请寄送物料');
            });

            $scope.$on('$ionicView.enter', function(ev) {
                if (ev.targetScope !== $scope) {return;}
                initPage();
            });
        }
    ]);
