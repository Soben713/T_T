T_T.controller('ProductListCtrl', ['$scope', '$http', '$location', 'shoppingCart',
    function ($scope, $http, $location, shoppingCart) {

        var search = searchToObject(window.location.search);

        $scope.advancedSearch = false;

        $scope.seller = "";
        $scope.to_price = "";
        $scope.from_price = "";
        $scope.searchQuery = ('search' in search ? search['search'] : "");
        $scope.data = {
            category: ('category' in search ? search['category'] : 0),
            page: 1,
            pageSize: 9
        };

        /*
         *
         * Handling categories
         *
         */

        $scope.selected = 0;
        $scope.name = "همه‌‌ی موارد";

        $scope.selectCategory = function (id, name) {
            $scope.selected = id;
            $scope.name = name;
        };

        $scope.getSelectedCategory = function () {
            var ret = {
                "name": "همه‌‌ی موارد",
                "id": 0
            };

            if ($scope.selected != 0) {
                ret.name = $scope.name;
                ret.selected = $scope.selected;
            }
            return ret;
        };

        /*
         *
         * Handling list
         *
         */

        $scope.pages = [
            {'page': 1, 'active': true}
        ];

        $scope.page = $scope.data['page'];

        $scope.productData = {};

        $scope.updateProductList = function () {
            $scope.data['page'] = $scope.page;
            $scope.data['search'] = $scope.searchQuery;
            $scope.data['category'] = $scope.selected;

            if($scope.advancedSearch){
                var from_date = $("[name='from_date']").val() || "";
                var to_date = $("[name='to_date']").val() || "";
                $scope.data['to_date'] = to_date=="" ? "" : jalaliStrToGreg(to_date).join("/");
                $scope.data['from_date'] = from_date=="" ? "" : jalaliStrToGreg(from_date).join("/");
                $scope.data['to_price'] = $scope.to_price;
                $scope.data['from_price'] = $scope.from_price;
            }

            var id = WaitMsg.add("درحال دریافت لیست محصولات");

            $http({
                method: 'POST',
                url: '/ajax/product/list',
                data: $scope.data
            }).success(function (data, status, headers, config) {
                    $scope.productData = data;
                    $scope.pages = [];
                    for (var i = 1; (i - 1) * 9 < $scope.productData.totalResults; i++) {
                        $scope.pages.push({
                            'page': i,
                            'active': (i == $scope.page)
                        });
                    }
                    WaitMsg.success(id);
                }).error(function () {
                    WaitMsg.error(id);
                })
        };

        $scope.activateAdvancedSearch = function () {
            $scope.advancedSearch = true;
            setTimeout(function(){
                var $date = $(".date");
                $date.pDatepicker();
                $date.each(function(){
                    $(this).val("");
                });
            }, 0);
        };

        $scope.deactivateAdvancedSearch = function () {
            $scope.advancedSearch = false;
        };

        $scope.search = function () {
            $scope.page = 1;
            $scope.updateProductList();
        };

        $scope.changePage = function (page) {
            $scope.page = page;
            $scope.updateProductList();
        };

        $scope.addToCart = function (id) {
            shoppingCart.addToCart(id);
        };

        $scope.updateProductList();
    }
]);
