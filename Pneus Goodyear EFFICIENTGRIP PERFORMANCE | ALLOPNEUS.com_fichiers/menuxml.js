function slugifyString(value) {
    return value.trim()
        .toLowerCase()
        .replace(/\s/g,'-')
        .replace(/[^\w-]+/g,'');
}

function nomActivite(id) {
	var activite_nom = "";
	switch(id){
		case '3':activite_nom="pneu";break;
		case '4':activite_nom="pneu";break;
		case '1':activite_nom="4x4";break;
		case '2':activite_nom="4x4";break;
		case '5':activite_nom="camionnette";break;
		case '12':activite_nom="camionnette";break;
		case '11':activite_nom="competition";break;
		case '10':activite_nom="collection";break;
		case '21':activite_nom="pneu";break;
		default: activite_nom="pneu";break;
	}
	return activite_nom;
}

function initSubTabs() {
	$(".choix_recherche > li > a").click(function(e) {
        e.preventDefault();
		$(this).parent().parent().children().removeClass("active");
		$(this).parent().addClass("active");
		var div = $(this).attr("href").split('-');
		for (var i = 1; i < 4; i++) {
			$(div[0] + "-" + i).css({display:"none"});
		}
		$($(this).attr("href")).css({display:"block"});

        if ((div[1]==3)||(div[1]==2)||(div[1] == undefined)) {
			$(".js-btn_form_search").hide();
		} else {
			$(".js-btn_form_search").show();
		}

		if($(this).attr("href").substr(1,3)!="tab") window.location = $(this).attr("href");
	});
}

function showMenuFabricant() {
	$(".dev_menu-fabricant").click();
}

function initMenuxPneuValues(d1, d2, d3, d4, d5, brand_id) {
	$("#tabset > li:eq(0)").addClass("active");
	$("#menu_1_select_d1").val(d1);
	$("#menu_1_select_d2").val(d2);
	$("#menu_1_select_d3").val(d3);
	$("#menu_1_select_d4").val(d4);
	$("#menu_1_select_d5").val(d5);
	if(brand_id!=-1) {
		$("#menu_1_select_marque").val(brand_id);
	}
}

function initMenuxMotoValues(d1, d2, d3, d4, d5, brand_id) {
	$("#tabset > li:eq(2)").addClass("active");
	$("#menu_2_select_d1").val(d1);
	$("#menu_2_select_d2").val(d2);
	$("#menu_2_select_d3").val(d3);
	$("#menu_2_select_d4").val(d4);
	$("#menu_2_select_d5").val(d5);
	$("#menu_2_select_marque").val(brand_id);
}

function initMenuxQuadValues(d1, d2, d3, brand_id) {
	$("#tabset > li:eq(3)").addClass("active");
	$("#menu_3_select_d1").val(d1);
	$("#menu_3_select_d2").val(d2);
	$("#menu_3_select_d3").val(d3);
	$("#menu_3_select_marque").val(brand_id);
}

function initMenuxPlValues(d1, d2, d3, brand_id) {
	$("#menu_5_select_d1").val(d1);
	$("#menu_5_select_d2").val(d2);
	$("#menu_5_select_d3").val(d3);
	$("#menu_5_select_marque").val(brand_id);
	$("#tabset > li:eq(5)").addClass("active");
}

function initMenuxAgriValues(d1, d2, d3, brand_id) {
	$("#menu_4_select_d1").val(d1);
	$("#menu_4_select_d2").val(d2);
	$("#menu_4_select_d3").val(d3);
	$("#menu_4_select_marque").val(brand_id);
	$("#tabset > li:eq(4)").addClass("active");
}

function getSaison() {
    $saison = $('input[name=pneus]:checked').attr('id');

    if (typeof $saison == 'undefined') {
        return 'ete';
    }
    if ($saison == 'saison_hiver') {
        return 'hiver';
    } else {
        return 'ete';
    }
}

function loadMarques(activite, saison)
{
    $select_marque = '';
    $select_fabriquant = '';

    var jqBrandLoader = $('select[data-loader-brand]');

    if(jqBrandLoader.length > 0) {
        $select_marque = jqBrandLoader;
    } else {
        switch(activite) {
            case 'pneu':
            case '4x4':
            case 'camionnette':
            case 'collection':
            case 'competition':
            case 'remorque':
                $select_marque = $("#menu_1_select_marque");
                $select_fabriquant = $("#menu_1_select_fabriquant");
                break;
            case 'moto':
            case 'routiere':
            case 'cross':
            case 'enduro':
            case 'custom':
            case 'trail':
            case 'scooter':
            case 'competition-moto':
            case 'competition-route':
            case 'dirt':
                $select_marque = $("#menu_2_select_marque");
                $select_fabriquant = $("#menu_2_select_fabriquant");
                break;
            case 'quad':
            case 'sportif':
            case 'utilitaire':
            case 'loisir':
            case 'routier':
                $select_marque = $("#menu_3_select_marque");
                $select_fabriquant = $("#menu_3_select_fabriquant");
                break;
            case 'agri':
            case 'motrice':
            case 'industriel':
            case 'implement':
            case 'complete':
            case 'forestier':
            case 'tracteur':
            case 'vert':
                $select_marque = $("#menu_4_select_marque");
                $select_fabriquant = $("#menu_4_select_fabriquant");
                break;
            case 'pl':
                $select_marque = $("#menu_5_select_marque");
                $select_fabriquant = $("#menu_5_select_fabriquant");
                $select_classification = $("#menu_5_select_classification");
                $select_type = $("#menu_5_select_type");
                break;
            case 'select_marque':
                $select_marque = $("#select_marque_block");
                activite = $select_marque.attr('data-activite');
                break;
            default:
                return;
        }
    }

    // Default : ete
    if (saison == '') {
        saison = 'ete';
    }

    var range = activite;

    if ('pl' == activite) {
        range = $select_type.val();

        if (0 == range) {
            range = activite;
        }

        $.ajax({
            type: "GET",
            url: "/menu/classification-select",
            data: {activityName: activite, rangeId: $select_type.val()},
            async: false,
            success: function (html) {
                if ($select_classification != '') {
                    $select_classification.html(html);
                }
            }
        });
    }

    $.ajax({
        type: "GET",
        url: "/menu/brand-select?range=" + range + "&season=" + saison + "&activity=" + activite,
        async: false,
        success: function(html){
            if ($select_marque != '') {
                $select_marque.html(html);
            }
            // do not update this selector for trucks : always display all the brands
            if ('pl' != activite && $select_fabriquant != '') {
                $select_fabriquant.html(html);
            }
            var selectedValue = $select_marque.data('loader-brand');
            if(undefined != selectedValue && '' != selectedValue) {
                $select_marque.val(selectedValue);
            }
        }
    });

}

function initSelectMarque() {
    $("#select_marque_block").bind("change",function() {
        nom = $("#select_marque_block :selected").text();
        id  = $(this).val();
        var activity = $(this).attr('data-activity');

        if(id > 0) {
            window.location = "/marque/pneu-"+activity+"/"+ slugifyString(nom) +"-"+id;
        }
    });
}
function initSelectMarqueJante() {
    loadMarques('select_marque', getSaison());

    $("#select_marque_block").bind("change",function() {
        nom = $("#select_marque_block :selected").text();
        id  = $(this).val();

        if(id > 0) {
            window.location = "/jantes/marque/" + slugifyString(nom) + "/";
        }
    });
}

function bindSeason(jqBloc, jqD1, jqD2, jqD3, jqD4, jqD5, jqSeasonSummer, jqSeasonWinter, jqType) {
    var txtSummer = 'été';
    var txtWinter = 'hiver';

    var tipSummer = new Opentip(
        jqBloc,
        {
            tipJoint: 'left',
            fixed : true,
            target: ".dimensions",
            showOn: null,
            offset: [ -15, 15 ],
            background : '#ff6600',
            borderColor : '#ff6600',
            hideTrigger: 'closeButton',
            closeButtonCrossColor:'white'
        }
    );
    var tipWinter = new Opentip(
        jqBloc,
        {
            tipJoint: 'left',
            fixed : true,
            target: ".dimensions",
            showOn: null,
            offset: [ -15, 15 ],
            background : '#ff6600',
            borderColor : '#ff6600',
            hideTrigger: 'closeButton',
            closeButtonCrossColor:'white'
        }
    );

    jqSeasonWinter.click(function() {
        tipSummer.hide();
        tipWinter.hide();

        $("#" + jqType.attr('id') + " [value='1']").attr("value","2");
        $("#" + jqType.attr('id') + " [value='3']").attr("value","4");
        $("#" + jqType.attr('id') + " [value='5']").attr("value","12");

        var arrayCurrentDims = {
            0:jqD1.val(),
            1:jqD2.val(),
            2:jqD3.val(),
            3:jqD4.val(),
            4:jqD5.val()
        };

        jqType.trigger('change');

        if(tireFilterManager.isValueInSelect(jqD1.attr('id'), arrayCurrentDims[0])) {
            jqD1.val(jQuery.trim(arrayCurrentDims[0]));
            jqD1.trigger('change');
            if(tireFilterManager.isValueInSelect(jqD2.attr('id'), arrayCurrentDims[1])) {
                jqD2.val(jQuery.trim(arrayCurrentDims[1]));
                jqD2.trigger('change');
                if(tireFilterManager.isValueInSelect(jqD3.attr('id'), arrayCurrentDims[2])) {
                    jqD3.val(jQuery.trim(arrayCurrentDims[2]));
                    jqD3.trigger('change');
                    if(tireFilterManager.isValueInSelect(jqD4.attr('id'), arrayCurrentDims[3])) {
                        jqD4.val(jQuery.trim(arrayCurrentDims[3]));
                    } else {
                        tipWinter.setContent(tireFilterManager.getDimensionsText(arrayCurrentDims, txtWinter, true));
                        tipWinter.show();
                        jqD4.val('');
                        jqD5.val('');
                    }
                } else {
                    tipWinter.setContent(tireFilterManager.getDimensionsText(arrayCurrentDims, txtWinter, false));
                    tipWinter.show();
                    jqType.trigger('change');
                }
            } else {
                tipWinter.setContent(tireFilterManager.getDimensionsText(arrayCurrentDims, txtWinter, false));
                tipWinter.show();
                jqType.trigger('change');
            }
        } else {
            tipWinter.setContent(tireFilterManager.getDimensionsText(arrayCurrentDims, txtWinter, false));
            tipWinter.show();
            jqType.trigger('change');
        }
    });

    jqSeasonSummer.click(function() {
        tipSummer.hide();
        tipWinter.hide();
        $("#" + jqType.attr('id') + " [value='2']").attr("value","1");
        $("#" + jqType.attr('id') + " [value='4']").attr("value","3");
        $("#" + jqType.attr('id') + " [value='12']").attr("value","5");

        var arrayCurrentDims = {
            0:jqD1.val(),
            1:jqD2.val(),
            2:jqD3.val(),
            3:jqD4.val(),
            4:jqD5.val()
        };

        jqType.trigger('change');

        if(tireFilterManager.isValueInSelect(jqD1.attr('id'), arrayCurrentDims[0])) {
            jqD1.val(arrayCurrentDims[0]);
            jqD1.trigger('change');
            if(tireFilterManager.isValueInSelect(jqD2.attr('id'), arrayCurrentDims[1])) {
                jqD2.val(arrayCurrentDims[1]);
                jqD2.trigger('change');
                if(tireFilterManager.isValueInSelect(jqD3.attr('id'), arrayCurrentDims[2])) {
                    jqD3.val(arrayCurrentDims[2]);
                    jqD3.trigger('change');
                    if(tireFilterManager.isValueInSelect(jqD4.attr('id'), arrayCurrentDims[3])) {
                        jqD4.val(jQuery.trim(arrayCurrentDims[3]));
                    } else {
                        tipSummer.setContent(tireFilterManager.getDimensionsText(arrayCurrentDims, txtSummer, true));
                        tipSummer.show();
                        jqD4.val('');
                        jqD5.val('');
                    }
                } else {
                    tipSummer.setContent(tireFilterManager.getDimensionsText(arrayCurrentDims, txtSummer, false));
                    tipSummer.show();
                    jqType.trigger('change');
                }
            } else {
                tipSummer.setContent(tireFilterManager.getDimensionsText(arrayCurrentDims, txtSummer, false));
                tipSummer.show();
                jqType.trigger('change');
            }
        } else {
            tipSummer.setContent(tireFilterManager.getDimensionsText(arrayCurrentDims, txtSummer, false));
            tipSummer.show();
            jqType.trigger('change');
        }
    });
}

function initMenuxPneu(defaults, tabIndex) {
	initSubTabs();

    defaultTab = 0;
    if(tabIndex != undefined ) {
        defaultTab = tabIndex;
    }
    $("div[id^='tab1-']").each(function (i,el) {
        if(i!=defaultTab) $(el).css("display","none");
    });

	var activiteLinkId = 1;
	var CDN = "https://static.allopneus.com/";
	var change_event = "change";
	$.each(jQuery.browser, function(i, val) {
		if(i=="msie" && val==true) change_event = "click";
	});

	//chargement des marques
	$("#menu_1_select_marque").bind("change",function(e) {
		e.preventDefault();
	});

	//bind sur les marques fabriquants
	$("#menu_1_select_fabriquant").bind("change",function() {
		nom = $("#menu_1_select_fabriquant :selected").text();
		id  = $(this).val();
        if(id > 0) {
            window.location = "/marque/pneu-auto/"+ slugifyString(nom) +"-"+id;
        }
	});
    //Initialisation des filtres
    tireFilterManager.init(
        1,
        $("#menu_1_select_type"),
        $("#menu_1_select_d1"),
        $("#menu_1_select_d2"),
        $("#menu_1_select_d3"),
        $("#menu_1_select_d4"),
        $("#menu_1_select_d5"),
        true,
        defaults,
        $("#saison_hiver"),
        $("#menu_1_select_marque")
    );

    if ($('#menu_1_select_d1').length > 0) {
        bindSeason(
            $('.dimensions'),
            $('#menu_1_select_d1'),
            $('#menu_1_select_d2'),
            $('#menu_1_select_d3'),
            $('#menu_1_select_d4'),
            $('#menu_1_select_d5'),
            $('#saison_ete'),
            $('#saison_hiver'),
            $('#menu_1_select_type')
        );
    }

    //Bind sur le boutton "recherche"
    $("#btn-search_tc4, #btn-search_4seasons, #btn-search_competition_collection, #vospneus").click(function(e) {
        var idButton = $(this).attr('id');
		e.preventDefault();
		$("div[id^='tab1-']").each(function (i,el) {
			if(i==0 && $(el).css("display")=="block") {
				var variante = "";var sep = "";var classification = "";
				if ($("#variante_rf").is(':checked')){variante += sep+'rf';sep = ',';}
				if ($("#variante_xl").is(':checked')){variante += sep+'xl';sep = ',';}
                if ($("#variante_tl").is(':checked')){variante += sep+'tl';sep = ',';}
                if ($("#variante_tt").is(':checked')){variante += sep+'tt';sep = ',';}
                if ($("#variante_flancBlanc").is(':checked')){variante += sep+'flancBlanc';sep = ',';}
                if ($("#menu_1_select_classification").val() != ''){
                    classification = $.trim($("#menu_1_select_classification").val());
                }

				type	= $("#menu_1_select_type").val();
				marque	= $("#menu_1_select_marque").val();
                if(idButton === 'btn-search_4seasons') {
                    var season = $("#menu_1_select_season").val();
                } else {
                    var season = $('#saison_hiver').attr('checked') ? 'h' : 'e';
                }
				d1_select = $("#menu_1_select_d1");d1 =  $.trim(d1_select.val());
				d2_select = $("#menu_1_select_d2");d2 =  $.trim(d2_select.val())=='R'?'':$.trim(d2_select.val());
				d3_select = $("#menu_1_select_d3");d3 =  $.trim(d3_select.val());
				d4_select = $("#menu_1_select_d4");d4 =  $.trim(d4_select.val());
				d5_select = $("#menu_1_select_d5");d5 =  $.trim(d5_select.val());
				cp_input = $("#cp_1");
				cp = $.trim($("#cp_1").val());
				p1 = $.trim($("#prix1_1").val());
				p2 = $.trim($("#prix2_1").val());
				if(d1=='' || $.trim($("#menu_1_select_d2 option:selected").text()) == "---" || d3=='' || (cp.length>0 && cp.length!=5)) {
					alert('Merci de renseigner tous les critères de recherche');
					(d1=='') ? d1_select.css({border:'2px solid red'}) : d1_select.css({border:'2px solid #fff'});
					($.trim($("#menu_1_select_d2 option:selected").text()) == "---") ? d2_select.css({border:'2px solid red'}) : d2_select.css({border:'2px solid #fff'});
					(d3=='') ? d3_select.css({border:'2px solid red'}) : d3_select.css({border:'2px solid #fff'});
					(cp.length!=5) ? cp_input.css({border:'2px solid red'}) : cp_input.css({border:'2px solid #fff'});
				} else {
                    var path = "/";
                    if ($("#bloc_hiver.bloc_moteur").length) {
                        path += "pneu-hiver/";
                    }
                    var paramType = type!=0?'&type='+type:'';

					var url = path+"find?activite="+activiteLinkId + paramType + "&marque="+marque+"&d1="+d1+"&d2="+d2+"&d3="+d3+"&d4="+d4+"&d5="+d5+"&variante="+variante+'&saison='+season;

                    if (classification != '' && classification > 0) {
                        url += '&classification='+classification;
                    }

					window.location = url;
				}
			}
		});
	});
    $('#ul_vehicle').css('display', 'block');

    if (0 == tabIndex)
    {
        $("#btn-search_tc4").css('display', 'block');
    }
}

function initMenuxMoto(defaults, tabIndex) {
	initSubTabs();

    defaultTab = 0;
    if(tabIndex != undefined ) {
        defaultTab = tabIndex;
    }
    $("div[id^='tab3-']").each(function (i,el) {
        if(i!=defaultTab) {
            $(el).css("display","none");
        } else {
            $(el).css("display", "block");
        }
    });

	var activite = 2;
	var change_event = "change";
	$.each(jQuery.browser, function(i, val) {
		if(i=="msie" && val==true) change_event = "click";
	});

	//bind sur les marques fabriquants
	$("#menu_2_select_fabriquant").bind("change",function() {
		nom = $("#menu_2_select_fabriquant :selected").text();
		id  = $(this).val();
        window.location = "/marque/pneu-moto/"+ slugifyString(nom) +"-"+id;
	});

    //Initialisation des filtres
    tireFilterManager.init(
        3,
        $("#menu_2_select_type"),
        $("#menu_2_select_d1"),
        $("#menu_2_select_d2"),
        $("#menu_2_select_d3"),
        $("#menu_2_select_d4"),
        $("#menu_2_select_d5"),
        true,
        defaults,
        null,
        $("#menu_2_select_marque")
    );

	$("#btn-search_moto").click(function(e) {
		e.preventDefault();
		$("div[id^='tab3-']").each(function (i,el) {
			if(i==0 && $(el).css("display")=="block") {
				type	= $("#menu_2_select_type").val();
				marque	= $("#menu_2_select_marque").val();
				d1_select = $("#menu_2_select_d1");d1 =  $.trim(d1_select.val());
				d2_select = $("#menu_2_select_d2");d2 =  $.trim(d2_select.val()=='R'?'':d2_select.val());
				d3_select = $("#menu_2_select_d3");d3 =  $.trim(d3_select.val());
				d4_select = $("#menu_2_select_d4");d4 =  $.trim(d4_select.val());
				d5_select = $("#menu_2_select_d5");d5 =  $.trim(d5_select.val());
				prix = (!isNaN($("#prix1_2").val())&&!isNaN($("#prix2_2").val())) ? "p1="+$("#prix1_2").val()+"&p2="+$("#prix2_2").val() : "p1=&p2=";
				if(d1=='' || $.trim($("#menu_2_select_d2 option:selected").text()) == "---" || d3=='') {
					alert('Merci de renseigner tous les critères de recherche');
					(d1=='') ? d1_select.css({border:'2px solid red'}) : d1_select.css({border:'2px solid #fff'});
					($.trim($("#menu_2_select_d2 option:selected").text()) == "---") ? d2_select.css({border:'2px solid red'}) : d2_select.css({border:'2px solid #fff'});
					(d3=='') ? d3_select.css({border:'2px solid red'}) : d3_select.css({border:'2px solid #fff'});
				} else {
                    var paramType = type!=0?'&type='+type:'';
					var url = "/find?activite="+activite+paramType+"&marque="+marque+"&d1="+d1+"&d2="+d2+"&d3="+d3+"&d4="+d4+"&d5="+d5+"&"+prix;
					window.location = url;
				}
			}
		});
	});
}

function initMenuxQuad(defaults, tabIndex) {
	initSubTabs();
	var activite = 3;

    defaultTab = 0;
    if(tabIndex != undefined ) {
        defaultTab = tabIndex;
    }
    $("div[id^='tab2-']").each(function (i,el) {
        if(i!=defaultTab) {
            $(el).css("display","none");
        } else {
            $(el).css("display", "block");
        }
    });

	var activite_nom = "quad";
	var change_event = "change";
	$.each(jQuery.browser, function(i, val) {
		if(i=="msie" && val==true) change_event = "click";
	});

	//bind sur les marques fabriquants
	$("#menu_3_select_fabriquant").bind("change",function(){
		nom = $("#menu_3_select_fabriquant :selected").text();
		id  = $(this).val();
        window.location = "/marque/pneu-quad/"+ slugifyString(nom) +"-"+id;
	});

    //Initialisation des filtres
    tireFilterManager.init(
        2,
        $("#menu_3_select_type"),
        $("#menu_3_select_d1"),
        $("#menu_3_select_d2"),
        $("#menu_3_select_d3"),
        null,
        null,
        true,
        defaults,
        null,
        $("#menu_3_select_marque")
    );
    /*
	//Bind sur le select "d1"
	$("#menu_3_select_d1").change(function() {
		$("#menu_3_select_d3").html('<option value="">---</option>');
		$.post("/mod/Ajax/menu_xml.php", {
			action : "d1", activite : activite_nom, d1: $(this).val()
			}, function(data,state){
			$("#menu_3_select_d2").html(data);
		});
	});

	//Bind sur le select "d2"
	$("#menu_3_select_d2").change(function() {
		$("#menu_3_select_d3").html('<option value="">---</option>');
		$.post("/mod/Ajax/menu_xml.php", {
			action : "d2", activite : activite_nom, d1: $("#menu_3_select_d1").val(), d2: $(this).val()
			}, function(data,state){
			$("#menu_3_select_d3").html(data);
		});
	});
    */

	$("#btn-search_quad").click(function(e) {
		e.preventDefault();
		$("div[id^='tab2-']").each(function (i,el) {
			if(i==0 && $(el).css("display")=="block") {
				var variante = "";var sep = "";
				if($("#variante_equad").attr("checked")) {
					if($("#variante_equad").attr("checked")){variante += sep+'equad';sep = ',';}
				}
				type	= $("#menu_3_select_type").val();
				marque	= $("#menu_3_select_marque").val();
				d1_select = $("#menu_3_select_d1");d1 =  $.trim(d1_select.val());
				d2_select = $("#menu_3_select_d2");d2 =  $.trim(d2_select.val()=='R'?'':d2_select.val());
				d3_select = $("#menu_3_select_d3");d3 =  $.trim(d3_select.val());
				prix = (!isNaN($("#prix1_3").val())&&!isNaN($("#prix2_3").val())) ? "p1="+$("#prix1_3").val()+"&p2="+$("#prix2_3").val() : "p1=&p2=";
				if(d1=='' || $.trim($("#menu_3_select_d2 option:selected").text()) == "---" || d3=='' || $.trim($("#menu_3_select_d4 option:selected").text()) == "---") {
					alert('Merci de renseigner tous les critères de recherche');
					(d1=='') ? d1_select.css({border:'2px solid red'}) : d1_select.css({border:'2px solid #fff'});
					($.trim($("#menu_3_select_d2 option:selected").text()) == "---") ? d2_select.css({border:'2px solid red'}) : d2_select.css({border:'2px solid #fff'});
					(d3=='') ? d3_select.css({border:'2px solid red'}) : d3_select.css({border:'2px solid #fff'});
				} else {
                    var paramType = type!=0?'&type='+type:'';
					var url = "/find?activite="+activite+paramType+"&marque="+marque+"&d1="+d1+"&d2="+d2+"&d3="+d3+"&d4=&d5=&variante="+variante+"&"+prix;
					window.location = url;
				}
			}
		});
	});
}

function initMenuxAgri(defaults, byRange){
    byRange = (typeof byRange === 'undefined') ? true : byRange;

	initSubTabs();

	var activite = 4;
	var activite_nom = "agri";
	var change_event = "change";
	$.each(jQuery.browser, function(i, val) {
		if(i=="msie" && val==true) change_event = "click";
	});

	//bind sur les marques fabriquants
	$("#menu_4_select_fabriquant").bind("change",function() {
		nom = $("#menu_4_select_fabriquant :selected").text();
		id  = $(this).val();
        window.location = "/marque/pneu-agricole/"+ slugifyString(nom) +"-"+id;
	});

    //Initialisation des filtres
    tireFilterManager.init(
        4,
        $("#menu_4_select_type"),
        $("#menu_4_select_d1"),
        $("#menu_4_select_d2"),
        $("#menu_4_select_d3"),
        null,
        null,
        byRange,
        defaults,
        null,
        $("#menu_4_select_marque")
    );

    //Bind sur le boutton "recherche"
    $("div[id^='tab4-']").each(function (i,el) {
        if(i!=0) $(el).css("display","none");
    });

	$("#btn-search_agri").click(function(e) {
		e.preventDefault();
		$("div[id^='tab4-']").each(function (i,el) {
			if(i==0 && $(el).css("display")=="block") {
				var variante = "";var sep = "";
				if($("#variante_radial").attr("checked")){
					if($("#variante_radial").attr("checked")){variante += sep+'radial';sep = ',';}
				}
				type	= $("#menu_4_select_type").val();
				marque	= $("#menu_4_select_marque").val();
				d1_select = $("#menu_4_select_d1");d1 =  $.trim(d1_select.val());
				d2_select = $("#menu_4_select_d2");d2 =  $.trim(d2_select.val()=='R'?'':d2_select.val());
				d3_select = $("#menu_4_select_d3");d3 =  $.trim(d3_select.val());
				prix = (!isNaN($("#prix1_4").val())&&!isNaN($("#prix2_4").val())) ? "p1="+$("#prix1_4").val()+"&p2="+$("#prix2_4").val() : "p1=&p2=";
				if(d1=='' || $.trim($("#menu_4_select_d2 option:selected").text()) == "---" || d3=='') {
					alert('Merci de renseigner tous les critères de recherche');
					(d1=='') ? d1_select.css({border:'2px solid red'}) : d1_select.css({border:'2px solid #fff'});
					($.trim($("#menu_4_select_d2 option:selected").text()) == "---") ? d2_select.css({border:'2px solid red'}) : d2_select.css({border:'2px solid #fff'});
					(d3=='') ? d3_select.css({border:'2px solid red'}) : d3_select.css({border:'2px solid #fff'});
				} else {
                    var paramType = type!=0?'&type='+type:'';
					var url = "/find?activite="+activite+paramType+"&marque="+marque+"&d1="+d1+"&d2="+d2+"&d3="+d3+"&d4=&d5=&variante="+variante+"&"+prix;
					window.location = url;
				}
			}
		});
	});
}

function initMenuxPl(defaults, byRange) {
    byRange = (typeof byRange === 'undefined') ? true : byRange;
	initSubTabs();
	var activite = 5;
	var activite_nom = "pl";
	var change_event = "change";
	$.each(jQuery.browser, function(i, val) {
		if(i=="msie" && val==true) change_event = "click";
	});

	//bind sur les marques fabriquants
	$("#menu_5_select_fabriquant").bind("change",function() {
		nom = $("#menu_5_select_fabriquant :selected").text();
		id  = $(this).val();
        window.location = "/marque/pneu-poids-lourd/"+ slugifyString(nom) +"-"+id;
	});

    //Initialisation des filtres
    tireFilterManager.init(
        5,
        $("#menu_5_select_type"),
        $("#menu_5_select_d1"),
        $("#menu_5_select_d2"),
        $("#menu_5_select_d3"),
        null,
        null,
        byRange,
        defaults,
        null,
        $("#menu_5_select_marque")
    );
    /*
	//Chargement du select d1
	$.ajax({
		type: "POST",
		url: "/mod/Ajax/menu_xml.php",
		data: "action=d0&activite="+activite_nom,
		async: false,
		success: function(html){
			$("#menu_5_select_d1").html(html);
		}
	});

	//Bind sur le select "d1"
	$("#menu_5_select_d1").change(function() {
		$("#menu_5_select_d3").html('<option value="">---</option>');
		$.post("/mod/Ajax/menu_xml.php", {
			action : "d1", activite : activite_nom, d1: $(this).val()
			}, function(data,state){
			$("#menu_5_select_d2").html(data);
			var nboption = $("#menu_5_select_d2 option").length;
			if(nboption==2){
				var valoption 	= $("#menu_5_select_d2 option:eq(1)").html();
				if(valoption=="serie"){
					$("#menu_5_select_d2 option:eq(1)").attr("selected","selected");
					$("#menu_5_select_d2").trigger("change");
				}
			}
		});
	});

	//Bind sur le select "d2"
	$("#menu_5_select_d2").change(function() {
		$("#menu_5_select_d3").html('<option value="">---</option>');
		$.post("/mod/Ajax/menu_xml.php", {
			action : "d2", activite : activite_nom, d1: $("#menu_5_select_d1").val(), d2: $(this).val(),noR:1
			}, function(data,state){
			$("#menu_5_select_d3").html(data);
		});
	});
    */
	//Bind sur le boutton "recherche"
	$("div[id^='tab5-']").each(function (i,el) {
		if(i!=0) $(el).css("display","none");
	});

	$("#btn-search_pl").click(function(e) {
		e.preventDefault();
		$("div[id^='tab5-']").each(function (i,el) {
			if(i==0 && $(el).css("display")=="block") {
				var variante = "";var sep = "";
				if ($("#variante_rechape").is(':checked')) {
					variante += 'rechape';
				}
				var type = $("#menu_5_select_type").val();
				var marque = $("#menu_5_select_marque").val();
                var classification	= $("#menu_5_select_classification").val();
				var d1_select = $("#menu_5_select_d1");d1 = $.trim(d1_select.val());
				var d2_select = $("#menu_5_select_d2");d2 = $.trim(d2_select.val()=='R'?'':d2_select.val());
				var d3_select = $("#menu_5_select_d3");d3 = $.trim(d3_select.val());
				var prix = (!isNaN($("#prix1_5").val())&&!isNaN($("#prix2_5").val())) ? "p1="+$("#prix1_5").val()+"&p2="+$("#prix2_5").val() : "p1=&p2=";
				if(d1=='' || $.trim($("#menu_5_select_d2 option:selected").text()) == "---" || d3=='') {
					alert('Merci de renseigner tous les critères de recherche');
					(d1=='') ? d1_select.css({border:'2px solid red'}) : d1_select.css({border:'2px solid #fff'});
					($.trim($("#menu_5_select_d2 option:selected").text()) == "---") ? d2_select.css({border:'2px solid red'}) : d2_select.css({border:'2px solid #fff'});
					(d3=='') ? d3_select.css({border:'2px solid red'}) : d3_select.css({border:'2px solid #fff'});
				} else {
                    var paramType = type!=0?'&type='+type:'';
					var url = "/find?activite="+activite+paramType+"&classification="+classification+"&marque="+marque+"&d1="+d1+"&d2="+d2+"&d3="+d3+"&d4=&d5=&variante="+variante+"&"+prix;
					window.location = url;
				}
			}
		});
	});
}

function initMenuxJante() {
	initSubTabs();
	var activite = 6;
	var activite_nom = "jante";
	var change_event = "change";
	$.each(jQuery.browser, function(i, val) {
		if(i=="msie" && val==true) change_event = "click";
	});

	//chargement des marques
	$.ajax({
		type: "POST",
		url: "/mod/Ajax/menu_xml.php",
		data: "action=vehicule&activite=jante",
		async: false,
		success: function(html){
			$("#menu_6_select_marque").html(html);
		}
	});

	//Bind sur le select "marque"
	$("#menu_6_select_marque").change(function() {
		$.ajax({
			type: "POST",
			url: "/mod/Ajax/menu_xml.php",
			data: "action=modele&marque="+$(this).val(),
			async: false,
			success: function(html){
				$("#menu_6_select_modele").html(html);
			}
		});
	});

	//Bind sur le boutton "recherche"
	$("div[id^='tab6-']").each(function (i,el) {
		if(i!=0) $(el).css("display","none");
	});
	$("#btn-search_jantes").click(function(e) {
		e.preventDefault();
		$("div[id^='tab6-']").each(function (i,el) {
			if(i==0 && $(el).css("display")=="block") {
				marque	= $.trim($("#menu_6_select_marque").val());
				var modele	= "";var percage = "";
				modele = explode("|",$("#menu_6_select_modele").val());
				percage = modele[0];
				modele  = modele[1];
				diametre= $.trim($("#menu_6_select_diametre").val());
				if(marque=='' || modele=='') {
					alert('Merci de renseigner tous les critères de recherche');
				} else {
					url = "wheels?d="+diametre+"&p="+percage+"&b="+marque+"&m="+modele;
					window.location = url;
				}
			}
		});
	});
}

function loadDimensionForm(activite,type,d1,d2,d3,d4,d5) {
    if(activite != 4 && activite != 5 && activite != 2 && activite != 3) {
        var mySelect = "#menu_"+activite+"_select_d";
        nom_activite = (!isNaN(type)) ? nomActivite(type) : type;
        if(activite==2) nom_activite = "moto";
        if(activite==3) nom_activite = "quad";
        if(activite==4) nom_activite = "agri";
        if(activite==5) nom_activite = "pl";
        $("#menu_"+activite+"_select_type").val(type);
        if(activite==1) {
            $("#menu_1_select_d1").html("");
            $.ajax({
                type: "POST",
                url: "/mod/Ajax/menu_xml.php",
                data: "action=d0&activite="+nomActivite(type),
                async: false,
                success: function(html){
                    $("#menu_1_select_d1").html(html);
                }
            });
        }

        $(mySelect+"1").val(d1);

        if(!(d1==''&&d2==''&&d3=='')) {//charge rien si aucune dim preciser
            var gf = activite==4&&type!=''?'&gf='+type:'';
            $.ajax({
                type: "POST",
                url: "/mod/Ajax/menu_xml.php",
                data: "action=d1&activite="+nom_activite+"&d1="+$(mySelect+"1").val() + gf,
                async: false,
                success: function(html){
                    $(mySelect+"2").html(html);
                    $(mySelect+"2").val(d2);
                }
            });
            var noR = ((activite==4)||(activite==5)) ? 1:0;//afiche le R dans le diametre
            $.ajax({
                type: "POST",
                url: "/mod/Ajax/menu_xml.php",
                data: "action=d2&activite="+nom_activite+"&d1="+$(mySelect+"1").val()+"&d2="+$(mySelect+"2").val()+"&noR="+noR + gf,
                async: false,
                success: function(html){
                    $(mySelect+"3").html(html);
                    $(mySelect+"3").val(d3);
                }
            });
        }

        if ($(mySelect+"4").length > 0) {
            $.ajax({
                type: "POST",
                url: "/mod/Ajax/menu_xml.php",
                data: "action=d3&activite="+nom_activite+"&d1="+$(mySelect+"1").val()+"&d2="+$(mySelect+"2").val()+"&d3="+$(mySelect+"3").val(),
                async: false,
                success: function(html){
                    $(mySelect+"4").html(html);
                    $(mySelect+"4").val(d4);
                }
            });
        }
        if ($(mySelect+"5").length > 0) {
            $(mySelect+"5").val(d5);
        }
    }
}

function initMenuxJante2() {
	initSubTabs();
	var activite = 6;
	var activite_nom = "jante";
	var change_event = "change";
	$.each(jQuery.browser, function(i, val) {
		if(i=="msie" && val==true) change_event = "click";
	});

	//chargement des marques
	$.ajax({
		type: "POST",
		url: "/mod/Ajax/menu_xml.php",
		data: "action=vehicule&activite=jante",
		async: true,
		success: function(html){
			$("#menu_6_select_marque").html(html);
		}
	});

	//Bind sur le select "marque"
	$("#menu_6_select_marque").change(function() {
		$.ajax({
			type: "POST",
			url: "/mod/Ajax/menu_xml.php",
			data: "action=modele&marque="+$(this).val(),
			async: true,
			success: function(html){
				$("#menu_6_select_modele").html(html);
			}
		});
	});

	//Bind sur le select "modele"
	$("#menu_6_select_modele").change(function() {
		$.ajax({
			type: "POST",
			url: "/mod/Ajax/menu_xml.php",
			data: "action=pouce&percage="+$(this).val(),
			async: true,
			success: function(html){
				$("#menu_6_select_diametre").html(html);
			}
		});
	});

	//Bind sur le select "marque/model"
	$("#menu_6_select_marque_model").change(function() {
		window.location = $("#menu_6_select_marque_model :selected").val();
	});

	//Bind sur le boutton "recherche"
	$("div[id^='tab6-']").each(function (i,el) {
		if(i!=0) $(el).css("display","none");
	});
	$("#btn-search_jantes").click(function(e) {
		e.preventDefault();
		$("div[id^='tab6-']").each(function (i,el) {
			if(i==0 && $(el).css("display")=="block") {
				marque	= $.trim($("#menu_6_select_marque :selected").text());
				var modele	= "";var percage = "";
				modeleDim = explode("|",$("#menu_6_select_modele :selected").val());
				percage = modele[0];
				modele  = $("#menu_6_select_modele :selected").text();
				diametre= $.trim($("#menu_6_select_diametre :selected").text());
				if(marque=='' || marque=='---' || modele=='' || modele=='---') {
					alert('Merci de renseigner tous les critères de recherche');
				} else {
					url = "/jantes/vehicule/";
					finish=false;
					if(!finish && marque && marque!='---') url += marque+'/';
					else finish=true;
					if(!finish && modele && modele!='---') {
						if((x=modele.indexOf(' ann'))!=-1) {
							modele=modele.substr(0,x);
						}
						url += modele.replace('/', '\\')+'/';
					} else finish=true;
					if(!finish && diametre) url += diametre.replace("''",'pouce');
					else finish=true;
					url=url.replace(' ','-');
					url=escape(url);
					window.location = url.toLowerCase();
				}
			}
		});
	});
}

function initLandingCompetitionCollection(linkToClassifications) {
    var xOffset = 10;
    var yOffset = 30;
    var menuSelectClassif = $('#menu_1_select_classification');
    menuSelectClassif.change(function(){
        var current = $(this);
        $("#menu_1_select_d1").val(linkToClassifications[current.val()][0]).change();
        $("#menu_1_select_d2").val(linkToClassifications[current.val()][1]).change();
        $("#menu_1_select_d3").val(linkToClassifications[current.val()][2]).change();
        $("#menu_1_select_d4").val("");
        $("#menu_1_select_d5").val("");
    });
    menuSelectClassif.trigger('change');

    //Tips
    $("a.screenshot").hover(function(e) {
        $("body").append("<p id='screenshot'>"+ this.rel +"</p>");
        $("#screenshot").css("top",(e.pageY - xOffset) + "px").css("left",(e.pageX + yOffset) + "px").fadeIn("fast");
    },function(){$("#screenshot").remove();});

    $("span.screenshot").hover(function(e) {
        $("body").append("<p id='screenshot'>"+ $(this).attr('rel') +"</p>");
        $("#screenshot").css("top",(e.pageY - xOffset - 40) + "px").css("left",(e.pageX + yOffset) + "px").fadeIn("fast");
    },function(){$("#screenshot").remove();});

    $(".pneu_home").hover(function(e) {
        $("body").append("<p id='screenshot'><img src='"+ $(this).attr('rel') +"'/></p>");
        $("#screenshot").css("top",(e.pageY - xOffset) + "px").css("left",(e.pageX + yOffset) + "px").fadeIn("fast");
    },function(){$("#screenshot").remove();});

    $("a.screenshot,.pneu_home").mousemove(function(e){$("#screenshot").css("top",(e.pageY - xOffset) + "px").css("left",(e.pageX + yOffset) + "px");});

    //sous menu à afficher
    $("#bloc_tc4").show();
    $("#tabset #oc_tc4").addClass("active");
}

function changeMenuFromClassification(classifVal) {
    if(classifVal == 4 || classifVal == 37 || classifVal == 0 || classifVal == undefined) {
        $("#menu_1_select_d4").attr('disabled', false);
        $("#menu_1_select_d5").attr('disabled', false);
    } else {
        $("#menu_1_select_d4").attr('disabled', true);
        $("#menu_1_select_d4").val('');
        $("#menu_1_select_d5").attr('disabled', true);
        $("#menu_1_select_d5").val('');
    }
}
