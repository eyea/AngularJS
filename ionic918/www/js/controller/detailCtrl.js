(function(app){
	app
		.controller('detailCtrl',['$scope','$rootScope','myFactory',function($scope,$rootScope,myFactory){
			
			$scope.views = {
				detail:myFactory.storage.getVal('detail'), // 保存数据
				
				goBack: function(){
					window.history.back();
				},
				
				age:20  //初始化一个值
				
			};
			
			
			
			
		}])
})(app)