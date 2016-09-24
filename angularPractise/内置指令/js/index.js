angular.module('myApp',[])


.service('data',function(){
	return [
		{
			name:'Nancy',
			age:23,
			city:"北京"
		},
		{
			name:'Bob',
			age:24,
			city:"上海"
		},
		{
			name:'Alice',
			age:25,
			city:"四川"
		}
	]
})

.filter('filterAge',function(){
	return function(obj){
		var newObj = [];
		angular.forEach(obj,function(o){
			if(o.age<24){
				newObj.push(o)
			}
		});
		return newObj;
	}
})


.controller('firstCtrl',['$scope','data',function($scope,data){
	
	$scope.data = data;
	
	$scope.status = false;
	
	$scope.changeStatus = function($event){
		console.log($event.target);
		$scope.status = !$scope.status;
		// 转换成 jq对象 能够使用一些基本的方法
		angular.element($event.target).html('切换状态'+$scope.status); 
	}
	

}])