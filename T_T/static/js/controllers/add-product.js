T_T.controller('AddProduct', ['$scope', 'category', '$http',
    function ($scope, category, $http) {
        $scope.category = category;

        $scope.hasImage = false;

        $scope.image = {
            x1:null,
            y1:null,
            width:null,
            height:null
        };

        $("#id_image").change(function(){
            var input = this;
            $scope.hasImage = true;
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('#to-be-cropped').attr('src', e.target.result);
                };
                reader.readAsDataURL(input.files[0]);
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
                });
                $scope.$apply();
            }
        });
    }
]);
