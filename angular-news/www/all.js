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

//home.js中创建了子模块newsApp.home并配置了一个名称为home路由它的对应的controller和模版页面。
(function () {
	'use strict';
	angular
	.module("newsApp.home", [])
	.config(function ($stateProvider) {
		$stateProvider.state('home', {
			url: '/home',
			controller: "homeCtrl",
		    templateUrl: 'views/home/home.html'
		})
	})
	.controller("homeCtrl", homeCtrl);

	function homeCtrl ($scope) {
	}
})();