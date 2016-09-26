angular.module('myApp',[])

.controller('firstCtrl',['$scope',function ($scope) {
    $scope.loadData = function(){
        console.log('正在加载中...');
    };
}])

.directive('loader',function () {
    return{
        restrict: 'AE',
        link: function (scope,element,attrs) {
            element.bind('mouseenter',function () {
                // scope.loadData();
                // 或者这样写
                // scope.$apply('loadData()');
                // 如果 loadData 多次不同的控制器里调用 用下面的方法 注意html里的驼峰 在js全部是小写的单词
                scope.$apply(attrs.howtoload);

            })
        }

    }
})