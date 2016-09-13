angular.module('starter.services', [])

    .service('Tab1Service', function ($http) {
        this.getClassify = function () {
          return [
            { name: '健康资讯', viewable: true, url: domain + '/info/list', page: 1, rows: 20 },
            { name: '健康知识', viewable: false, url: domain + '/lore/list', page: 1, rows: 20 },
            { name: '健康问答', viewable: false, url: domain + '/ask/list', page: 1, rows: 20 },
            { name: '健康图书', viewable: false, url: domain + '/book/list', page: 1, rows: 20 }
          ]
        }
//在services.js的Tab1Service中添加一个getList的函数，用来获取数据列表
        this.getList = function (url, page, rows) {
          return $http.post(url, { page: page, rows: rows })
        } 
  });