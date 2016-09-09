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
