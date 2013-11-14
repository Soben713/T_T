//var eshop = angular.module('eshop', []);

function WareListCtrl($scope, $http) {
    $scope.selected = -1; // -1 if ALL

    $scope.list = {
        "result": 1,
        "categoryList": [
            {
                "name": "تست",
                "id": 1
            }
        ]
    };

    $scope.select = function(id){
        $scope.selected = id;
    };

    $scope.getSelected = function(){
        if($scope.selected == -1)
            return {
                "name": "همه‌‌ی موارد",
                "id" : -1
            };
        var ret;
        for(var ind=0; ind<$scope.list.categoryList.length; ind++)
            if($scope.list.categoryList[ind].id == $scope.selected)
                ret = $scope.list.categoryList[ind];
        return ret;
    };

    $scope.firstLevel = function(){
        var ret = [];
        for(var ind=0; ind<$scope.list.categoryList.length; ind++)
            if(!("parent" in $scope.list.categoryList[ind]))
                ret.push($scope.list.categoryList[ind]);
        return ret;
    };

    $scope.getChildren = function(id){
        var ret = [];
        for(var ind=0; ind<$scope.list.categoryList.length; ind++)
            if($scope.list.categoryList[ind].parent == id)
                ret.push($scope.list.categoryList[ind]);
        return ret;
    };

    $http({method: 'POST', url: 'http://webproject.roohy.me/ajax/1/901099039090۹۰/category/list'}).
        success(function(data, status, headers, config) {
            $scope.list = data;
        }).
        error(function(data, status, headers, config){
            console.log("ERROR", data)
        });
}