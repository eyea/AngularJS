// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller("startCtrl",function($scope,$interval,$timeout,$ionicPlatform,$cordovaNativeAudio,$cordovaDeviceMotion){
	$scope.shakebg = [{hide:false}];
	$scope.animetebg = [{show:false}];

//	var timer_a = $timeout(
//		function() {
//			$scope.showAnimete();
//		},
//		2000
//	).then(
//		function() {
//			$timeout.cancel(timer_a);
//		}
//	);

	$ionicPlatform.ready(function() {//载入音乐资源
	   $cordovaNativeAudio
	   .preloadSimple('click', 'src/shake_sound.mp3',1,1)
	});
	
	var motiontime;
	
	//获取陀螺仪数据方法
	$scope.getMotionTime = function(){
		motiontime = $interval(
			function() {
	
			  $cordovaDeviceMotion
				.getCurrentAcceleration()
				.then(function(motion) {
					
					if(motion.x > 11 || motion.x < -11 || motion.y > 11 || motion.y < -11){
								//手机向任意方向用力摇晃
								$scope.showAnimete();//执行动画部分
								$cordovaNativeAudio.play('click');//播放音乐
					}
				
				}, function(err) {
					alert("陀螺仪错误 "+err);
				});
	
			},
			100
		);
	};
	
	$scope.getMotionTime();//开启时钟获取数据
	
	//动画方法
	$scope.showAnimete = function(){
		$interval.cancel(motiontime);//停止掉获取数据时钟
		$scope.shakebg.hide = true;//隐藏背景层
		$scope.animetebg.show = true;//显示动画层
		
		var timer_b = $timeout(
			function() {//动画结束
				$scope.animetebg.show = false;//隐藏动画层
				$scope.shakebg.hide = false;//显示背景层
				$scope.getMotionTime();//重新开启获取数据时钟
			},
			1000
		).then(
			function() {
				$timeout.cancel(timer_b);
			}
		);
	};
	
	
	
})