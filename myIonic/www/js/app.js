// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ngCordova'])

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
		//app.js中加入tab页面的路由
		$stateProvider
		      .state('tabs', {
		          url: "/tab",
		          abstract: true,
//tabs路由增加了一个abstract字段，
//该字段在angular中的解释是抽象页面，不能独立作为页面展示只能作为其他页面父页面，当加载子页面之前加载父页面。
//其他子页面的路由和tabs路由的配置有所不同名称命名是父路由.子路由的形式，
//并且增加了一个views字典，字段的key值对应着我们前面所说的tabs.html中ion-nav-view的name属性，
//表示该路由跳转的页面属于某个tab的子页面，同时修改我们的otherwise默认页为/tab/home。
		          templateUrl: "templates/tabs.html"
		      })
		      .state('tabs.home',{
		      	url: "/home",
		      	views: {
		      		'home-tab': {
		      			templateUrl: "templates/home.html",
		      			controller: "homeCtrl"
		      		}
		      	}
		      })
		      .state('tabs.facts',{
		      	url: "/facts",
		      	views: {
		      		'home-tab': {
		      			templateUrl: "templates/facts.html"
		      		}
		      	}	
		      })
	      	.state('tabs.about',{
		      		url: "/about",
		      		views: {
		      			'about-tab': {
		      				templateUrl: "templates/about.html"
		      			}
		      		}
		      	})		      
		      
		      
		      
		      
		$urlRouterProvider.otherwise("/tab/home");
		
})

