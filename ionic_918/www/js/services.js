(function(app){
	app
		.factory('myFactory',['$http','$q',function($http,$q){
			var factory = {};
			
			factory.getList = function(){
				
//				$http.get("http://www.runoob.com/try/angularjs/data/Customers_JSON.php")
//					.success(function(response){
//						console.log(response);
//					});
				return $http.get("http://www.runoob.com/try/angularjs/data/Customers_JSON.php")
					
			};
			
			return factory;
			
		}])
})(app)
