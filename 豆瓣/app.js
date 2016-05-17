/**
 * Created by LEE on 2016/5/15.
 */
//·��ģ��

var app = angular.module('app.main',['app.model','ngRoute','app.movieDetail','app.movieList']);
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/detail/:id', {
            templateUrl:'./movie_detail/template.html',
            controller:'movieDetailController'
            //������󶨿�����,ȷ�������򣬲�����·�ɽ���дһ�󴮰�
        })
        .when('/list/:category/:page',{
            templateUrl:'./movie_list/template.html',
            controller:'MovieListController'
        })
        .otherwise({
            //�ض���
            redirectTo:'/list/inTheaters/1'
        });
}]);