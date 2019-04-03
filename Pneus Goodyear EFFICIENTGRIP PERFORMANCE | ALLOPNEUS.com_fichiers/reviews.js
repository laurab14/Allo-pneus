$.extend({
    parseJSON: function( data ) {
        if ( typeof data !== "string" || !data ) {
            return null;
        }
        data = jQuery.trim( data );
        if ( /^[\],:{}\s]*$/.test(data.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@")
            .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]")
            .replace(/(?:^|:|,)(?:\s*\[)+/g, "")) ) {
            return window.JSON && window.JSON.parse ?
                window.JSON.parse( data ) :
                (new Function("return " + data))();
        } else {
            jQuery.error( "Invalid JSON: " + data );
        }
    }
});

function getReviewsAjax(queryParams, action){
    $.ajax({
        type: "POST",
        url: '/mod/Ajax/ReviewController.php',
        data: queryParams,
        success: function(data){

            if(action=='append'){
                $('#ulHolder').append(data);
            } else if (action=='html') {
                $('#ulHolder').html(data);
                $('#seeMore').show();
            }

            if($('.avis_alone').length == reviewCount){
                $('#seeMore').hide();
            }
            if(reviewPage > 0) {
                $('#divTopPage').css('display','block');
            }
        }
    });
}

function getReviewsFormAjax(queryParams, area){
    $.ajax({
        type: "POST",
        url: '/mod/Ajax/ReviewController.php',
        data: queryParams,
        success: function(data){
            $(area).html(data);
        }
    });
}

var reviewQuery = 'DEFAULT';
var reviewItemType = '';
var reviewItemId = '';
var reviewPage = 0;
var reviewCount = 0;

$(document).ready(function(){

    $('#aTopPage').live('click', function(e){
        e.preventDefault();
        $('body,html').scrollTop(0);
    });

    $(".giveRating").click(function(e){
        e.preventDefault();
        $('#tabs').data('tabs').selectTab(2);
        window.location = $('ul.ul_tabs li').eq(2).find('a').attr('href');
    });

    $('.blocDetail').live('click', function(e){
        e.preventDefault();
        var reviewsId = $(this).data('reviews-id');
        // call Ajax only on the 1st click, else toggle rating display
        if ($.trim($('#blocDetailNotes-' + reviewsId).html())) {
            $('#blocDetailNotes-' + reviewsId).toggle()
        } else {
            $.ajax({
                type: "POST",
                url: '/mod/Ajax/ReviewController.php',
                data: {action: 'get_reviews_rating', reviewsId: $(this).data('reviews-id')},
                success: function (data) {
                    $('#blocDetailNotes-' + reviewsId).html(data);
                },
                error: function (data) {
                    $('#blocDetailNotes-' + reviewsId).html('Détails indisponibles pour le moment');
                },
                complete: function (data) {
                    $('#blocDetailNotes-' + reviewsId).toggle();
                }
            });
        }
    });

    $('#seeMore').click(function(e) {

        e.preventDefault();

        reviewPage++;

        var queryParams = 'action=get_review&itemType='+reviewItemType+'&itemId='+reviewItemId+'&query='+reviewQuery+'&page='+reviewPage;
        getReviewsAjax(queryParams, 'append');

    });

    $('.link_up').live('click', function(e){
        e.preventDefault();
        var that = $(this);
        $.ajax({
            type: "GET",
            url: $(this).attr('href'),
            data: $(this).attr('rel'),
            success: function(data){
                if(jQuery.trim(data)=='1'){
                    that.parent().fadeOut().remove();
                }
            }
        });
    });

});
