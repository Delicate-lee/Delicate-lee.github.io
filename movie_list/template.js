//app.movieListģ��
(function () {
    var moveList = angular.module('app.movieList',['app.model','ngRoute']);
    moveList.controller('MovieListController', ['$scope','$routeParams','appModel',
        function ($scope,$routeParams,appModel) {
            var category = $routeParams.category;
            var page = $routeParams.page;

            //��ʼ��¼�͵�ǰҳ���йأ�ÿҳ��ʾ���б�����Ŀ�й�
            var listCount = 12;
            var start = (page-1) * listCount;

            //ҳ����Ҫ��ʾ���б�����
            var vm = $scope.vm = {};
            vm.data = [];
            vm.pager = {};


            //���ڼ��صı�־
            vm.loading  = true;


            function buildPager(page,total,listCount,category){
                this.curr = page;

                this.max = Math.ceil(total / listCount);
                //��һҳ
                this.next = page == this.max
                    ? this.max
                    : page -0 + 1;
                //��һҳ
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



