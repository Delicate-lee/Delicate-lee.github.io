//app.movieList模块
(function () {
    var moveList = angular.module('app.movieList',['app.model','ngRoute']);
    moveList.controller('MovieListController', ['$scope','$routeParams','appModel',
        function ($scope,$routeParams,appModel) {
            var category = $routeParams.category;
            var page = $routeParams.page;

            //起始记录和当前页面有关，每页显示的列表项数目有关
            var listCount = 12;
            var start = (page-1) * listCount;

            //页面上要显示的列表数据
            var vm = $scope.vm = {};
            vm.data = [];
            vm.pager = {};


            //正在加载的标志
            vm.loading  = true;


            function buildPager(page,total,listCount,category){
                this.curr = page;

                this.max = Math.ceil(total / listCount);
                //下一页
                this.next = page == this.max
                    ? this.max
                    : page -0 + 1;
                //上一页
                this.prev = page == 1
                ? 1
                : page - 1;
                this.category = category;

            }



            switch(category){
                case 'top250':
                    appModel.getTop250(start,listCount, function (data) {
                        vm.data = data.subjects;
                        vm.pager = new buildPager(page,data.total,listCount,category);
                        vm.loading =false;

                    });
                    break;
                case 'inTheaters':
                    appModel.getInTheaters(start,listCount, function (data) {
                        vm.data = data.subjects;
                        vm.pager = new buildPager(page,data.total,listCount,category);
                        vm.loading = false;
                    });
                    break;
                case 'comingSoon':
                    appModel.getComingSoon(start,listCount, function (data) {
                        vm.data = data.subjects;
                        vm.pager = new buildPager(page,data.total,listCount,category);
                        vm.loading = false;
                    });
                    break;
            }

        }])
})()



