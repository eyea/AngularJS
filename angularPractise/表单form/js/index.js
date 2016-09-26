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

    $scope.cities = [
        {
            name: "上海",
            parent: 0,
            id:1
        },
        {
            name: "上海市",
            parent: 1,
            id:2
        },
        {
            name: "徐汇区",
            parent: 2,
            id:8
        }
    ];

    $scope.data = [

    ]
	
	

}])

