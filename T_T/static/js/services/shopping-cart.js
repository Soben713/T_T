T_T.factory('shoppingCart', function ($rootScope, $http) {
    var shoppingCart = {};

    shoppingCart.data = {};

    shoppingCart._storeData = function (){
        var cart = [];
        for(var i=0; i<shoppingCart.data.cart.length; i++){
            var item = $.extend({}, shoppingCart.data.cart[i], true);
            delete item.$$hashKey;
            cart.push(item);
        }
        localStorage['shoppingCart'] = JSON.stringify(cart);
    };

    shoppingCart.addToCart = function (id) {
        $http({
            method: 'POST',
            url: '/ajax/product/'+id+'/'
        }).success(function (data, status, headers, config) {
            console.log(data);
            shoppingCart.data['cart'].push(data);
            shoppingCart._storeData();
        });
    };

    shoppingCart.removeFromCart = function (index) {
        shoppingCart.data['cart'].splice(index, 1);
        shoppingCart._storeData();
    };

    shoppingCart.fetchData = function () {
        if(typeof(localStorage) != "undefined" && 'shoppingCart' in localStorage && 'shoppingCart')
            shoppingCart.data = {
                'result': 1
            };
            try{
                shoppingCart.data['cart'] = JSON.parse(localStorage['shoppingCart']);
            } catch(e) {
                shoppingCart.data['cart'] = [];
            }
    };

    shoppingCart.broadcast = function () {
        $rootScope.$broadcast('ShoppingCartChanged');
    };

    shoppingCart.fetchData();

    return shoppingCart;
});
