(function(angular){
	angular.module('myApp')
		.controller('homeCtrl',['$scope','myFactory','$state','$rootScope',function($scope,myFactory,$state,$rootScope){
//			console.log('hello world!')
			$scope.views = { // 设置一个命名空间
				slideData:[
					{
						img:'./img/1.jpg'
					},
					{
						img:'./img/2.jpg'
					},
					{
						img:'./img/3.jpg'
					}
				],
			//myFactory.getList();   //调用服务里面的方法
//			myFactory.getList().then(function(data){
//				console.log(data);
//			});
//调用myFactory.getList()方法为什么后面还跟着一个then的。其实我们使用内置的 $http 服务直接同外部进行通信。 $http 服务只是简单的封装了浏览器原生的 XMLHttpRequest 对象。$http 服务是只能接受一个参数的函数，这个参数是一个对象，包含了用来生成HTTP请求的配置内容。这个函数返回一个promise对象， 由于 $http 方法返回一个promise对象，我们可以在响应返回时用 then 方法来处理回调。如果使用 then 方法，会得到一个特殊的参数，它代表了相应对象的成功或失败信息，还可以接受两个可选的函数作为参数。或者可以使用 success 和 error 回调代替，至于promise对象是什么
			
				listData:[],  //列表数据
			// 获取列表内容
				getList: function(){
					myFactory.getList().then(function(res){
						if(res.status === 200 && res.data){
							$scope.views.listData = res.data.records;  //赋值
						}
					},function(res){
						//接口请求失败或者延迟
					});			
				},
				
			// 跳转详情页面
				goDetail: function(item){
//					console.log(item);
					$state.go('/detail'); // 跳转detail 路由
					myFactory.storage.setVal('detail',item);  // 保存数据
				},
			
			// 跳转百度地图页面
				getLocation: function(){
					$state.go('/bdmap');  // 跳转bdmap路由
					
				}
				
				
				
				};
			
			$scope.views.getList();   //执行方法
			
		}])
})(angular)
