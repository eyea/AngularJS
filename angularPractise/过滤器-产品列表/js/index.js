var myApp = angular.module('product',[])

myApp
	
	.service('productData',function(){
		return [
			{
				id:1,
				name: 'iphone',
				price:4677
			},
			{
				id:2,
				name: 'Apple',
				price:78878
			},
			{
				id:3,
				name: 'iPad',
				price:9867
			},
			{
				id:4,
				name: 'iMac',
				price:7565
			},
			{
				id:5,
				name: 'Nubia',
				price:4645
			},
			{
				id:6,
				name: 'SANSUNG',
				price:8967
			}
		]
	})
	.controller('productCtrl',['$scope','productData','$filter',function($scope,productData,$filter){
		
		$scope.data = productData;
		
		
		
	}])