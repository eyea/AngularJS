angular.module('starter.services', [])

//  .service('Tab1Service', function ($http) {
//      this.getClassify = function () {
//        return [
//          { name: '健康资讯', viewable: true, url: domain + '/info/list', page: 1, rows: 20 },
//          { name: '健康知识', viewable: false, url: domain + '/lore/list', page: 1, rows: 20 },
//          { name: '健康问答', viewable: false, url: domain + '/ask/list', page: 1, rows: 20 },
//          { name: '健康图书', viewable: false, url: domain + '/book/list', page: 1, rows: 20 }
//        ]
//      }
//
//      this.getList = function (url, page, rows) {
//        return $http.post(url, { page: page, rows: rows })
//      } 
//      
//		this.getDetails = function (id) {
//		    return $http.get(urls.info_show + id);
//		}   
//		
//});

.service('Tab1Service', function ($http) {
    this.getClassify = function () {
      return [
        {
          name: '健康资讯', isload: true, url: server.domain + '/info/list',
          page: 1, rows: 20,
          items: [],
          loadMore: function () {
            $this = this;
            console.log("正在加载更多数据..." + this.page);
//          $http.get(this.url + "?page=" + this.page + "&rows=" + settings.rows).success(function (response) {
//            $this.items = $this.items.concat(response.tngou);
//            $this.page++;
//            $this.callback();
//          });
		  $http.jsonp($this.url + "?page=" + $this.page + "&rows=" + settings.rows + "&callback=JSON_CALLBACK").success(function (response) {
		    console.log(response);
		    if (response.tngou.length > 0) {
		      $this.items = $this.items.concat(response.tngou);
		      $this.page++;
		    } else {
		      console.log("没有数据了...")
		      $this.isload = true;
		    }
		    $this.callback();
		  });
        },
          doRefresh: function () {
            $this = this;
            console.log("正在执行refresh操作...");
//          $http.get(this.url + "?page=1&rows=" + settings.rows).success(function (response) {
//            $this.page = 2;
//            $this.items = response.tngou;
//            $this.callback();
//          });
			  //使用jsonp的方式请求
			  $http.jsonp($this.url + "?page=1&rows=" + settings.rows + "&callback=JSON_CALLBACK").success(function (response) {
			    console.log(response);
			    $this.page = 2;
			    $this.items = response.tngou;
			    $this.callback();
			    $this.isload = false;
			  });
  
          },
          callback: function () {
            //回掉函数
          }
        },
        {
          name: '健康知识', isload: true, url: server.domain + '/lore/list',
          page: 1, rows: 20,
          items: [],
          loadMore: function () {
            $this = this;
            console.log("正在加载更多数据..." + this.page);
            $http.get(this.url + "?page=" + this.page + "&rows=" + settings.rows).success(function (response) {
              $this.items = $this.items.concat(response.tngou);
              $this.page++;
              $this.callback();
            });
          },
          doRefresh: function () {
            $this = this;
            console.log("正在执行refresh操作...");
            $http.get(this.url + "?page=1&rows=" + settings.rows).success(function (response) {
              $this.page = 2;
              $this.items = response.tngou
              $this.callback();
            });
          },
          callback: function () {
            //回掉函数
          }
        },
        {
          name: '健康问答', isload: true, url: server.domain + '/ask/list',
          page: 1, rows: 20,
          items: [],
          loadMore: function () {
            $this = this;
            console.log("正在加载更多数据..." + this.page);
            $http.get(this.url + "?page=" + this.page + "&rows=" + settings.rows).success(function (response) {
              $this.items = $this.items.concat(response.tngou);
              $this.page++;
              $this.callback();
            });
          },
          doRefresh: function () {
            $this = this;
            console.log("正在执行refresh操作...");
            $http.get(this.url + "?page=1&rows=" + settings.rows).success(function (response) {
              $this.page = 2;
              $this.items = response.tngou
              $this.callback();
            });
          },
          callback: function () {
            //回掉函数
          }
        } 
      ]
    };

	this.getDetails = function (id) {
			    return $http.get(urls.info_show + id);
			}  
    
})