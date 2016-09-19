;
'use strict';
angular.module('businessApp').service('apiService', ['$http', 'Api', function($http, Api) {
    var apiConfig = {};

    var api = new Api({
        apiConfig: apiConfig
    });
    var commonParaObj = {}

    var applyResult = {};
    var GuaranteeName = '';


    //判断是否正在调用端上的代理转发
    var flagIfProxing = false;

    function json2url(json) {
        var arr = [];
        var str = '';
        for (var i in json) {
            str = i + '=' + json[i];
            arr.push(str);
        }
        return arr.join('&');
    }

    function fetch(url, data, method) {
        method = method.toLowerCase();
        //alert('before post');
        if (method == 'get') {
            var params = json2url(data);

            return $http.get(url + '?' + params);
        } else {
            // alert('before post');
            if (typeof(data) === 'object') {

                return $http.post(url, data, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                });
            } else {
                return $http.post(url, data, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                });
            }

        }
    }

    this.getCommonData = function() {
      return api.getCommonData();
    }

    this.setCommonData = function(res) {
      commonParaObj = angular.extend({}, res);
      try {
        commonParaObj.companyName = decodeURIComponent(commonParaObj.companyName);
      } catch (e) {
        //$scope.data.companyName = commonParaObj.companyName;
      }
    }

    this.getData = function (urlApi, paramsObj, successCall, errorCall) {
      var params = angular.extend({},paramsObj || {});
      fetch(urlApi, params, 'post').success(function(res) {
        successCall && successCall(res);
      }).error(function(e) {
        errorCall && errorCall(e);
      });;
    }
}]);
