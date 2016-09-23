var myApp = angular.module('myApp',[]);

myApp

	// 推荐共享的数据用factory或者是service方法 前者任何类型   后者必须是对象类型
	.factory('Data',function(){
		//this.$get()
		return{
			message: '共享的数据'
		}
	})
	
	
	.controller('firstCtrl',['$scope',function($scope){
//		console.log($scope);
		$scope.data = {
			name:'',
			age:89
		}
	}])
	
	.controller('secondCtrl',['$scope','Data',function($scope,Data){
//		console.log($scope);
//		$scope.data = $scope.$$prevSibling.data
		$scope.data = Data;
	}])
	