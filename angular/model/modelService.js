/**
 * Created by LEE on 2016/5/15.
 */
//model层,管理数据

var  module = angular.module('app.model',['app.services.jsonp']);
module.factory('appModel',['myJsonp', function (jsonp) {
    //自定义服务,该服务引用app.services.jsonp模块,myJsonp是该服务的名称,可以通过[]  jsonp替换myJsonp

    return {
        //Top250的数据获取
        getTop250: function (start, count, callback) {
            var url = `http://api.douban.com/v2/movie/top250?start=${start}&count=${count}&callback=JSONP_CALLBACK`;
                jsonp(url, function (data) {
                    callback(data);
                });
        },

        //正在热映的数据的获取
        getInTheaters: function (start, count, callback) {
            var url = `http://api.douban.com/v2/movie/in_theaters?start=${start}&count=${count}&callback=JSONP_CALLBACK`;
                jsonp(url, function (data) {
                    callback(data);
                });
        },

        // 即将上映....
        getComingSoon: function (start, count, callback) {
            var url = `http://api.douban.com/v2/movie/coming_soon?start=${start}&count=${count}&callback=JSONP_CALLBACK`;
                jsonp(url, function (data) {
                    callback(data);
                });
        },
        // 电影的详细信息
        getSubject: function (id, callback) {
            var url = `http://api.douban.com/v2/movie/subject/${id}?callback=JSONP_CALLBACK`;
                jsonp(url, function (data) {
                    callback(data);
                })
        }
    }
}]);