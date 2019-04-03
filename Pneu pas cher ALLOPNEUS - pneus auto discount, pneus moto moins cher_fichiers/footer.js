/**
 * Created by dev on 19/06/14.
 */

$(document).ready(function(){
    ///////////////////////////
    // caroussel des marques //
    ///////////////////////////

    //on calcule la largeur et le nombre de fils (de marques)
    var nbChilds = $("#conteneur_caroussel").children().length;
    var largeurChild = parseInt($("#conteneur_caroussel li").css("width"));
    //on modifie le css du caroussel en conséquence
    $("#conteneur_caroussel").width(nbChilds*largeurChild);

    function moveCarousel(flag){
        var poscaroussel = parseInt($("#conteneur_caroussel").css("left"));
        var newposcaroussel = 0;
        var size = parseInt($("#conteneur_caroussel li").css("width"));
        var visible = Math.floor((parseInt($("#conteneur_caroussel").parent().css("width"))-100)/size);
        var qty = ($("#conteneur_caroussel > li").size())-visible;

        if ( poscaroussel == -(size*qty) && flag == "right")
        {
            newposcaroussel = 0
        } else if ( poscaroussel == 0 && flag == "left")
        {
            newposcaroussel = -(size*qty)
        } else {
            if (flag == "right"){newposcaroussel = poscaroussel-size;}
            else{newposcaroussel = parseInt(poscaroussel)+parseInt(size)};
        };

        $("#conteneur_caroussel").animate(
            {
                left:newposcaroussel
            } ,
            400,
            'swing',
            function(){}
        );
    };

    var flag= "left";
    $("#caroussel_left").click(function(){
        $("#conteneur_caroussel").stop(true,true);
        moveCarousel("left");
    });
    $("#caroussel_right").click(function(){
        $("#conteneur_caroussel").stop(true,true);
        moveCarousel("right");
    });
});