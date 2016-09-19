(function(app){
	app
		.factory('myFactory',['$http','$q',function($http,$q){
			var factory = {};
			
			var storage = {};  //设置一个空对象
			
			factory.getList = function(){
				
				return $http.get("http://www.runoob.com/try/angularjs/data/Customers_JSON.php")
					
			};
			
			// 不同页面间的数据传输 （主页列表和详情页之间）
			factory.storage = {  // 编写factory上的storage方法
				
				//设置值
				setVal: function(name,value){
					if(value && name){
						storage[name] = value;
					}
				},
				
				// 获取值
				getVal: function(name){
					if(!storage[name] || !name){
						return;
					}
					return storage[name];
				},
				
				//删除值
				removeVal: function(name){
					if(name && storage[name]){
						delete storage[name];
					}
				}
				
			};
			
			return factory;
			
			//  百度地图
			
			
			
			
		}])
})(app)
