'use strict';

angular.module('businessApp')
    .controller('discountCtrl', ['$scope', 'apiService', '$window', '$location',
        '$ionicPopup', '$ionicActionSheet', 'Api', '$timeout', '$ionicHistory',
        function($scope, apiService, $window, $location, $ionicPopup,
            $ionicActionSheet, Api, $timeout, $ionicHistory) {

            var api = new Api();
            $scope.data = {};

            var storageKey = 'businessCenterDiscount';
            $scope.data.serverData = api.localStorage.get(storageKey);

            $scope.commonData = {};
            $scope.btnContent = '提交';

            apiService.getCommonData().then(function(commonDataFromApi) {
                apiService.setCommonData(commonDataFromApi);
                $scope.commonData = angular.extend({}, commonDataFromApi);
            });

            function initPage() {
                api.request({
                    url: "{{getDiscountApi}}",
                    method: 'POST',
                    data: {}
                }).then(function(res) {
                    res = res.data;
                    if (res.errno === 'C0000') {
                        $scope.data.serverData = res.data;

                        // 确定优惠金额的可配置范围
                        $scope.data.serverData.moneyRange = [];
                        for (var i = $scope.data.serverData.minMoney; i <= $scope.data.serverData.maxMoney; i++) {
                            $scope.data.serverData.moneyRange.push(i);
                        }

                        api.localStorage.set(storageKey, $scope.data.serverData);
                        $scope.$apply();
                    } else {
                        window.toastError(res.errmsg);
                    }
                }, function() {
                    window.toastError('数据获取失败');
                });
            }

            $scope.handleSubmitDiscount = function() {
                $scope.btnContent = '提交中...';
                $scope.data.serverData.canModify = false;

                api.request({
                    url: "{{modifyDiscountApi}}",
                    method: 'POST',
                    data: {
                        cut: $scope.data.serverData.activeMoney
                    }
                }).then(function(res) {
                    res = res.data;

                    if (res.errno === 'C0000') {
                        window.toast('已成功提交');
                        $scope.data.serverData.canModify = false; // 修改成功后按钮置灰
                        $scope.btnContent = '提交';
                        $scope.$apply();
                        $timeout(function() {
                            $ionicHistory.goBack();
                        }, 1500);
                    } else {
                        window.toastError(res.errmsg);
                        $scope.btnContent = '提交';
                        $scope.data.serverData.canModify = true;
                        $scope.$apply();
                    }
                }, function() {
                    window.toastError('网络错误');
                    $scope.btnContent = '提交';
                    $scope.data.serverData.canModify = true;
                    $scope.$apply();
                });
            };

            $scope.openRule = function() {
                $location.path('/rule');
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
                window.SetTitle.setTitle('配置优惠金额');
            });

            $scope.$on('$ionicView.enter', function(ev) {
                if (ev.targetScope !== $scope) {return;}
                initPage();
            });
        }
    ]);
