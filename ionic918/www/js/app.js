// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('myApp', ['ionic']);
  
  app
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider,$urlRouterProvider){
	//路由不正确或者错的，都会跳转到home页
	$urlRouterProvider.otherwise('/home');
	$stateProvider
		.state('/home',{  // 路由名称
			url: '/home',  // 这个是url
			templateUrl: 'template/home.html',  // 这个是模板位置
			controller: 'homeCtrl' //这个是对应模板的controller名称
		})
		
		.state('/detail',{  // 路由名称
			url: '/detail',  // 这个是url
			templateUrl: 'template/detail.html',  // 这个是模板位置
			controller: 'detailCtrl' //这个是对应模板的controller名称
		})
		
		.state('/bdmap',{  // 路由名称
			url: '/bdmap',  // 这个是url
			templateUrl: 'template/bdmap.html',  // 这个是模板位置
			controller: 'bdmapCtrl' //这个是对应模板的controller名称
		})
		
		
})
