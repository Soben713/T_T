T_T.controller('ProductListCtrl', ['$scope', '$http', '$location', 'shoppingCart',
    function ($scope, $http, $location, shoppingCart) {

        $scope.data = {
            category: 0,
            page: 1,
            pageSize: 9
        };

        /*
         *
         * Handling categories
         *
         */

        $scope.categoryData = {
            "result": 1,
            "categoryList": [
                {
                    "name": "تست",
                    "id": 1
                }
            ]
        };

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
                for(var ind=0; ind<$scope.categoryData.categoryList.length; ind++)
                    if($scope.categoryData.categoryList[ind].id == $scope.data['category'])
                        ret = $scope.categoryData.categoryList[ind];
            return ret;
        };

        $scope.getfirstLevelCategories = function(){
            var ret = [];
            for(var ind=0; ind<$scope.categoryData.categoryList.length; ind++)
                if(!("parent" in $scope.categoryData.categoryList[ind]))
                    ret.push($scope.categoryData.categoryList[ind]);
            return ret;
        };

        $scope.getCategoryChildren = function(cid){
            var ret = [];
            for(var ind=0; ind<$scope.categoryData.categoryList.length; ind++)
                if($scope.categoryData.categoryList[ind].parent == cid)
                    ret.push($scope.categoryData.categoryList[ind]);
            return ret;
        };

        $http({method: 'POST', url: 'http://webproject.roohy.me/ajax/1/901099039090۹۰/category/list'}).
            success(function(data, status, headers, config) {
                $scope.categoryData = data;
            });

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
                url: 'http://webproject.roohy.me/ajax/1/901099039090۹۰/product/list',
                data: $scope.data
            }).success(function (data, status, headers, config) {
                    $scope.productData = data;
                    $scope.pages = [];
                    for (var i = 1; i * 9 < $scope.productData.totalResults; i++) {
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
