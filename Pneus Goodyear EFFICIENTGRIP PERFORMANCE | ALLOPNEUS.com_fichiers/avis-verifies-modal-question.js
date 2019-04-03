jQuery(function ($) {
    var modal = $('#myModalDownload');
    var $onSecure = (window.location.hostname == 'secure.allopneus.com');

    $(document).on('click', '.close-reveal-modal2', function() {
        modal.trigger('reveal:close');
    });

    $(document).on('click', '#js-avisVerifiesQuestion', function() {
        $('.reveal-modal-bg').remove();

        var $loader = null;
        var url = $(this).attr('data-url');

        if ($onSecure) {
            // close station popin before opening another one
            $('#myModal').trigger('reveal:close');

            $loader = $.fn.getLoader();
            modal.find('.modal-body').html($loader);
        } else {
            modal.find('.modal-body').html("<div class='modal-loader'></div>");
        }
        modal.find('.modal-body').css("height","300px");
        var $rgpd = "<p class='rgpd'>Les informations recueillies sur ce formulaire sont trait�es par Allopneus en qualit� de responsable de traitement pour lui permettre de traiter et publier votre question ou votre r�ponse. Les informations obligatoires sont identifi�es par un ast�risque. Vous disposez sur ces donn�es des droits pr�vus par la r�glementation. Plus d'informations : <a href='https://www.allopneus.com/politique-de-protection-des-donnees/' target='_blank'>la politique de gestion des donn�es</a>. </p>";
        modal.find('.modal-body').append('<iframe id="avisVerifiesModal"/>').append($rgpd);
        modal.find('iframe#avisVerifiesModal').attr({'src':url, 'width':'100%', 'height':'480px'});
        modal.find('iframe#avisVerifiesModal').css('border', '0px');
        modal.reveal();

        modal.find('iframe#avisVerifiesModal').load(function() {
            modal.find('.modal-loader').remove();
            modal.find('.modal-body').css("height","auto");
        });
    });

});