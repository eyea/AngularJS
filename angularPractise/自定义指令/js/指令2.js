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
//上面是第一个部分的练习
.controller('secondCtrl',['$scope',function ($scope) {
    $scope.abc = 'USA'
}])

.directive('superman',function () {
    return{
        restrict:'AE',
//继承scope里的属性
        // scope:{
        //     flavor:'@'
        // },
        // template:'<div>{{flavor}}</div>'

//    控制器和指令双向数据绑定
        scope:{
            flavor:'='
        },
        template:'<input type="text" ng-model="flavor"/>'
    }
})