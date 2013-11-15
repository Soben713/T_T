T_T.controller('CommentCtrl', function ($scope, $http) {

    $scope.list = {
        "result": 1,
        "commentList": [
            {
                "name": "جبار",
                "message": "خیلی خوبه!"
            }
        ]
    };

    var id = WaitMsg.add("در حال دریافت کامنت ها");
    $http({method: 'POST', url: 'http://webproject.roohy.me/ajax/1/9090190109903/comment/list'}).
        success(function(data, status, headers, config) {
            $scope.list = data;
            WaitMsg.success(id);
        }).
        error(function(data, status, headers, config){
            console.log("ERROR", data);
            WaitMsg.error(id);
        });
});