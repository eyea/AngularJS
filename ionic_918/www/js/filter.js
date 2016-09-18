(function(app){
	app
		.filter('toUpperCaseText',function(){
			return function(x){
				if(x){ // 加判断免得初始化没有值得时候报错
					return x.toUpperCase();
				}
			}
		})
})(app);
