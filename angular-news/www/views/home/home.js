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