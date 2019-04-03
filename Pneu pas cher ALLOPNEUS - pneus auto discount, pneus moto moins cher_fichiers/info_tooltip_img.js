$(document).ready(function() {
    var xOffsetDim = -235;
    var yOffsetDim = -20;
    var body = $('body');
    body.on('mouseenter', '.js-help', function(e){
        var rel = $(this).attr('rel');
        if (undefined !== rel) {
            $("body").append("<p id='screenshot_png'><img src='" + rel + "'/></p>");
            $("#screenshot_png").css("top", (e.pageY - yOffsetDim) + "px").css("left", (e.pageX + xOffsetDim) + "px").fadeIn("fast");
        }
    });
    body.on('mouseleave', '.js-help', function(){
        $("#screenshot_png").remove();
    });
    body.on('mousemove', '.js-help', function(e){
        $("#screenshot_png").css("top", (e.pageY - yOffsetDim) + "px").css("left", (e.pageX + xOffsetDim) + "px");
    });
});