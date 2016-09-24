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
	
	$scope.data = data
	

}])