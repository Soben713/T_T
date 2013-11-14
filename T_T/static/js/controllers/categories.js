//var eshop = angular.module('eshop', []);

function WareListCtrl($scope, $http) {
    $scope.list = {
    };
    $http({method: 'POST', url: 'http://webproject.roohy.me/ajax/1/901099039090۹۰/category/list'}).
        success(function(data, status, headers, config) {
            $scope.list = data;
        }).
        error(function(data, status, headers, config){
            console.log("ERROR", data)
        });
}