T_T.directive('cart', function () {
    return {
        restrict: 'E',
        transclude: false,
        scope: {},
        controller: function ($scope, shoppingCart) {
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
                if('cart' in $scope.data)
                    for(var i=0; i<$scope.data.cart.length; i++)
                        ret+= $scope.data.cart[i].price;
                return ret;
            }
        },
        template:
"            <div class='panel panel-default'>"+
"                <div class='panel-heading'>"+
"                    <span class='glyphicon glyphicon-shopping-cart'></span>"+
"                سبد خرید"+
"                </div>"+
"                <div class='panel-body'>"+
"                    <ul class='tag-group'>"+
"                        <li class='tag-group-item' ng-repeat='product in data.cart'>"+
"                        [[product.name | limitTo:25]]"+
"                            <span class='label label-info'>[[product.price]] ریال</span>"+
"                            <a class='btn btn-link' ng-click='removeFromCart(product.id)'>"+
"                                <span class='glyphicon glyphicon-remove pull-left'></span>"+
"                            </a>"+
"                        </li>"+
"                    </ul>"+
"                </div>"+
"                <div class='panel-footer'>"+
"                    <p class='pull-right'>"+
"                    جمع فاکتور:"+
"                    </p>"+
"                    <p class='pull-left'>"+
"                    [[totalPrice()]] ریال"+
"                    </p>"+
"                    <div class='clearfix'></div>"+
"                </div>"+
"            </div>",
        replace: true
    };
});