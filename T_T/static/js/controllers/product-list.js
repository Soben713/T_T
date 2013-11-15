T_T.controller('ProductListCtrl', ['$scope', '$http', '$location', 'shoppingCart',
    function ($scope, $http, $location, shoppingCart) {
        var search = searchToObject(window.location.search);
        var data = {};

        data['search'] = search['search'] || "";
        data['category'] = search['category'] || 0;
        data['page'] = search['page'] || 1;
        data['pageSize'] = 9;

        $scope.pages = [
            {'page': 1, 'active': true}
        ];
        $scope.page = data['page'];

        $scope.data = {};

        function requestData() {
            data['page'] = $scope.page;
            var id = WaitMsg.add("درحال دریافت لیست محصولات");
            $http({
                method: 'POST',
                url: 'http://webproject.roohy.me/ajax/1/901099039090۹۰/product/list',
                data: data
            }).success(function (data, status, headers, config) {
                    $scope.data = data;
                    $scope.pages = [];
                    for (var i = 1; i * 9 < $scope.data.totalResults; i++) {
                        $scope.pages.push({
                            'page': i,
                            'active': (i == $scope.page)
                        });
                    }
                    WaitMsg.success(id);
                }).error(function(){
                    WaitMsg.error(id);
                })
        }

        $scope.changePage = function (page) {
            $scope.page = page;
            $location.search('page', page);
            requestData();
        };

        $scope.addToCart = function (id) {
            shoppingCart.addToCart(id);
        };

        requestData();
    }
]);
