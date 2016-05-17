/**
 * Created by LEE on 2016/5/15.
 */
//�Զ������ʵ��jsonp����
    void function(){
    var module = angular.module('app.services.jsonp',[]);
    module.factory('myJsonp',['$window','$rootScope', function ($window, $rootScope) {
    var count = 0;
    return function (path, fn) {
        //jsonp �����кܶ�,����ص�������
        var callbackName = `_jsonpCallbck_${count++}`;
        //��ԭ��ַ�����滻
        var url = path.replace('JSONP_CALLBACK',callbackName);
        //�����ű���ǩ��
        var scriptElement = $window.document.createElement('script');
        //������ַ
        scriptElement.src = url;
        //�ѽű���ǩ�ŵ���ҳ��(��ȡ�ű���ִ��)
        $window.document.body.appendChild(scriptElement);

        //��Զ�̷������������Ľű���ִ�и����Ļص�������������window�ϴ����ص�����
        $window[callbackName] = function(data){
            //ִ�и����Ļص�����
            fn(data);
            //angular��֪�������Ѿ����£������Ҫ֪ͨangular��������
            //����ֻ��Ҫ�����ܸ������������Ϳ���
            $rootScope.$apply();
            //�ص�����ִ�����ɾ����script��ǩ
            $window.document.body.removeChild(scriptElement);
        }
    }
}]);
    }();