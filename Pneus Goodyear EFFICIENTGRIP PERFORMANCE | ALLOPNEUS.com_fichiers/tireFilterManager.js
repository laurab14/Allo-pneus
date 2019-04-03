var tireFilterManager = {
    optionAllEnabled: false,
    sortNumber: function(one, two) {
        if(one == 'R') {
            one = -1;
        }
        if(one == '') {
            one = -2;
        }
        one = parseFloat(one);
        if(two == 'R') {
            two = -1;
        }
        if(two == '') {
            two = -2;
        }
        return(one-two);
    },
    defaultDims:
    {
        4:{ // Dimensions par defaut agricole
            0:{0:'16.9', 1:'R', 2:'34'}, // Tous
           22:{0:'12.4', 1:'R', 2:'28'}, // Roue motrice
           23:{0:'12.5', 1:'80', 2:'18'}, // Industriel et manutention
           24:{0:'10.0', 1:'75', 2:'15.3'}, // Remorque agricole
           25:{0:'11.5', 1:'80', 2:'15.3'}, // Roue complète
           26:{0:'5.50', 1:'80', 2:'15.3'}, // Avant tracteur
           27:{0:'16', 1:'6.50', 2:'8'}, // Espace vert
           36:{0:'16.9', 1:'R', 2:'30'}, // Forestier
           43:{0:'6.00', 1:'R', 2:'9'}, // Pneu Plein
           48:{0:'20.5', 1:'R', 2:'25'} // Genie civil
        },
        2:{ // Dimensions par defaut quad
            0:{0:'20', 1:'11', 2:'9'}, // Tous
            7:{0:'25', 1:'8', 2:'12'}, // Utilitaire tout chemin
            6:{0:'20', 1:'11', 2:'9'}, // Sportif - compétition
            9:{0:'25', 1:'10', 2:'12'}, // Routier - homologué
            8:{0:'19', 1:'7', 2:'8'} // Loisir - piste
        },
        3:{ // Dimensions par defaut moto
            0:{0:'180', 1:'55', 2:'17', 3:'73', 4:''}, // Tous
           13:{0:'120', 1:'70', 2:'17', 3:'', 4:''}, // Routière
           18:{0:'130', 1:'70', 2:'12', 3:'', 4:''}, // Scooter
           16:{0:'130', 1:'90', 2:'16', 3:'', 4:''}, // Custom
           17:{0:'90', 1:'90', 2:'21', 3:'', 4:''}, // Trail
           35:{0:'120', 1:'70', 2:'17', 3:'', 4:''}, // Compétition route
           19:{0:'120', 1:'70', 2:'17', 3:'', 4:''}, // Compétition circuit
           14:{0:'80', 1:'100', 2:'21', 3:'', 4:''}, // Cross trial
           15:{0:'140', 1:'80', 2:'18', 3:'', 4:''}, // Enduro
           20:{0:'250', 1:'R', 2:'10', 3:'', 4:''} // Dirt
        },
        66:{ // Dimensions par defaut PACK moto
            0:{0:'180', 1:'55', 2:'17', 3:'73', 4:''}, // Tous
            13:{0:'120', 1:'70', 2:'17', 3:'', 4:''}, // Routière
            18:{0:'130', 1:'70', 2:'12', 3:'', 4:''}, // Scooter
            16:{0:'130', 1:'90', 2:'16', 3:'', 4:''}, // Custom
            17:{0:'90', 1:'90', 2:'21', 3:'', 4:''}, // Trail
            35:{0:'120', 1:'70', 2:'17', 3:'', 4:''}, // Compétition route
            19:{0:'120', 1:'70', 2:'17', 3:'', 4:''}, // Compétition circuit
            14:{0:'80', 1:'100', 2:'21', 3:'', 4:''}, // Cross trial
            15:{0:'140', 1:'80', 2:'18', 3:'', 4:''}, // Enduro
            20:{0:'250', 1:'R', 2:'10', 3:'', 4:''} // Dirt
        },
        5:{
            // Dimensions par defaut PL
            0:{0:'315', 1:'80', 2:'22.5'}, // Tous
           55:{0:'315', 1:'80', 2:'22.5'}, // Régional
           56:{0:'315', 1:'80', 2:'22.5'}, // Chantier
           57:{0:'315', 1:'80', 2:'22.5'}, // Longue distance
           58:{0:'295', 1:'80', 2:'22.5'}, // Autocar / autobus
           59:{0:'315', 1:'80', 2:'22.5'}, // Hiver
        },
        1:{
            // Dimensions par defaut tourisme
            0:{0:'205', 1:'55', 2:'16', 3:'91', 4: 'V'}, // Tous
            3:{0:'205', 1:'55', 2:'16', 3:'91', 4: 'V'}, // Tourisme été
            4:{0:'205', 1:'55', 2:'16', 3:'91', 4: 'H'}, // Tourisme hiver
            1:{0:'215', 1:'65', 2:'16', 3:'98', 4: 'H'}, // 4x4 été
            2:{0:'215', 1:'65', 2:'16', 3:'98', 4: 'H'}, // 4x4 hiver
            5:{0:'195', 1:'70', 2:'15', 3:'104',4: 'R'}, // Camionnette été
            12:{0:'195', 1:'70', 2:'15', 3:'104',4: 'R'}, // Camionnette hiver
            10:{0:'125', 1:'R', 2:'15', 3:'68',4: 'R'}, // Collection
            11:{0:'195', 1:'50', 2:'15', 3:'82',4: 'V'}, // Compétition
            21:{0:'145', 1:'80', 2:'10', 3:'74',4:'N'} // Remorque
        }
    },
    init: function(activity, jqType, jqD1, jqD2, jqD3, jqD4, jqD5, byRange, defaults, jqSeasonWinter, jqBrand) {
        if(byRange==undefined) {
            byRange = true;
        }
        jqType.change(function(){
            // Fix temporaire pour load des marques ------------------------
            var prevBrandId = jqBrand.val();
            var assocActivity = { 3  : 'pneu', 1 : '4x4', 5  : 'camionnette', //été
                                  4  : 'pneu', 2 : '4x4', 12 : 'camionnette', // hiver
                                  11 : 'competition', 10 : 'collection',
                                  21 : 'remorque',
                                  13 : 'routiere',
                                  14 : 'cross',
                                  15 : 'enduro',
                                  16 : 'custom',
                                  17 : 'trail',
                                  18 : 'scooter',
                                  19 : 'competition-moto',
                                  35 : 'competition-route',
                                  20 : 'dirt',
                                  6  : 'sportif',
                                  7  : 'utilitaire',
                                  8  : 'loisir',
                                  9  : 'routier',
                                  22 : 'motrice',
                                  23 : 'industriel',
                                  24 : 'implement',
                                  25 : 'complete',
                                  36 : 'forestier',
                                  26 : 'tracteur',
                                  27 : 'vert',
                                  66 : 'moto-pack'
                                  };

            var type = jqType.val();

            if (5 == activity) {
                type = 0;
            }

            var longSeason = (jqSeasonWinter != undefined && jqSeasonWinter.attr('checked')) ? 'hiver' : 'ete';

            if(assocActivity[type] != undefined) {
                loadMarques(assocActivity[type], longSeason);
            } else {
                if(type == 0) {
                    switch(activity) {
                        case 1:
                            loadMarques('pneu', longSeason);
                            break;
                        case 3:
                            loadMarques('moto', longSeason);
                            break;
                        case 2:
                            loadMarques('quad', longSeason);
                            break;
                        case 4:
                            loadMarques('agri', longSeason);
                            break;
                        case 5:
                            loadMarques('pl', longSeason);
                            break;
                    }
                }
            }

            if(prevBrandId != '') {
                if(tireFilterManager.isValueInSelect(jqBrand.attr('id'), prevBrandId)) {
                    jqBrand.val(prevBrandId);
                } else {
                    jqBrand.val('');
                }
            }

            // -------------------------------------------------------------

            // Redirections page agri
            if(activity == 4 && $(this).val() == '28') {
                window.location = "/pneu-agricole/accessoires/36-chambres-a-air";
            }

            //Redirections TC4
            if(activity == 1 && $(this).val() == 'moto') {
                window.location = "/pneu-moto/";
            }
            if(activity == 1 && $(this).val() == 'quad') {
                window.location = "/pneu-quad/";
            }
            if(activity == 1 && $(this).val() == 'agri') {
                window.location = "/pneu-agricole/";
            }
            if(activity == 1 && $(this).val() == 'pl') {
                window.location = "/pneu-poids-lourds/";
            }
            if(activity == 1 && $(this).val() == 'vert') {
                window.location = "/find?activite=4&type=27&marque=&d1=16&d2=6.50&d3=8&d4=&d5=&variante=&p1=&p2=";
            }
            if(byRange) {
                defaults = undefined;
                tireFilterManager.initD1(activity, jqType, jqD1, byRange, defaults, jqSeasonWinter);
            }
        });

        jqD1.change(function(){
            var defaultValues = tireFilterManager.getDefaultValues(defaults, activity, jqType, byRange);
            var dims2 = [];
            var dims = tireFilterManager.getDims(activity, jqType, byRange, jqSeasonWinter);
            if ($(this).val() != '') {
                dims2 = tireFilterManager.getSortedArray(dims[$(this).val()]);
            }

            if(jqD5 != undefined) {
                jqD5.find('option').eq(0).attr("selected","selected");
            }

            tireFilterManager.populateSelectFromArray(jqD2, dims2);
            jqD2.find('option').eq(0).attr("selected","selected");
            if(jQuery.trim($(this).val()) == jQuery.trim(defaultValues[0])) {
                jqD2.find('option').each(function(){
                    var def1 = defaultValues[1]==''?'R':defaultValues[1];
                    if(jQuery.trim($(this).val()) == jQuery.trim(def1)) {
                        $(this).attr("selected","selected");
                    }
                });
            }
            jqD2.trigger('change');
        });

        jqD2.change(function(){
            var dims3 = [];
            var defaultValues = tireFilterManager.getDefaultValues(defaults, activity, jqType, byRange);
            var dims = tireFilterManager.getDims(activity, jqType, byRange, jqSeasonWinter);
            if ($(this).val() != '') {
                dims3 = tireFilterManager.getSortedArray(dims[jqD1.val()][$(this).val()]);
            }
            tireFilterManager.populateSelectFromArray(jqD3, dims3);

            var def1 = defaultValues[1]==''?'R':defaultValues[1];
            if(jQuery.trim($(this).val()) == jQuery.trim(def1)) {
                jqD3.find('option').each(function(){
                    if(jQuery.trim($(this).val()) == jQuery.trim(defaultValues[2])) {
                        $(this).attr("selected","selected");
                    }
                });
                if(jqD4 != undefined) {
                    jqD3.trigger('change');
                }
            } else {
                jqD3.find('option').eq(0).attr("selected","selected");
                if(jqD4 != undefined) {
                    jqD3.trigger('change');
                }
            }
        });

        if (jqD4 != undefined) {
            jqD3.change(function () {
                var defaultValues = tireFilterManager.getDefaultValues(defaults, activity, jqType, byRange);
                var dims = tireFilterManager.getDims(activity, jqType, byRange, jqSeasonWinter);
                var dims4 = [];
                if ($(this).val() != '') {
                    if (dims[jqD1.val()][jqD2.val()][$(this).val()][''] == undefined) {
                        dims[jqD1.val()][jqD2.val()][$(this).val()][''] = 1;
                    }
                    dims4 = tireFilterManager.getSortedArray(dims[jqD1.val()][jqD2.val()][$(this).val()]);
                }
                tireFilterManager.populateSelectFromArray(jqD4, dims4);
                if (jQuery.trim($(this).val()) == jQuery.trim(defaultValues[2])) {
                    jqD4.find('option').each(function () {
                        if (jQuery.trim($(this).val()) == jQuery.trim(defaultValues[3])) {
                            $(this).attr("selected", "selected");
                            jqD4.trigger('change');
                        }
                    });
                } else {
                    jqD4.find('option').eq(0).attr("selected", "selected");
                    jqD4.trigger('change');
                }
            });
        }

        if (jqD5 != undefined) {
            jqD4.change(function () {
                var defaultValues = tireFilterManager.getDefaultValues(defaults, activity, jqType, byRange);
                if (jQuery.trim($(this).val()) == jQuery.trim(defaultValues[3])) {
                    jqD5.find('option').each(function () {
                        if (jQuery.trim($(this).val()) == jQuery.trim(defaultValues[4])) {
                            $(this).attr("selected", "selected");
                        }
                    });
                } else {
                    jqD5.find('option').eq(0).attr("selected", "selected");
                }
            });
        }
        var defaultValues = tireFilterManager.getDefaultValues(defaults, activity, jqType, byRange);
        if(byRange) {
            jqType.trigger('change');
        } else {
            tireFilterManager.initD1(activity, jqType, jqD1, byRange, defaults, jqSeasonWinter);
        }

        var def1 = defaultValues[1]==''?'R':defaultValues[1];
        jqD1.val(defaultValues[0]).trigger('change');
        jqD2.val(def1).trigger('change');
        jqD3.val(defaultValues[2]);
        if(jqD4 != undefined) {
            jqD3.trigger('change');
            jqD4.val(defaultValues[3]);
        }
        if(jqD5 != undefined) {
            jqD5.val(defaultValues[4]);
        }
    },
    initD1: function(activity, jqType, jqD1, byRange, defaults, jqSeasonWinter){
        var defaultValues = tireFilterManager.getDefaultValues(defaults, activity, jqType, byRange);
        var dims = tireFilterManager.getDims(activity, jqType, byRange, jqSeasonWinter);
        var dims1 = tireFilterManager.getSortedArray(dims);
        tireFilterManager.populateSelectFromArray(jqD1, dims1);
        jqD1.find('option').eq(0).attr("selected","selected");
        jqD1.find('option').each(function(){
            if(jQuery.trim($(this).val()) == jQuery.trim(defaultValues[0])) {
                $(this).attr("selected","selected");
            }
        });
        jqD1.trigger('change');
    },
    populateSelectFromArray: function (jqSelect, array) {
        var html = '';
        if (tireFilterManager.optionAllEnabled == true) {
            html = '<option value="">Tous</option>';
        }

        for (var i in array) {
            var val = array[i];
            var txt = array[i];
            if (array[i] == '') {
                txt = 'Tous';
                if (tireFilterManager.optionAllEnabled == true) {
                    continue;
                }
            }
            html += '<option value="' + val + '">' + txt + '</option>';
        }
        jqSelect.html(html);
    },
    getSortedArray: function(array) {
        var dims = new Array();
        for(var i in array) {
            dims.push(i);
        }
        dims.sort(tireFilterManager.sortNumber);
        return dims;
    },
    getDims: function(activity, jqType, byRange, jqSeasonWinter) {
        var range = tireFilterManager.getRange(jqType, byRange);
        var txtRange = range;
        if(jqSeasonWinter != undefined && jqSeasonWinter.attr('checked') && activity == 1 && range == 0) {
            txtRange += 'h';
        }
        var varName = 'tireFilters_' + activity + '_' + txtRange;
        return eval(varName);
    },
    getRange: function(jqType, byRange) {
        return jqType.val()==''||jqType.val()==undefined||!byRange?'0':jqType.val();
    },
    getDefaultValues: function(defaults, activity, jqType, byRange) {
        var range = tireFilterManager.getRange(jqType, byRange);
        var defaultValues = new Array();

        if(defaults != undefined) {
           defaultValues = defaults;
        } else {
            defaultValues = tireFilterManager.defaultDims[activity][range];
        }
        return defaultValues;
    },
    isValueInSelect: function(stringSelect, value) {
        var returnValue = false;
        $("#" + stringSelect + " option").each(function(){
            if(jQuery.trim($(this).attr('value')) == jQuery.trim(value)) {
                returnValue = true;
                return false;
            }
        });
        return returnValue;
    },
    getDimensionsText: function(arrayDimensions, season, indice) {
        if(indice == undefined) {
            indice = false;
        }

        var hauteur = arrayDimensions[1]=='R'?'':arrayDimensions[1];
        if(indice) {
            return "L'indice de charge : <b>" + arrayDimensions[3] + "</b> n'existe pas en pneus " + season +"."
        } else {
            return "La dimension : <b>" + arrayDimensions[0] + "/" + hauteur + "R" + arrayDimensions[2] + "</b> n'est pas disponible en pneus " + season + ".";
        }
    }
};
