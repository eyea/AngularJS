angular.module('myApp',[])

.controller('cartCtrl',['$scope',function($scope){
	$scope.cart = [
		{
			id: 1,
			name: "ipone",
			quantity:10,
			price:2990
		},
		{
			id: 2,
			name: "ipone5",
			quantity:13,
			price:4459
		},
		{
			id: 3,
			name: "ipone7",
			quantity:109,
			price:29890
		},
		{
			id: 4,
			name: "ipone5s",
			quantity:100,
			price:290
		}
	];	

	//总购买数量
	$scope.totalQuantity = function(){
		var total = 0;
		angular.forEach($scope.cart,function(item){
			total += item.quantity;
		});
		return total;
	};
	
	//总购买价格
	$scope.totalPrice = function(){
		var total = 0;
		angular.forEach($scope.cart,function(item){
			total += item.price * item.quantity;
		});
		return total;
	};
	
	//删除当前商品
	$scope.remove = function(id){
		var index = $scope.findIndex(id);
		
		if(index !== -1){
			$scope.cart.splice(index,1);
		}
	};
	
	//清空购物车
	$scope.removeAll = function(){
		$scope.cart = {}
	};
	
	//减少数量
	$scope.reduce = function(id){
		var index = $scope.findIndex(id);
		 if(index !== -1){
			var item = $scope.cart[index];
		 	-- item.quantity;
		 	if(item.quantity<1){
		 		item.quantity = 1;
		 		var returnkey = confirm("确定从购物车移除？");
		 		if(returnkey){
		 			$scope.remove(item.id);
		 		}
		 	};
		 }
	};
	
	//增加数量
	$scope.add = function(id){
		var index = $scope.findIndex(id);
		 if(index !== -1){
		 	++ $scope.cart[index].quantity;
		 }
	};
	
	// 通用调用的方法------找一个元素的索引
	$scope.findIndex = function(id){
		var index = -1; 
		angular.forEach($scope.cart,function(item,key){
			if(item.id === id){
				index = key;
				return;  // 表示后面不需要执行
			}
		});	
		return index;
	};
	
	// 添加监听
	$scope.$watch('cart',function(newValue,oldValue){
		 angular.forEach(newValue,function(item,key){
		 	 if(item.quantity<1){
		 		item.quantity = 1;
		 		var returnkey = confirm("确定从购物车移除？");
		 		if(returnkey){
		 			$scope.remove(item.id);
		 		}else{
		 			item.quantity = oldValue[key].quantity;
		 		}
		 	 }
		 })
	},true)
	
}])