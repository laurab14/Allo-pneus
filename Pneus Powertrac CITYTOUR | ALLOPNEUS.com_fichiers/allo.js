
//function pictoDestock(){
	//if ($(".picto_destock").is(":visible")) {
	//	$(".picto_destock").fadeOut();
	//} else {
	//	$(".picto_destock").fadeIn();
	//}
//};

$(document).ready(function() {
	//setInterval (pictoDestock,4000);

	// caroussel promos hiver
	//on calcule le nombre de fils (d'images)
	var nbChilds = $("#caroussel_promos > ul").children().length;
	//on calcule la largeur d'un fils en incluant marges et borders
	var largeurChild = parseInt($("#caroussel_promos > ul > li").outerWidth(true));
	//on modifie le css du caroussel en conséquence
	$("#caroussel_promos > ul").width(nbChilds*largeurChild);

	function moveCarousel(flag){
		var poscaroussel = parseInt($("#caroussel_promos > ul").css("left"));
		var newposcaroussel = 0;
		var size = largeurChild;
		var visible = Math.floor(parseInt($("#caroussel_promos").outerWidth(true))/size);
		var qty = ($("#caroussel_promos > ul > li").size())-visible;

		if ( poscaroussel == -(size*qty) && flag == "right")
		{
			newposcaroussel = 0;
		} else if ( poscaroussel == 0 && flag == "left")
		{
			newposcaroussel = -(size*qty);
		} else {
			if (flag == "right"){newposcaroussel = poscaroussel-size;}
			else{newposcaroussel = parseInt(poscaroussel)+parseInt(size)};
		};

		$("#caroussel_promos > ul").animate(
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
		$("#caroussel_promos > ul").stop(true,true);
		moveCarousel("left");
	});
	$("#caroussel_right").click(function(){
		$("#caroussel_promos > ul").stop(true,true);
		moveCarousel("right");
	});

	//gestion des op
	function opEnCours (yd, mnthd, dd, hd ,op, yf, mnthf, df, hf) {
		var $maintenant = new Date();
		var $debut = new Date(yd, mnthd-1, dd, hd);
		var $fin = new Date(yf, mnthf-1, df, hf);
		if ( $debut < $maintenant && $maintenant < $fin ) {
			$('#test_countdown').show().append('<span>op '+op+' en cours</span>');
		};
	}
	//permet de définir l'intervalle (date début,nom de l'op,date de fin)
	//aaaa,mm,j,hh pour les dates
	opEnCours(2012,07,8,18,'opcool',2012,07,10,11);

	//Affichage des popups d'aide
	var xOffset = 10;
	var yOffset = 30;
	$(".variantes_chk").hover(function(e) {
		$("body").append("<p id='screenshot'>"+$(this).attr('rel') +"</p>");
		$("#screenshot").css("top",(e.pageY - xOffset) + "px").css("left",(e.pageX + yOffset) + "px").fadeIn("fast");
	},function(){$("#screenshot").remove();});

	$(".question").hover(function(e) {
		$("body").append("<p id='screenshot_png'><img src='"+ $(this).attr('rel') +"'/></p>");
		$("#screenshot_png").css("top",(e.pageY - xOffset) + "px").css("left",(e.pageX + yOffset) + "px").fadeIn("fast");
	},function(){$("#screenshot_png").remove();});

	$(".question,.variantes_chk").mousemove(function(e) {
		$("#screenshot,#screenshot_png").css("top",(e.pageY - xOffset) + "px").css("left",(e.pageX + yOffset) + "px");
	});

	//Affichage des popups d'aide aux dimensions nouveau moteur
	var xOffsetDim = -10;
	var yOffsetDim = -180;
    $("label.dim").hover(function (e) {
        var rel = $(this).attr('rel');
        if (undefined !== rel) {
            $("body").append("<p id='screenshot_png'><img src='" + rel + "'/></p>");
            $("#screenshot_png").css("top", (e.pageY - xOffsetDim) + "px").css("left", (e.pageX + yOffsetDim) + "px").fadeIn("fast");
        }
    }, function () {
        $("#screenshot_png").remove();
    });

    $("label.dim").mousemove(function(e) {
		$("#screenshot,#screenshot_png").css("top",(e.pageY - xOffsetDim) + "px").css("left",(e.pageX + yOffsetDim) + "px");
	});

	// (popups s'affichent cote droit)
	var xOffsetMichFoot = 220;
	var yOffsetMichFoot = 10;
	$(".js-rollOverRight").hover(function(e) {
		$("body").append("<p id='screenshot_png'><img src='"+ $(this).attr('rel') +"'/></p>");
		$("#screenshot_png").css("top",(e.pageY - xOffsetMichFoot) + "px").css("left",(e.pageX + yOffsetMichFoot) + "px").fadeIn("fast");
	},function(){$("#screenshot_png").remove();});

	$(".js-rollOverRight").mousemove(function(e) {
		$("#screenshot,#screenshot_png").css("top",(e.pageY - xOffsetMichFoot) + "px").css("left",(e.pageX + yOffsetMichFoot) + "px");
	});

	// (popups s'affichent cote gauche)
	var xOffsetMichFootRight = 250;
	var yOffsetMichFootRight = -720;
	$(".js-rollOverLeft").hover(function(e) {
		$("body").append("<p id='screenshot_png'><img src='"+ $(this).attr('rel') +"'/></p>");
		$("#screenshot_png").css("top",(e.pageY - xOffsetMichFootRight) + "px").css("left",(e.pageX + yOffsetMichFootRight) + "px").fadeIn("fast");
	},function(){$("#screenshot_png").remove();});

	$(".js-rollOverLeft").mousemove(function(e) {
		$("#screenshot,#screenshot_png").css("top",(e.pageY - xOffsetMichFootRight) + "px").css("left",(e.pageX + yOffsetMichFootRight) + "px");
	});
	// Mini Carousel,
	// Utilisé dans les pages collection / competition
	//
	var updateMiniCarouselNav = function($carousel, pos) {
		var maxPos   = $('.js-miniCarousel-element', $carousel).length - 1;
		var $prev    = $('.prev', $carousel);
		var $next    = $('.next', $carousel);


		if (pos ==  0) {
			$prev.addClass('disabled');
			$next.removeClass('disabled');
		} else if (pos ==  maxPos) {
			$prev.removeClass('disabled');
			$next.addClass('disabled');
		} else {
			$prev.removeClass('disabled');
			$next.removeClass('disabled');
		}
	};
	$('.js-miniCarousel').each(function(){
		var $this      = $(this);
		var $container = $('.js-miniCarousel-container', $this);
		var $elements  = $('.js-miniCarousel-element', $this);
		var elLength   = $elements.length;
		var $prev      = $('.prev', $this);
		var $next      = $('.next', $this);
		var elWidth    = $this.width();
		var totalWidth = elLength * elWidth;
		var currPos    = 0;

		updateMiniCarouselNav($this, currPos);

		$container.css('width', totalWidth + 'px');

		$prev.on('click', function(e){
			e.preventDefault();

			if (!$prev.is('.disabled')) {
				var currentMargin = parseInt($container.css('margin-left'));

				$container.css('margin-left', currentMargin + elWidth + 'px');

				currPos -= 1;

				updateMiniCarouselNav($this, currPos);
			}

		});

		$next.on('click', function(e){
			e.preventDefault();

			if (!$next.is('.disabled')) {
				var currentMargin = parseInt($container.css('marginLeft'));

				$container.css('margin-left', currentMargin - elWidth + 'px');

				currPos += 1;

				updateMiniCarouselNav($this, currPos);
			}
		});
	});

	$('body').on('click', '.js-video-toggle', function(e){
		e.preventDefault();

		var options = {
			dismissmodalclass: 'js-close-video-modal',
			closeonbackgroundclick: true
		};

		if(!$('#myModal').length){
			$('body').append("<div id='myModal' class='reveal-modal'></div>");
		}
		var url   = $(this).attr('data-url');
		url += (url.indexOf('?') === -1) ? '?' : '&';
		$('#myModal').html('<object type="text/html" data="' + url + 'autoplay=1" style="width: 100%;min-height: 100%;">' +
			'</object><a class="close-reveal-modal"></a>'
		);
		$('#myModal').css("visibility","visible");
		$('#myModal').css("height","480");
		$('#myModal').css("width","853");
		$('#myModal').css("padding","0");
		$('#myModal').css("margin-left","-420px");
		$('#myModal').css("background","#999");
		$('#myModal').reveal();
	});

	$('.js-assurance-pl-popin').on('click', function(e){
		e.preventDefault();

		var options = {
			dismissmodalclass: 'js-close-assurance-modal',
			closeonbackgroundclick: true
		};

		$('#assurance-modal').reveal();
	});
	$('body').on('click','.js-caroussel_tab',function(){
		if ($(this).closest('.js-caroussel_element').hasClass("previous")) {
			$(this).closest('.js-caroussel_element').animate({
				right: "-=693",
			}, 400, "swing", function() {
			}).removeClass("previous");
		}
		$(this).closest('.js-caroussel_element').nextAll().each(function () {
			if (!$(this).hasClass("previous")) {
				$(this).animate({
					right: "+=693",
				}, 400, "swing", function() {
				}).addClass("previous");
			}

		});
		$(this).closest('.js-caroussel_element').prevAll().each(function () {
			if ($(this).hasClass("previous")) {
				$(this).animate({
					right: "-=693",
				}, 400, "swing", function() {
				}).removeClass("previous");
			}
		});
	});

    $(".js-btn_buy").click(function(e) {
        e.preventDefault();
        var itemId = $(this).attr("rel"),
            itemQte = $("#item_qte_"+itemId).val(),
        	options = [];

        // If the "add" button has additional data (ex: tpms info), add it as options
        $.each($(this).data(), function(i, e) {
            options[i] = e;
        });

        Allo.cart.add( "ITEM", itemId, itemQte, "modal", options);
    });

    $(".js-scrollTop").click(function() {
        var target = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(target).offset().top
        }, 600);
    });

});

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
function eraseCookie(name) {
	createCookie(name,"",-1);
}

var Allo = Allo || {};

/*
 * Cart related namespace
 */
Allo.cart = Allo.cart || {};

Allo.cart.modalId = "add-modal";
/**
* responseCallback : modal | closure
*/
Allo.cart.add = function (productType, productRef, quantity, responseCallback, requestOptions, loader) {

    //HACK for plaque
    if (productType === "ITEM" && (productRef == 1339 || productRef == 1347)) {
        window.location = "Plaques.html";
        return;
    }
    if (typeof loader === 'undefined' || loader === true) {
        Allo.modal.loader(Allo.cart.modalId);
    }

    Allo.ga.push(['_trackEvent', 'PopinAjoutProduit', 'Affiché', , , true]);

	var requestData = {
		action: "cart_add",
		redirect: "off",
		ref_type: productType,
		ref: productRef,
		qte: quantity,
		vehicle_search: 0
	};

    if (typeof requestOptions !== 'undefined') {
        $.extend(requestData, requestOptions);
    }

    function loadFromECommande(count) {
        $.ajax({
            url: "/mod/Commande/Commande-E/Commande-E.php",
            data: requestData,
            dataType: 'json',
            success: function (data) {
				if (data.error) {
					alert(data.error);
					Allo.modal.close(Allo.cart.modalId);
				}
				else if (data.redirect) {
                    // data.redirect contains the string URL to redirect to
                    Allo.modal.close(Allo.cart.modalId);
                    window.location.href = data.redirect;

                } else {
                    if (responseCallback == "modal") {
                        responseCallback = function (data) {
                            Allo.cart.modalCallback(data);
                        };
                    }

                    if (typeof responseCallback === 'function') {
                        responseCallback(data);
                    }
                }
            },
            error: function (e) {
            	console.log(e);
                if(count == 0){
                    loadFromECommande(1);
                }
                else {
                    alert('Stock momentanément indisponible pour ce pneu');
                    window.location.reload();
                }
            }
        });
    }

    loadFromECommande(0);
};

Allo.cart.modalCallback = function(data, options) {
    var modalOptions = {};
    if (typeof data.contentSize !== 'undefined') {

        modalOptions.modalClass = data.contentSize;
    }

    Allo.modal.open(Allo.cart.modalId, data.title, data.content, modalOptions, options);
};

Allo.cart.addWheelPack = function(wheelRef, tireRef, mounting, quantity)
{
    Allo.modal.loader(Allo.cart.modalId);
    Allo.ga.push(['_trackEvent', 'PopinAjoutProduit', 'Affiché',,,true]);

    var requestData = {
        action: "cart_add_pack",
        redirect: "off",
        ref_wheel: wheelRef,
        ref_tire: tireRef,
        montage_jante: mounting ? 1:0,
        qte: quantity
    };

    $.ajax({
        url: "/mod/Commande/Commande-E/Commande-E.php",
        data: requestData,
        dataType: 'json',
        success: function (data) {
            Allo.modal.open(Allo.cart.modalId, data.title, data.content);
        }
    });
};

/*
 * Modal related namespace
 */
Allo.modal = Allo.modal || {};

Allo.modal.open = function (modalId, title, content, customModalOptions, options) {

	var modalOptions = {
		closeonbackgroundclick: false
		},
		modalIdSelector = "#" + modalId,
		appending = false,
		modalClass = "reveal-modal";

    var defaultOptions = {
        showAdditionalItems: true,
        additionalContents:  null
    };

    options = $.extend({}, defaultOptions, options);

	if (typeof customModalOptions !== 'undefined') {
		$.extend(modalOptions, customModalOptions);
	}

	//Add modal skeleton if not exists
	if ($(modalIdSelector).length === 0) {

		$("body").append('<div id="'+modalId+'" class="reveal-modal"><h1 id="'+modalId+'-title"></h1><div id="'+modalId+'-content"></div></div>');
		appending = true;
	}

	$(modalIdSelector+"-title").html(title);
	$(modalIdSelector+"-content").html(content);

    $(modalIdSelector + ' .js-add-modal-additionnal-items').toggle(options.showAdditionalItems);

    var hasAdditionalContents = null !== options.additionalContents;
    $(modalIdSelector + ' .js-add-modal-additionnal-contents')
        .toggle(hasAdditionalContents)
        .html(hasAdditionalContents ? options.additionalContents : '')
    ;

	if (typeof modalOptions.modalClass !== 'undefined') {

		modalClass += ' ' + modalOptions.modalClass;
	}
	$(modalIdSelector).attr('class', modalClass);

	if (appending || "hidden" === $(modalIdSelector).css('visibility')) {

		$(modalIdSelector).reveal(modalOptions);
	}


}
Allo.modal.close = function (modalId) {

	$('#'+modalId).trigger('reveal:close');
}

Allo.modal.loader = function (modalId) {

	Allo.modal.open(modalId, 
		"", 
		'<div class="modal-loader"></div>', 
		{ modalClass: "loader"});

}
/*
 * Ga related namespace
 */
Allo.ga = Allo.ga || {};

Allo.ga.push = function (gaData) {
	if (_gaq) {
		_gaq.push(gaData);
	}

}
Allo.ga.redirect = function (redirectUrl) {
	if (typeof redirectUrl === 'undefined') {
		window.location.reload(true);
	} else {
		window.location = redirectUrl;
	}
}

Allo.ga.pushAndRedirect = function (gaData, redirectUrl) {
	Allo.ga.push(gaData);
	Allo.ga.redirect(redirectUrl);
}

var addAnchorInAlternate = function () {
    anchor = window.location.hash;
    urlRedirectMobile = $('#js-alternateMobile').attr('href') + anchor;
    $('#js-alternateMobile').attr("href", urlRedirectMobile);
}
