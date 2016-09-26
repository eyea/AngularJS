angular.module('myApp',[])

.controller('firstCtrl',['$scope',function($scope){
	$scope.hobbies = [
        {
            id: '1',
            name: '游泳'
        },
        {
            id: '2',
            name: '旅游'
        },
        {
            id: '3',
            name: '登山'
        },
    ];

    $scope.data = [

    ]
	
	

}])

