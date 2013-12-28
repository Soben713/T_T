T_T.controller('RemoteSearch',
    ['$scope',
    function ($scope) {

        $scope.selected = 0;
        $scope.name= "همه‌‌ی موارد";

        $scope.selectCategory = function(id, name){
            $scope.selected = id;
            $scope.name=name;
        };

        $scope.getSelectedCategory = function(){
            var ret = {
                "name": "همه‌‌ی موارد",
                "id" : 0
            };

            if($scope.selected != 0){
                ret.name=$scope.name;
                ret.selected=$scope.selected;
            }
            return ret;
        };
    }
]);
