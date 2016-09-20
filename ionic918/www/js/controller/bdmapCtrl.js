(function(app){
	app
		.controller('bdmapCtrl',['$scope','$rootScope',function($scope,$rootScope){
			$scope.views = {
				
				getLocation: function(){
//				  alert("开始定位");
					function G(id) {
							return document.getElementById(id);
					};
					
					var map = new BMap.Map("allmap");            // 创建Map实例
					// var point = new BMap.Point(116.404, 39.915); // 创建点坐标
					//map.centerAndZoom(point,15);                 // 初始化地图,设置中心点坐标和地图级别。
					map.centerAndZoom("中关村",12); 
					
					map.addEventListener("tilesloaded",function(){
//						alert("地图加载完毕");
//						map.addControl(new BMap.ZoomControl()); 
					});
					
					setTimeout(function(){
							map.setZoom(14); 
						}, 2000);  //2秒后放大到14级
						
//					function ZoomControl(){  
//					    // 设置默认停靠位置和偏移量  
//					    this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;  
//					    this.defaultOffset = new BMap.Size(10, 10);
//					}
					
//					map.addControl(new BMap.ZoomControl());      //添加地图缩放控件
//					map.enableScrollWheelZoom(true);

					// 添加城市列表控件
//					map.enableScrollWheelZoom();
//					map.enableInertialDragging();
//					
//					map.enableContinuousZoom();
//					
//					var size = new BMap.Size(10, 20);
//					map.addControl(new BMap.CityListControl({
//					    anchor: BMAP_ANCHOR_TOP_LEFT,
//					    offset: size,
//					    // 切换城市之间事件
//					    // onChangeBefore: function(){
//					    //    alert('before');
//					    // },
//					    // 切换城市之后事件
//					    // onChangeAfter:function(){
//					    //   alert('after');
//					    // }
//					}));					


					
					// 景点搜索
//					var local = new BMap.LocalSearch(map, {
//						renderOptions:{map: map,autoViewport:true}
//					});
//					local.search("景点");	
					
					// 路线查询
//					var opts = {
//						width : 400,    // 信息窗口宽度
//						height: 70,     // 信息窗口高度
//						title : "海底捞王府井店"  // 信息窗口标题
//					}
//					var infoWindow = new BMap.InfoWindow("点击marker将进入路线查询，并直接跳转到webapp主站", opts);  // 创建信息窗口对象
//					map.openInfoWindow(infoWindow,point); //开启信息窗口
//				
//					var marker1 = new BMap.Marker(new BMap.Point(116.417854,39.921988));  // 创建标注
//					map.addOverlay(marker1);              // 将标注添加到地图中
//					marker1.addEventListener("click", function(){
//						/*start|end：（必选）
//						{name:string,latlng:Lnglat}
//						opts:
//						mode：导航模式，固定为
//						BMAP_MODE_TRANSIT、BMAP_MODE_DRIVING、
//						BMAP_MODE_WALKING、BMAP_MODE_NAVIGATION
//						分别表示公交、驾车、步行和导航，（必选）
//						region：城市名或县名  当给定region时，认为起点和终点都在同一城市，除非单独给定起点或终点的城市
//						origin_region/destination_region：同上
//						*/
//						var start = {
//							 name:"王府井"
//						}
//						var end = {
//							name:"西单"
//						}
//						var opts = {
//							mode:BMAP_MODE_DRIVING,
//							region:"北京"
//						}
//						var ss = new BMap.RouteSearch();
//						ss.routeCall(start,end,opts);
//						
//					});
					
					// 搜索输入框   -->未完成
//					var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
//						{"input" : "suggestId"
//						,"location" : map
//					});
////					console.log(ac);  
//					ac.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
//						var str = "";
//						console.log(666);
//						var _value = e.fromitem.value;
//						var value = "";
//						if (e.fromitem.index > -1) {
//							value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
//						}    
//						str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
//						
//						value = "";
//						if (e.toitem.index > -1) {
//							_value = e.toitem.value;
//							value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
//						}    
//						str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
//						G("searchResultPanel").innerHTML = str;
//					});
//				
//					var myValue;
//					ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
//					var _value = e.item.value;
//						myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
//						G("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
//						
//						setPlace();
//					});
//				
//					function setPlace(){
//						map.clearOverlays();    //清除地图上所有覆盖物
//						function myFun(){
//							var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
//							map.centerAndZoom(pp, 18);
//							map.addOverlay(new BMap.Marker(pp));    //添加标注
//						}
//						var local = new BMap.LocalSearch(map, { //智能搜索
//						  onSearchComplete: myFun
//						});
//						local.search(myValue);
//					};	
					
					//添加/删除比例尺 缩放控件
					var top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT});// 左上角，添加比例尺
					var top_left_navigation = new BMap.NavigationControl();  //左上角，添加默认缩放平移控件
					var top_right_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL}); //右上角，仅包含平移和缩放按钮
					/*缩放控件type有四种类型:
					BMAP_NAVIGATION_CONTROL_SMALL：仅包含平移和缩放按钮；BMAP_NAVIGATION_CONTROL_PAN:仅包含平移按钮；BMAP_NAVIGATION_CONTROL_ZOOM：仅包含缩放按钮*/
					
					//添加控件和比例尺  ==》failur
					function add_control(){
						alert(111)
						map.addControl(top_left_control);        
						map.addControl(top_left_navigation);     
						map.addControl(top_right_navigation);   
//						map.addControl(new BMap.ZoomControl()); 
					};
					//移除控件和比例尺
					function delete_control(){
						map.removeControl(top_left_control);     
						map.removeControl(top_left_navigation);  
						map.removeControl(top_right_navigation); 
					};	
				
				
				//添加定位相关控件
				  map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
				  // 添加带有定位的导航控件
				  var navigationControl = new BMap.NavigationControl({
				    // 靠左上角位置
				    anchor: BMAP_ANCHOR_TOP_LEFT,
				    // LARGE类型
				    type: BMAP_NAVIGATION_CONTROL_LARGE,
				    // 启用显示定位
				    enableGeolocation: true
				  });
				  map.addControl(navigationControl);
				  // 添加定位控件
				  var geolocationControl = new BMap.GeolocationControl();
				  geolocationControl.addEventListener("locationSuccess", function(e){
				    // 定位成功事件
				    var address = '';
				    address += e.addressComponent.province;
				    address += e.addressComponent.city;
				    address += e.addressComponent.district;
				    address += e.addressComponent.street;
				    address += e.addressComponent.streetNumber;
				    console.log("当前定位地址为：" + address);
//				    alert(address);
//				    map.centerAndZoom(address,12); 
//					var myGeo = new BMap.Geocoder();      
					// 将地址解析结果显示在地图上，并调整地图视野    
//					myGeo.getPoint(address, function(point){      
//					          if (point) {      
//					              map.centerAndZoom(point, 16);      
//					              map.addOverlay(new BMap.Marker(point));      
//					          }      
//					      }, "北京市");
//					setTimeout(function(){
////						map.panTo(new BMap.Point(address));   //两秒后移动到
//						var local = new BMap.LocalSearch(map, {      
//						      renderOptions:{map: map}      
//						});      
//						local.search(address);	
//					}, 2000);

    				//GPS坐标
				    var x = 116.32715863448607;
				    var y = 39.990912172420714;
				    var ggPoint = new BMap.Point(x,y);
				    translateCallback = function (data){
				      if(data.status === 0) {
				        var marker = new BMap.Marker(data.points[0]);
				        map.addOverlay(marker);
				        var label = new BMap.Label("转换后的百度坐标（正确）",{offset:new BMap.Size(20,-10)});
				        marker.setLabel(label); //添加百度label
				        map.setCenter(data.points[0]);
				      }
				    }
				
				    setTimeout(function(){
				        var convertor = new BMap.Convertor();
				        var pointArr = [];
				        pointArr.push(ggPoint);
				        convertor.translate(pointArr, 3, 5, translateCallback)
				    }, 1000);


				  });
				  geolocationControl.addEventListener("locationError",function(e){
				    // 定位失败事件
				    alert(e.message);
				  });
				  map.addControl(geolocationControl);				
	

				},
				
				goBack: function(){
					window.history.back();
				}
				
				
				
				
			};
			
		}])
})(app);
