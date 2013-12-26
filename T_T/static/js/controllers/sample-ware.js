T_T.controller('CommentCtrl', ['$scope', '$http', 'shoppingCart',
    function ($scope, $http, shoppingCart) {

        $scope.list = {
            "result": 1,
            "commentList": [
                {
                    "name": "جبار",
                    "message": "خیلی خوبه!"
                }
            ]
        };

        $scope.pages = [];

        $scope.active_page = 1;

        $scope.COMMENT_PER_PAGE = 10;

        $scope.updatePages = function() {
            $scope.pages = [];
            var start = $scope.list.commentList.length-1;
            var toBeAdded = {
                'commentList': []
            };
            for(var i=start; i>=0; i--){
                if(toBeAdded.commentList.length<$scope.COMMENT_PER_PAGE && i!=0){
                    toBeAdded.commentList.push($scope.list.commentList[i]);
                } else {
                    if(toBeAdded.commentList.length>0){
                        toBeAdded.pageNum = $scope.pages.length + 1;
                        $scope.pages.push(toBeAdded);
                        toBeAdded = {
                            'commentList': []
                        };
                    }
                }
            }
        };

        $scope.getActive = function(page){
            return page.pageNum == $scope.active_page;
        };

        $scope.getCurrentList = function() {
            return $scope.pages[$scope.active_page - 1];
        };

        $scope.changePage = function(x){
            $scope.active_page = x;
        };

        $scope.addComment = function () {
            $http({
                method: 'POST',
                url: 'http://webproject.roohy.me/ajax/2/90109903/comment/add',
                data: {message: $scope.comment}
            });

            $scope.list.commentList.push({name: $scope.name, message: $scope.comment});
            $scope.name = "";
            $scope.comment = "";
            $scope.updatePages();
        };

        $scope.addToCart = function (id) {
            shoppingCart.addToCart(id);
        };


        var id = WaitMsg.add("در حال دریافت کامنت ها");
        $http({method: 'POST', url: 'http://webproject.roohy.me/ajax/2/90109903/comment/list'}).
            success(function (data, status, headers, config) {
                $scope.list = data;
                WaitMsg.success(id);
                $scope.updatePages();
            }).
            error(function (data, status, headers, config) {
                console.log("ERROR", data);
                WaitMsg.error(id);
            });
    }
]);