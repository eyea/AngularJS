angular.module('myApp',[])

.controller('testCtrl',['$scope',function ($scope) {
    $scope.user = {
        userName: 'China',
        userPassword: ''
    };
    $scope.save = function () {
        alert('saved!')
    }
}])