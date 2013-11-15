T_T.factory('shoppingCart', function ($rootScope, $http) {
    var shoppingCart = {};

    shoppingCart.data = {};

    shoppingCart._updateData = function (url, data, callback) {
        $http({
            method: 'POST',
            url: url,
            data: data
        }).success(function (data, status, headers, config) {
                shoppingCart.fetchData();
        });
    };

    shoppingCart.addToCart = function (id) {
        var url = 'http://webproject.roohy.me/ajax/1/901099039090۹۰/cart/add';
        this._updateData(url, {
            'productId': id
        })
    };

    shoppingCart.removeFromCart = function (id) {
        var url = 'http://webproject.roohy.me/ajax/1/901099039090۹۰/cart/remove';
        this._updateData(url, {
            'productId': id
        })
    };

    shoppingCart.fetchData = function () {
        var url = 'http://webproject.roohy.me/ajax/1/901099039090۹۰/cart/list';
        $http({
            method: 'POST', url: url
        }).success(function (data, status, headers, config) {
                shoppingCart.data = data;
                shoppingCart.broadcast();
        });
    };

    shoppingCart.broadcast = function () {
        $rootScope.$broadcast('ShoppingCartChanged');
    };

    shoppingCart.fetchData();

    return shoppingCart;
});
