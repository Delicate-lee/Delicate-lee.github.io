/**
 * Created by LEE on 2016/5/15.
 */
//路由模块

var app = angular.module('app.main',['app.model','ngRoute','app.movieDetail','app.movieList']);
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/detail/:id', {
            templateUrl:'./movie_detail/template.html',
            controller:'movieDetailController'
            //在这里绑定控制器,确定作用域，不用在路由界面写一大串绑定
        })
        .when('/list/:category/:page',{
            templateUrl:'./movie_list/template.html',
            controller:'MovieListController'
        })
        .otherwise({
            //重定向
            redirectTo:'/list/inTheaters/1'
        });
}]);