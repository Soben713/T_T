function searchToObject(search) {
    var pairs = search.substring(1).split("&"),
        obj = {},
        pair,
        i;

    for ( i in pairs ) {
        if ( pairs[i] === "" ) continue;

        pair = pairs[i].split("=");
        obj[ decodeURIComponent( pair[0] ) ] = decodeURIComponent( pair[1] );
    }

    return obj;
}

window.WaitMsg = {
    list: [],
    add : function(msg){
        var id = "msg" + Math.floor(Math.random()*100000);
        var $el = $("<div class='wait-item' id="+id+">").html(msg).css("display", "none");
        $(".wait-list").prepend($el);
        $el.fadeIn(500);
        return id;
    },
    success: function(id){
        $el = $("#"+id);
        $el.addClass("success");
        (function($el){
            setTimeout(function(){
                $el.fadeOut(500);
            }, 2000);
        })($el);
    },
    error: function(id){
        $el = $("#"+id);
        $el.addClass("error");
        (function($el){
            setTimeout(function(){
                $el.fadeOut(500);
            }, 2000);
        })($el);
    }
};