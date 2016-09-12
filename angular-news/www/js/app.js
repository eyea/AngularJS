//创建newsApp模块，引用ngResource和ui.router，分别是实现restful接口的服务和ui-router路由服务，newsApp.home则是我们自己创建的子模块。 
//.config中配置了路由默认的路径。
(function() {
    'use strict';
    angular.module('newsApp', [
            'ngResource',
            'ui.router',
            'newsApp.home'
        ])
        .config(function($urlRouterProvider) {
            $urlRouterProvider.otherwise('/home');
        });
})();
