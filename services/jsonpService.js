/**
 * Created by LEE on 2016/5/15.
 */
//自定义服务，实现jsonp访问
    void function(){
    var module = angular.module('app.services.jsonp',[]);
    module.factory('myJsonp',['$window','$rootScope', function ($window, $rootScope) {
    var count = 0;
    return function (path, fn) {
        //jsonp 数量有很多,定义回掉函数名
        var callbackName = `_jsonpCallbck_${count++}`;
        //对原地址进行替换
        var url = path.replace('JSONP_CALLBACK',callbackName);
        //创建脚本标签，
        var scriptElement = $window.document.createElement('script');
        //并给地址
        scriptElement.src = url;
        //把脚本标签放到网页上(获取脚本并执行)
        $window.document.body.appendChild(scriptElement);

        //从远程服务器发回来的脚本会执行给定的回掉函数，而且在window上创建回掉函数
        $window[callbackName] = function(data){
            //执行给定的回掉函数
            fn(data);
            //angular不知道数据已经更新，因此需要通知angular更新数据
            //而且只需要个人能更新最顶层作用域就可以
            $rootScope.$apply();
            //回掉函数执行完就删除该script标签
            $window.document.body.removeChild(scriptElement);
        }
    }
}]);
    }();