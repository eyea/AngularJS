"use strict";
window.Promise = window.Promise || require('../promise');
angular.module('jdb', [])
    .service('Api', ['$http', '$httpParamSerializerJQLike', function($http, $httpParamSerializerJQLike) {

        var defaultConfig = {

        };

        var cachePool = {

        };

        function Api(config) {
            config = angular.extend({}, defaultConfig, config);
            this.apiConfig = config.apiConfig;
        }

        Api.prototype.request = function(params) {
            var that = this;
            return new window.Promise(function(resolve, reject) {
                that.getCommonData().then(function(commonData) {
                    var method = params.method || 'get';
                    method = method.toLowerCase();
                    params.data = angular.extend(params.data, commonData);
                    if (method === 'get') {
                        // TODO 如果用get的话就不赋值params.data，赋值params.params就不用手动拼url了
                        var queryStr = json2url(params.data || {});
                        params.url = params.url + '?' + queryStr;
                    } else {
                        if (params.sign) {
                            params.data = setSighAndCommonPa(params.data, params.sign);
                        }
                        if (angular.isObject(params.data)) {
                            // 对参数进行jquery式的序列化
                            params.data = $httpParamSerializerJQLike(params.data);
                            angular.extend(params, {
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                }
                            });
                        }
                    }
                    $http(params).then(resolve, reject);
                });
            });
        };

        Api.prototype.getApiConfig = function() {
            return this.apiConfig;
        };

        // 返回全局promise对象以获取deviceready的状态
        // TODO 这个service和app.js耦合，需要解耦
        Api.prototype.getCommonData = function() {
            return window.deviceReadyPromise;
        };

        Api.prototype.getCache = function(key) {
            return cachePool[key] || undefined;
        };

        Api.prototype.setCache = function(key, value) {
            cachePool[key] = value;
        };

        Api.prototype.localStorage = {
            get: function(key) {
                try {
                    return JSON.parse(localStorage.getItem(key)) || {};
                } catch (e) {
                    return {};
                }

            },
            set: function(key, value) {
                localStorage.setItem(key, JSON.stringify(value));
            }
        };

        function json2url(json) {
            var arr = [];
            var str = '';
            for (var i in json) {
                str = i + '=' + json[i];
                arr.push(str);
            }
            return arr.join('&');
        }

        function parseString(string) {
            var tempobj = {};
            var paraArr = string.split('&');
            for (var i = 0; i < paraArr.length; i++) {
                tempobj[paraArr[i].split('=')[0]] = paraArr[i].replace(paraArr[i].split('=')[0] + '=', '');
            }

            return tempobj;
        }

        function objToString(obj) {
            var tempArr = [];
            for (var i in obj) {
                tempArr.push(i + '=' + obj[i]);
            }
            return tempArr.join('&');
        }

        function setSighAndCommonPa(params, sign) {
            params.ts = (new Date()).getTime();
            var tempObj = params;
            var keyName = [];
            var keyValue = [];
            for (var i in tempObj) {
                keyName.push(i);
            }
            keyName = keyName.sort();
            for (var j in keyName) {
                keyValue.push(tempObj[keyName[j]]);
            }
            keyValue.push(sign);
            tempObj.sign = window.md5(keyValue.join('|'));
            return tempObj;
        }

        return Api;
    }]);
