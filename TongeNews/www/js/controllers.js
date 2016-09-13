angular.module('starter.controllers', [])

//tab1 controller
.controller('Tab1Ctrl', function ($scope,$rootScope, Tab1Service, $ionicSlideBoxDelegate, $ionicTabsDelegate) {
    
    $rootScope.imgUrl = imgUrl;

    var classify = Tab1Service.getClassify();
    var page = 1 , isLock = false;
    //islock：锁，防止在网络慢的时候多次请求。
    $scope.items = [];
    $scope.slides = classify;
    $scope.tabs = classify;

    var slideIndex = 0;
    Tab1Service.getList(classify[0].url, 1, 20).then(function (response) {
        if (response.data.status) {
            $scope.items = response.data.tngou;
            console.log(response.data);
        }
    }, function (error) {
        console.log(error);
    })

    $scope.slideChanged = function (index) {
        //这里使用instances[1]的原因是视图中有两个tabs
        $ionicTabsDelegate._instances[1].select(index);
    };
    $scope.$on('$ionicView.afterEnter', function () {
        //等待视图加载完成的时候默认选中第一个菜单
        $ionicTabsDelegate._instances[1].select($ionicSlideBoxDelegate.currentIndex());
    });

    $scope.selectedTab = function (index) {
        //滑动的索引和速度
        $ionicSlideBoxDelegate.slide(index)
    }
    //下拉和上拉刷洗
    $scope.loadMore = function(){
    	if(isLock) return;
    	isLock = true;
    	Tab1Service.getList(classify[0].url,page)
    		.success(function(response){
    			console.log(page);
    			if(response.tngou.length == 0){
    				$scope.hasmore = true;
    				//hasmore：在最后一页的时候禁止触发加载更多。
    				return;
    			}
    			page ++;
    			$scope.items = $scope.items.concat(response.tngou);
    		})
    		
    		.finally(function(error){
    			isLock = false;
    			$scope.$broadcast("scroll.infiniteScrollComplete");
    			$scope.$broadcast("scroll.refreshComplete");
    		})
    };
    
    $scope.doRefresh = function(){
    	page = 1;
    	$scope.items = [];
    	$scope.loadMore();
    }
    

})
//使用Tab1Service.getList函数来获取数据列表，通过$scope.items作为数据载体。
//Tab1Service：使用依赖注入，来调用服务层获取数据。
//slideChange：slidebox选择的时候将tab对应的索引选中。
//selectedTab：选中tab的时候，将对应的slidebox选中。
//ionicView.afterEnter：在页面加载完成的时候默认让tab的第一个项选中。
//_instances[1]：是因为该项目中用了两个tab




.controller('Tab2Ctrl', function($scope) {})


.controller('Tab3Ctrl', function($scope) {})


.controller('Tab4Ctrl', function($scope) {})


.controller('AccountCtrl', function($scope) {});
