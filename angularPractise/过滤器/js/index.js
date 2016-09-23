var myApp = angular.module('myApp',[])

myApp
	
	.factory('info',function(){
		return {
			iofomessage: "supermarket",
			number:123456789,
			city:[
				{
					name: "上海",
					py : "shanghai"
				},
				{
					name:"北京",
					py:"beijing"
				},
				{
					name:'安徽',
					py:'anhui'
				}
			]
		};
	})
	.controller('firstCtrl',['$scope','info','$filter',function($scope,info,$filter){
		$scope.today = new Date();
		$scope.data = {
			message: "hello world"
		}
		$scope.Data = info;
		
		//直接使用filter
		var jsonString = $filter('json')($scope.Data);
//		console.log(jsonString);
		
		//自制过滤器 自己定义规则
		$scope.checkName = function(obj){
			console.log(obj)
			if(obj.py.indexOf('b') === -1 ){  // s没有
				return false;
			}else{
				return true;
			}    //  也就是包含b的会留下来 不包含的删除 对比控制台输出 
		}
		
		
	}])