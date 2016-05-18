/**
 * Created by LEE on 2016/5/15.
 */
//model��,��������

var  module = angular.module('app.model',['app.services.jsonp']);
module.factory('appModel',['myJsonp', function (jsonp) {
    //�Զ������,�÷�������app.services.jsonpģ��,myJsonp�Ǹ÷��������,����ͨ��[]  jsonp�滻myJsonp

    return {
        //Top250�����ݻ�ȡ
        getTop250: function (start, count, callback) {
            var url = `http://api.douban.com/v2/movie/top250?start=${start}&count=${count}&callback=JSONP_CALLBACK`;
                jsonp(url, function (data) {
                    callback(data);
                });
        },

        //������ӳ�����ݵĻ�ȡ
        getInTheaters: function (start, count, callback) {
            var url = `http://api.douban.com/v2/movie/in_theaters?start=${start}&count=${count}&callback=JSONP_CALLBACK`;
                jsonp(url, function (data) {
                    callback(data);
                });
        },

        // ������ӳ....
        getComingSoon: function (start, count, callback) {
            var url = `http://api.douban.com/v2/movie/coming_soon?start=${start}&count=${count}&callback=JSONP_CALLBACK`;
                jsonp(url, function (data) {
                    callback(data);
                });
        },
        // ��Ӱ����ϸ��Ϣ
        getSubject: function (id, callback) {
            var url = `http://api.douban.com/v2/movie/subject/${id}?callback=JSONP_CALLBACK`;
                jsonp(url, function (data) {
                    callback(data);
                })
        }
    }
}]);