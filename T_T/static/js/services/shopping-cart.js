T_T.factory('shoppingCart', function ($rootScope, $http) {
    var shoppingCart = {};

    shoppingCart.data = {};

    shoppingCart._updateData = function (url, data, msg) {
        var msg_id = WaitMsg.add(msg);
        (function(msg_id){
            $http({
                method: 'POST',
                url: url,
                data: data
            }).success(function (data, status, headers, config) {
                    shoppingCart.fetchData();
                    WaitMsg.success(msg_id);
            }).error(function(){
                    WaitMsg.error(msg_id);
            });
        })(msg_id);
    };

    shoppingCart.addToCart = function (id) {
        var url = 'http://webproject.roohy.me/ajax/2/90109903/cart/add';
        this._updateData(url, {
            'productId': id
        }, 'در حال افزودن به سبد خرید')
    };

    shoppingCart.removeFromCart = function (id) {
        var url = 'http://webproject.roohy.me/ajax/2/90109903/cart/remove';
        this._updateData(url, {
            'productId': id
        }, 'در حال حذف از سبد خرید')
    };

    shoppingCart.fetchData = function () {
        var url = 'http://webproject.roohy.me/ajax/2/90109903/cart/list';
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
