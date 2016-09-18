angular.module('starter.services', [])
//service层对不同的分类做了函数封装。每个分类都有自己的数据源items[]、doRefresh(下拉加载)、loadMore(加载更多)，各个分类的数据加载都互不影响。视图层是直接通过controller为载体调用的service的函数。下面介绍下各个属性的说明：
//
//name：菜单名
//isload：是否加载
//url：接口
//page：页数
//row：每页请求的条数(暂时没用到，这里做为备用参数)，现在的页数都是用的全局配置config.js中的settings.rows
//items:数据列表
//loadMore：上拉加载更多 。
//doRefresh：下拉刷新。
//callback：回掉函数，在loadMore和doRefresh操作完成都会调用该函数。
//搞清楚视图层的包含关系
//对service层代码的理解
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
              $this.items = response.tngou;
              $this.callback();
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
    } 
  })

//.service('Tab1Service', function ($http) {
//  this.getClassify = function () {
//    return [
//      { name: '健康资讯', viewable: true, url: domain + '/info/list', page: 1, rows: 20 },
//      { name: '健康知识', viewable: false, url: domain + '/lore/list', page: 1, rows: 20 },
//      { name: '健康问答', viewable: false, url: domain + '/ask/list', page: 1, rows: 20 },
//      { name: '健康图书', viewable: false, url: domain + '/book/list', page: 1, rows: 20 }
//    ]
//  }
//
//  this.getList = function (url, page, rows) {
//    return $http.post(url, { page: page, rows: rows })
//  }
//})