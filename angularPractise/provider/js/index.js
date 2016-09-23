var myApp = angular.module('myApp',[],function($provide){
	// 自定义服务
	$provide.provider('customService',function(){  // 注意 provider方法并不常用
		this.$get = function(){
			return{
				message: 'customService Message'
			}
		}
	});
	
	//自定义工厂方法
	$provide.factory('providerfactory',function(){
		return [12,3,5,5,6,7,7]  // 可以是任何类型的
	});
	
	//定义一个服务
	$provide.service('provideservice',function(){
		return ['上海']  // 返回的必须是对象 （数组  不能是基本类型的
	});
	
		// 当然也可以 直接 myApp.service 和myApp.factory
});

myApp
	.controller('firstCtrl',['$scope','provideservice',function($scope,provideservice){
		console.log(provideservice)
	}])