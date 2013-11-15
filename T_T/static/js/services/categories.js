T_T.factory('category', function ($rootScope, $http) {
    var category = {};

    category.data = {
        "result": 1,
        "categoryList": [
            {
                "name": "تست",
                "id": 1
            }
        ]
    };

    category.getfirstLevelCategories = function(){
        var ret = [];
        for(var ind=0; ind<category.data.categoryList.length; ind++)
            if(!("parent" in category.data.categoryList[ind]))
                ret.push(category.data.categoryList[ind]);
        return ret;
    };

    category.getCategoryChildren = function(cid){
        var ret = [];
        for(var ind=0; ind<category.data.categoryList.length; ind++)
            if(category.data.categoryList[ind].parent == cid)
                ret.push(category.data.categoryList[ind]);
        return ret;
    };

    $http({method: 'POST', url: 'http://webproject.roohy.me/ajax/2/90109903/category/list'}).
        success(function(data, status, headers, config) {
            category.data = data;
        });

    return category;
});
