// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','starter.filter'])

.run(function($ionicPlatform) {
$ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
});
})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
$stateProvider
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })
  .state('tab.tab1', {
    url: '/tab1',
    views: {
      'tab1': {
        templateUrl: 'templates/tab1.html',
        controller: 'Tab1Ctrl'
      }
    }
  })
  .state('tab.tab2', {
    url: '/tab2',
    views: {
      'tab2': {
        templateUrl: 'templates/tab2.html',
        controller: 'Tab2Ctrl'
      }
    }
  })
  .state('tab.tab3', {
    url: '/tab3',
    views: {
      'tab3': {
        templateUrl: 'templates/tab3.html',
        controller: 'Tab3Ctrl'
      }
    }
  })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })
  
	.state('tab.tab1-details', {
	    url: '/tab/tab1-details/:id/:title',
	    views: {
	      'tab1': {
	        templateUrl: 'templates/tab1-details.html',
	        controller: 'Tab1DetailsCtrl'
	      }
	    }
	  });  
  // if none of the above states are matched, use this as the fallback
$urlRouterProvider.otherwise('/tab/tab1');

//固定tab到底部
    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
    $ionicConfigProvider.platform.android.navBar.alignTitle('center')
    $ionicConfigProvider.backButton.previousTitleText(false);
    $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
    $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');
    $ionicConfigProvider.platform.ios.views.transition('ios');
    $ionicConfigProvider.platform.android.views.transition('android'); 
});
