var gaLinking = {
    push: function(jqObj, href){
        var classTr = jqObj.closest('tr').attr('class');
        var classTable = jqObj.closest('table').attr('class');
        var isWinter = $('#bloc_hiver').length==0?false:true;
        var tyreInfos = jqObj.attr('rel');

        var niveau1 = '';
        var niveau2 = '';

        var niveau2Tag = jqObj.closest('tr').data('clic-tag');

        if(isWinter) {
            niveau1 = 'Macaron Top hiver listing hiver';
            switch (classTr) {
                case 'choix_premium':
                    niveau2 = 'Clic Premium';
                    break;
                case 'choix_quality':
                    niveau2 = 'Clic Quality';
                    break;
                case 'choix_budget':
                    niveau2 = 'Clic Budget';
                    break;
            }
            if (undefined != niveau2Tag && '' != niveau2Tag) {
                niveau2 = niveau2Tag;
            }
        } else {
            switch(classTr)
            {
                case 'choix_top_quad':
                    niveau1 = 'Macaron listing quad';
                    niveau2 = 'Clic quad';
                    break;
                case 'choix_top_moto':
                    niveau1 = 'Macaron listing moto';
                    niveau2 = 'Clic moto';
                    break;
                case 'choix_premium':
                    if($.trim(classTable) == 'top3') {
                        niveau1 = 'Macaron Top été listing été';
                    } else {
                        niveau1 = 'Macaron Top hiver listing été';
                    }
                    niveau2 = 'Clic Premium';
                    break;
                case 'choix_quality':
                    if($.trim(classTable) == 'top3') {
                        niveau1 = 'Macaron Top été listing été';
                    } else {
                        niveau1 = 'Macaron Top hiver listing été';
                    }
                    niveau2 = 'Clic Quality';
                    break;
                case 'choix_budget':
                    if($.trim(classTable) == 'top3') {
                        niveau1 = 'Macaron Top été listing été';
                    } else {
                        niveau1 = 'Macaron Top hiver listing été';
                    }
                    niveau2 = 'Clic Budget';
                    break;
                case 'choix_top_vente':
                    niveau1 = 'Macaron fiche produit';
                    niveau2 = 'Clic Top vente';
                    break;
                case 'choix_top_selection':
                    niveau1 = 'Macaron fiche produit';
                    niveau2 = 'Clic Notre sélection';
                    break;
            }
            if (undefined != niveau2Tag && '' != niveau2Tag) {
                niveau2 = niveau2Tag;
            }
        }
        _gaq.push(['_trackEvent', niveau1, niveau2, tyreInfos, , true]);
        setTimeout('document.location = "' + href + '"', 150);
    }
};