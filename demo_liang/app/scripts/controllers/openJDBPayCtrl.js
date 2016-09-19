'use strict';

angular.module('businessApp')
    .controller('openJDBPayCtrl', ['$scope', 'apiService', '$window', '$location', '$ionicPopup', '$ionicActionSheet', 'Api', '$ionicLoading', '$timeout',
        function($scope, apiService, $window, $location, $ionicPopup, $ionicActionSheet, Api, $ionicLoading, $timeout) {

            var api = new Api();

            $scope.commonData = {};
            $scope.data = {};

            $scope.data.businessName = "";
            $scope.data.businessAddr = "";
            $scope.data.logo = "";
            $scope.data.agreementChecked = true;
            $scope.data.disableBtn = true;
            $scope.data.btnContent = '立即开通';
            var URLAPI = '{{openJDBPayApi}}';

            apiService.getCommonData().then(function(commonDataFromApi) {
                apiService.setCommonData(commonDataFromApi);
                $scope.commonData = angular.extend({}, commonDataFromApi);
            });

            $scope.businessNameChange = function() {
                $scope.data.businessName = $scope.data.businessName.replace(/\s/g, "");

                if ($scope.data.businessName.length > 15) {
                    $scope.data.businessName = $scope.data.businessName.slice(0, 15);
                }

                if ($scope.data.agreementChecked) {
                    $scope.data.disableBtn = !($scope.data.businessName);
                } else {
                    $scope.data.disableBtn = true;
                }
            };

            $scope.agreementChange = function() {
                $scope.data.agreementChecked = !$scope.data.agreementChecked;
                if ($scope.data.agreementChecked) {
                    $scope.data.disableBtn = !($scope.data.businessName);
                } else {
                    $scope.data.disableBtn = true;
                }
            };

            /**
             * @description 上传完图片之后的回调
             * @param {string} img  图片链接：'http://***.jpg'
             */
            $scope.changeLogo = function(img) {
                $scope.data.logo = img;
            };

            $scope.openAgreement = function() {
                $location.path('/agreement');
            };

            /**
             * @description 开通支付
             */
            $scope.handleOpenJDBPay = function() {
                $scope.data.btnContent = '开通中...';
                $scope.data.disableBtn = true;

                api.request({
                    url: URLAPI,
                    method: 'POST',
                    data: {
                        accessToken: $scope.commonData.accessToken,
                        memberID: $scope.commonData.memberID,
                        udid: $scope.commonData.udid,
                        logo: $scope.data.logo,
                        name: $scope.data.businessName,
                        addr: $scope.data.businessAddr
                    }
                }).then(function(result) {
                    result = result.data;
                    if (result.errno == 'C0000') {
                        $scope.data.btnContent = '已开通';

                        $ionicLoading.show({
                            template: '恭喜您！借贷宝支付功能已成功开通！',
                            noBackdrop: true,
                            duration: 1500
                        });

                        $timeout(function() {
                            $location.path('/index');
                        }, 1500);
                    } else {
                        $scope.data.btnContent = '立即开通';
                        $scope.data.disableBtn = false;
                        $scope.$apply();
                        window.toastError(result.errmsg);
                    }
                }, function() {
                    $scope.data.btnContent = '立即开通';
                    $scope.data.disableBtn = false;
                    $scope.$apply();
                    window.toastError('网络错误!');
                });
            };

            //confirm: 开通后店铺名称将无法修改，是否确认开通。
            $scope.showConfirm = function() {
                var confirmPopup = $ionicPopup.confirm({
                    title: '开通店铺',
                    template: '开通后店铺名称将无法修改，是否确认开通?',
                    cancelText: '取消',
                    okText: '确定'
                });
                confirmPopup.then(function(res) {
                    if (res) {
                        $scope.handleOpenJDBPay();
                        console.log('开通');
                    } else {
                        console.log('不开通');
                    }
                });
            };

            $scope.$on('$ionicView.beforeEnter', function() {
                window.SetTitle.setTitle('开通借贷宝支付');
            });
        }
    ]);
