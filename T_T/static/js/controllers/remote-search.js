T_T.controller('RemoteSearch', ['$scope', 'category',
    function ($scope, category) {
        $scope.category = category;
        $scope.selected = 0;

        $scope.selectCategory = function(id){
            $scope.selected = id;
        };

        $scope.getSelectedCategory = function(){
            var ret = {
                "name": "همه‌‌ی موارد",
                "id" : 0
            };

            if($scope.selected == 0)
                return ret;
            else
                for(var ind=0; ind<category.data.categoryList.length; ind++)
                    if(category.data.categoryList[ind].id == $scope.selected)
                        ret = category.data.categoryList[ind];
            return ret;
        };
    }
]);
