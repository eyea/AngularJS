var app = angular.module('myApp',[]);

app
    //自定义指令 指令的名称
    .directive('hello',function () {
        return{
            restrict: 'AE',
            transclude: true,
            template: '测试<div ng-transclude></div>'
            // templateUrl: 'hello.html',
            // replace: true,
        }
    })