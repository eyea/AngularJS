'use strict';

window.Promise = require('./promise');
var params = {};

window.deviceReadyPromise = new window.Promise(function(fullfill, reject) {
    document.addEventListener('deviceready', function() {
        window.CommonParams.commonParams(function(nativeData) {
            fullfill(nativeData);
        }, function() {
            reject({
                msg: '获取登录信息失败'
            });
        });
    });
});

window.deviceReadyPromise.then(function(data) {
    params = data;
    angular.bootstrap(document.body, ['businessApp']);
}, function() {
    window.alert('获取登录信息错误');
});

angular.module('businessApp', ['ionic', 'jdb', 'ngCordova'])
    .run(['$ionicPlatform', function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                window.cordova.plugins.Keyboard.disableScroll(true);
            }

            if (window.StatusBar) {
                window.StatusBar.styleDefault();
            }
        });
    }])
    .config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider', function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
        // $ionicConfigProvider.views.swipeBackEnabled(false);

        $stateProvider
        // 根据subPage动态选择模板和controller
        // 这个逻辑依赖cordova插件
        // 所以在整个app运行时需要保证deviceready
            .state('center', {
                url: '/center',
                templateUrl: function() {
                    // return 'views/index.html';

                    if (params.subPage === 'index') {
                        return 'views/index.html';
                    } else if (params.subpage === 'openJDBPay') {
                        return 'views/openJDBPay.html';
                    } else if (params.subpage === 'sendInfo') {
                        return 'views/sendInfo.html';
                    } else if (params.subpage === 'discount') {
                        return 'views/discount.html';
                    } else if (params.subpage === 'setting') {
                        return 'views/setting.html';
                    } else if (params.subpage === 'rule') {
                        return 'views/activityRules.html';
                    } else if (params.subpage === 'agreement') {
                        return 'views/serviceAgreement.html';
                    }

                    return 'views/index.html';
                },
                controllerProvider: function() {
                    // return 'indexCtrl';

                    if (params.subPage === 'index') {
                        return 'indexCtrl';
                    } else if (params.subpage === 'openJDBPay') {
                        return 'openJDBPayCtrl';
                    } else if (params.subpage === 'sendInfo') {
                        return 'sendInfoCtrl';
                    } else if (params.subpage === 'discount') {
                        return 'discountCtrl';
                    } else if (params.subpage === 'setting') {
                        return 'settingtCtrl';
                    }

                    return 'indexCtrl';
                }
            })
            .state('index', {
                url: '/index',
                templateUrl: 'views/index.html',
                controller: 'indexCtrl',
                cache: true
            })
            .state('openJDBPay', {
                url: '/openJDBPay',
                templateUrl: 'views/openJDBPay.html',
                controller: 'openJDBPayCtrl',
                cache: true
            })
            .state('sendInfo', {
                url: '/sendInfo',
                templateUrl: 'views/sendInfo.html',
                controller: 'sendInfoCtrl',
                cache: true
            })
            .state('discount', {
                url: '/discount',
                templateUrl: 'views/discount.html',
                controller: 'discountCtrl',
                cache: true
            })
            .state('setting', {
                url: '/setting',
                templateUrl: 'views/setting.html',
                controller: 'settingCtrl',
                cache: true
            })
            .state('rule', {
                url: '/rule',
                templateUrl: 'views/activityRules.html',
                onEnter: function(){
                    window.SetTitle && window.SetTitle.setTitle('活动规则');
                },
                cache: true
            })
            .state('agreement', {
                url: '/agreement',
                templateUrl: 'views/serviceAgreement.html',
                onEnter: function(){
                    window.SetTitle && window.SetTitle.setTitle('商家服务协议');
                },
                cache: true
            });

        $urlRouterProvider.otherwise('/center');

        // checkbox 所有平台统一使用圆形样式
        $ionicConfigProvider.form.checkbox('circle');
    }]);

require('./services/api');
require('./services/businessService');
require('./directive/imgUploadDirective');
require('./directive/touchActiveDrictive');
require('./controllers/indexCtrl');
require('./controllers/openJDBPayCtrl');
require('./controllers/sendInfoCtrl');
require('./controllers/settingCtrl');
require('./controllers/discountCtrl');
