jQuery(function($){
    var dimFilterForm = $("#modele-dim-filters form");
    var dSelect = [
        $("select[name='largeur']", dimFilterForm),
        $("select[name='hauteur']", dimFilterForm),
        $("select[name='jante']", dimFilterForm),
        $("select[name='charge']", dimFilterForm),
        $("select[name='vitesse']", dimFilterForm)
    ];
    var dSelectDesc = new Array(5);
    for (var i = 0; i < 5; ++i) {
        dSelectDesc[i] = $("option:first", dSelect[i]).text();
    }

    // init
    dSelect[0].empty()
              .append($("<option></option>").attr("value", "").text(dSelectDesc[0]))
              .val("");
    for (var dim in dims) {
        dSelect[0].append($("<option></option>").attr("value", dim).text(dim));
    }
    for (i = 1; i < 5; ++i) {
        dSelect[i].val("").attr("disabled", "disabled");
    }

    // change action
    function updateSelects(i) {
        if (dSelect[i].val() == "") {
            dSelect[i+1].val("").attr("disabled", "disabled");
        } else {
            dSelect[i+1].removeAttr("disabled")
                        .empty()
                        .append($("<option></option>").attr("value", "").text(dSelectDesc[i+1]))
                        .val("");
            var dimsEval = "dims";
            for (var j = 0; j <= i; ++j) {
                dimsEval += "[dSelect["+j+"].val()]";
            }
            for (var dim in eval(dimsEval)) {
                dSelect[i+1].append($("<option></option>").attr("value", dim).text(dim));
            }
        }
        for (var k = i+2; k < 5; ++k) {
            dSelect[k].val("").attr("disabled", "disabled");
        }
    }

    dSelect[0].change(function(){
        updateSelects(0);
        filterModels();
    });

    // d2 change
    dSelect[1].change(function(){
        updateSelects(1);
        filterModels();
    });

    // d3 change
    dSelect[2].change(function(){
        updateSelects(2);
        filterModels();
    });

    // d4 change
    dSelect[3].change(function(){
        updateSelects(3);
        filterModels();
    });

    // d5 change
    dSelect[4].change(function(){
        filterModels();
    });

    // filter rows
    function filterModels()
    {
        var search = dSelect[0].val();

        if (search == "") {
            $("#result_pack_commercial tbody tr").show();
            return;
        }

        for (var i = 1; i < 5; ++i) {
            var dim;
            if (!(dim = dSelect[i].val())) {
                break;
            }
            search += "-"+dim;
        }

        $("#result_pack_commercial tbody tr").each(function(){
            var dim = $(this).attr("data-dim");
            if(dim != undefined) {
                if (dim.substr(0, search.length) == search) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            }
        });

//        var visibles = $("#modele-dim-list tr.lineStd:visible");
//        if (visibles.length == 1) {
//            window.location.href = $(".tdAcheter a:first", visibles).attr("href");
//        }
    }
});
