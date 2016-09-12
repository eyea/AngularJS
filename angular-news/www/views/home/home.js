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