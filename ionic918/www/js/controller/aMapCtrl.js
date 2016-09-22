(function(app){
	app
		.controller('aMapCtrl',['$scope',function($scope){
			
			$scope.views = {
				
				getLocation: function(){
					var map, geolocation;
					
				    map = new AMap.Map("container", {
				        resizeEnable: true
				    });
				    map.setZoom(11);
				    map.setCenter([116.397428, 39.90923]);	

				    map.plugin('AMap.Geolocation', function() {
				        geolocation = new AMap.Geolocation({
				            enableHighAccuracy: true,//是否使用高精度定位，默认:true
				            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
				            buttonOffset: new AMap.Pixel(14, 120),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
				            zoomToAccuracy: true ,     //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
				            buttonPosition:'RB'
				        });
				        map.addControl(geolocation);
				        geolocation.getCurrentPosition();
				        AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
				        AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
				    });
				    //解析定位结果
				    function onComplete(data) {
				//      var str=['定位成功'];
				//      str.push('经度：' + data.position.getLng());
				//      str.push('纬度：' + data.position.getLat());
				//      str.push('精度：' + data.accuracy + ' 米');
				//      str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
				//      document.getElementById('tip').innerHTML = str.join('<br>');
				    }
				    //解析定位错误信息
				    function onError(data) {
				//      document.getElementById('tip').innerHTML = '定位失败';
				    }
				    
				    // 搜索  输入提示
				    var autoOptions = {
				        input: "tipinput"
				    };
				    var auto = new AMap.Autocomplete(autoOptions);
				    var placeSearch = new AMap.PlaceSearch({
				        map: map
				    });  //构造地点查询类
				    AMap.event.addListener(auto, "select", select);//注册监听，当选中某条记录时会触发
				    function select(e) {
				        placeSearch.setCity(e.poi.adcode);
				        placeSearch.search(e.poi.name);  //关键字查询查询
				    }	
				    
				    
				    //添加 toolbars
				    var scale = new AMap.Scale({
				        visible: true
				    }),
				    toolBar = new AMap.ToolBar({
				        visible: true
				    })
				
				    map.addControl(scale);
				    map.addControl(toolBar);
							    
				    
				},
				
				// 返回
				goBack: function(){
					window.history.back();
				}
				
				
				
				
				
			};
			
			$scope.views.getLocation();

			
		}])
})(app);
