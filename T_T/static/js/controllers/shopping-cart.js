T_T.controller('ShoppingCartCtrl', ['$scope', 'shoppingCart',
    function ($scope, shoppingCart) {
        $scope.data = {};
        $scope.$on('ShoppingCartChanged', function() {
            $scope.data = shoppingCart.data;
        });
        $scope.data = shoppingCart.data;

        $scope.removeFromCart = function (id) {
            shoppingCart.removeFromCart(id);
        };

        $scope.totalPrice = function(){
            var ret = 0;
            for(var i=0; i<$scope.data.cart.length; i++)
                ret+= $scope.data.cart[i].price;
            return ret;
        }
    }
]);
