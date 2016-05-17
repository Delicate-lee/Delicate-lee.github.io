void function () {
   var module = angular.module('app.movieDetail',['app.model']);
    module.controller('movieDetailController',['$scope','$route','$routeParams','appModel',
        function ($scope,$route,$routeParams,appModel) {
        var id = $routeParams.id;
        appModel.getSubject(id, function (data) {
            $scope.data = data;
        });
    }]);
}();