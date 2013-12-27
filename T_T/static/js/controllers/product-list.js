T_T.controller('ProductListCtrl', ['$scope', '$http', '$location', 'shoppingCart', 'category',
    function ($scope, $http, $location, shoppingCart, category) {

        var search = searchToObject(window.location.search);

        $scope.category = category;

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

        $scope.selectCategory = function(id){
            $scope.data['category'] = id;
            $scope.page = 1;
            $scope.updateProductList();
        };

        $scope.getSelectedCategory = function(){
            var ret = {
                "name": "همه‌‌ی موارد",
                "id" : 0
            };

            if($scope.data['category'] == 0)
                return ret;
            else
                for(var ind=0; ind<category.data.categoryList.length; ind++)
                    if(category.data.categoryList[ind].id == $scope.data['category'])
                        ret = category.data.categoryList[ind];
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

        $scope.updateProductList = function() {
            console.log($scope.searchQuery);
            $scope.data['page'] = $scope.page;
            $scope.data['search'] = $scope.searchQuery;
            var id = WaitMsg.add("درحال دریافت لیست محصولات");
            $http({
                method: 'POST',
                url: '/ajax/product/list',
                data: $scope.data
            }).success(function (data, status, headers, config) {
                    $scope.productData = data;
                    $scope.pages = [];
                    for (var i = 1; (i-1) * 9 < $scope.productData.totalResults; i++) {
                        $scope.pages.push({
                            'page': i,
                            'active': (i == $scope.page)
                        });
                    }
                    WaitMsg.success(id);
                }).error(function(){
                    WaitMsg.error(id);
                })
        };

        $scope.search = function(){
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

        ////////////////////////////////////////////////////////////////////////////////////////////////////

    }
]);
