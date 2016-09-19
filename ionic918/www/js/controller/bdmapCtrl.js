(function(app){
	app
		.controller('bdmapCtrl',['$scope','$rootScope',function($scope,$rootScope){
			$scope.views = {
				
				getLocation: function(){
//				  alert("开始定位");
					var map = new BMap.Map("allmap");            // 创建Map实例
					var point = new BMap.Point(116.404, 39.915); // 创建点坐标
					map.centerAndZoom(point,15);                 // 初始化地图,设置中心点坐标和地图级别。
					map.addControl(new BMap.ZoomControl());      //添加地图缩放控件
					
					// 景点搜索
					var local = new BMap.LocalSearch(map, {
						renderOptions:{map: map,autoViewport:true}
					});
					local.search("景点");	
					
					// 路线查询
					var opts = {
						width : 400,    // 信息窗口宽度
						height: 70,     // 信息窗口高度
						title : "海底捞王府井店"  // 信息窗口标题
					}
					var infoWindow = new BMap.InfoWindow("点击marker将进入路线查询，并直接跳转到webapp主站", opts);  // 创建信息窗口对象
					map.openInfoWindow(infoWindow,point); //开启信息窗口
				
					var marker1 = new BMap.Marker(new BMap.Point(116.417854,39.921988));  // 创建标注
					map.addOverlay(marker1);              // 将标注添加到地图中
					marker1.addEventListener("click", function(){
						/*start|end：（必选）
						{name:string,latlng:Lnglat}
						opts:
						mode：导航模式，固定为
						BMAP_MODE_TRANSIT、BMAP_MODE_DRIVING、
						BMAP_MODE_WALKING、BMAP_MODE_NAVIGATION
						分别表示公交、驾车、步行和导航，（必选）
						region：城市名或县名  当给定region时，认为起点和终点都在同一城市，除非单独给定起点或终点的城市
						origin_region/destination_region：同上
						*/
						var start = {
							 name:"王府井"
						}
						var end = {
							name:"西单"
						}
						var opts = {
							mode:BMAP_MODE_DRIVING,
							region:"北京"
						}
						var ss = new BMap.RouteSearch();
						ss.routeCall(start,end,opts);
						
					});
		
		
					
//				    baidu_location.getCurrentPosition(function(data){
////				       alert(data);
//				
//				       $scope.data=data;
//				       $rootScope.team=data;
//				       
//				    }, function(err){
//				      alert("错误："+err)
//				    });
    
				},
				
				goBack: function(){
					window.history.back();
				}
				
				
				
				
			};
			
		}])
})(app);
