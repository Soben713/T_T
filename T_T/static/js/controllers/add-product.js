T_T.controller('AddProduct', ['$scope', 'category', '$http',
    function ($scope, category, $http) {
        $scope.category = category;

        $scope.picId = null;
        $scope.picUrl = null;
        $scope.image = {
            x1:null,
            y1:null,
            width:null,
            height:null
        };

        $scope.imageFormSubmitted = function(){
            console.log('here');
            $('#image-form').ajaxSubmit({
                url: 'http://webproject.roohy.me/ajax/1/901099039090۹۰/product/uploadimage',
                type: 'POST',
                success: function(response){
                    $scope.$apply(function(){
                        $scope.picId = response.picId;
                        $scope.picUrl = response.picUrl;
                    });
                    $("#to-be-cropped").imgAreaSelect({
                        handles: true,
                        onSelectEnd: function(img, response){
                            $scope.$apply(function(){
                                $scope.image.x1 = response.x1;
                                $scope.image.y1 = response.y1;
                                $scope.image.width = response.width;
                                $scope.image.height = response.height;
                                console.log($scope.image)
                            });
                        }
                    })
                }
            });
        };

        $scope.formSubmitted = function(){
            if($scope.picId){
                console.log($scope.name, $scope.desc);
                $http({
                    method: 'POST',
                    url: 'http://webproject.roohy.me/ajax/1/901099039090۹۰/product/add',
                    data: {
                        "name": $scope.name,
                        "description": $scope.desc,
                        "category": $scope.form_category,
                        "price": $scope.price,
                        "picId": $scope.picId,
                        "x": $scope.image.x1,
                        "y": $scope.image.y1,
                        "w": $scope.image.width,
                        "h": $scope.image.height
                    }
                }).success(function (data, status, headers, config) {
                        alert("تبریک می‌گوییم، شما محصول خود را ثبت کردید")
                    }).error(function(){
                        alert("There was a problem")
                    })
            }
        }
    }
]);
