T_T.controller('ProductListCtrl', function ($scope, $http, $location) {
    var search = searchToObject(window.location.search);
    var data = {};

    data['search'] = search['search'] || "";
    data['category'] = search['category'] || 0;
    data['page'] = search['page'] || 1;
    data['pageSize'] = 9;
    $scope.pages = [{'page':1, 'active':true}];
    $scope.page = data['page'];

    $scope.data = {
        "result": 1,
        "page": 1,
        "pageSize": 9,
        "totalResults": 0,
        "productList": [
            {
                "id": 1,
                "name": "شوخی",
                "price": 20000,
                "category": 2,
                "picUrl": "http://jaberangi.ir/tvtop/cinemaiirani/shookhi.jpg"
            }
        ]
    };

    function requestData(){
        data['page'] = $scope.page;
        $http({
            method: 'POST',
            url: 'http://webproject.roohy.me/ajax/1/901099039090۹۰/product/list',
            data: data
        }).success(function(data, status, headers, config) {
                $scope.data = data;
                $scope.pages = [];
                for(var i=1; i*9<$scope.data.totalResults; i++){
                    $scope.pages.push({
                        'page': i,
                        'active': (i==$scope.page)
                    });
                }
        })
    }

    $scope.changePage = function(page){
        $scope.page = page;
        requestData();
    };

    requestData();
});
