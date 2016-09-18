angular.module('starter.controllers', [])

//Tab1Ctrl
.controller('Tab1Ctrl', function ($scope,$rootScope, Tab1Service, $ionicSlideBoxDelegate, $ionicTabsDelegate) {
    $rootScope.imgUrl = imgUrl;

    var classify = Tab1Service.getClassify()
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
    		getData(index);
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
    };
    
    //下拉刷新和上拉刷新  下面的注释部分放在了service层
//  var page = 1,isLock=false;
//  $scope.items = [];
//  $scope.loadMore = function () {
//      if(isLock)return;
//      isLock=true;
//      Tab1Service.getList(classify[0].url, page).success(function (response) {
//          console.log(page)
//          if (response.tngou.length == 0) {
//              $scope.hasmore = true;
//              return;
//          }
//          page++;
//          $scope.items = $scope.items.concat(response.tngou);
//      }).finally(function (error) {
//          isLock = false;
//          $scope.$broadcast('scroll.infiniteScrollComplete');
//          $scope.$broadcast('scroll.refreshComplete');
//      });
//  };
//  $scope.doRefresh = function () {
//      page = 1;
//      $scope.items = [];
//      $scope.loadMore();
//  };
    
		var getData = function (index) {
		    var c = classify[index];
		    // 安卓平台不会自动触发加载
		    if (ionic.Platform.isAndroid()) {
		        c.doRefresh();
		    }  
		    // 初始化数据，和回调函数 
		    c.isload = false;
		    c.callback = function () {
		        $scope.$broadcast('scroll.refreshComplete');
		        $scope.$broadcast('scroll.infiniteScrollComplete');
		    }
		}
		getData(0);    
    

})

.controller('Tab2Ctrl', function($scope) {})

.controller('Tab3Ctrl', function($scope) {})

.controller('Tab4Ctrl', function($scope) {})

.controller('AccountCtrl', function($scope) {});