var Allopneus = {
    ui: {
        async: {},
        components: {}
    },
    datalayer: {
        additionalData: {}
    },
    urls: {
        secureBaseUrl: 'https://secure.allopneus.com'
    }
};

Allopneus.ui.async.loadHeaders = function () {
    $('[data-async-loading-zone]').each(function () {
        var currentElement = $(this);
        // Zone du header à charger
        var zone = currentElement.data('async-loading-zone');
        // Contexte sur lequel on fait les appels ajax
        var context = currentElement.data('async-loading-context');
        Allopneus.ui.async.loadHeader(currentElement, zone, context);
    });
};

Allopneus.ui.async.loadHeader = function (currentElement, zone, context) {
    var url = Allopneus.urls.secureBaseUrl + '/async/header/' + context + '/' + zone;
    console.log('Requesting async headers on ' + url);

    $.ajax({
        type: 'GET',
        url: url,
        xhrFields: {
            withCredentials: true
        },
        success: function (htmlData) {
            currentElement.html(htmlData);
            Allopneus.ui.async.callbackDispatcher(currentElement);
            $('.async-header-loader').hide();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('Error in request for '+zone+' header.');
        }
    });
};

Allopneus.ui.async.bindFbEvent = function () {
    var fbConnectButton = $('#connectFB');
    // Facebook connect script
    var fbInitScript = fbConnectButton.data('fb-init-script');
    // Si les scripts sont chargés
    // check if in private browsing mode or not
    // if yes -> use js sdk
    // else   -> uses php sdk
    $.when(
        $.getScript(fbInitScript),
        $.getScript("//connect.facebook.net/fr_FR/sdk.js")
    ).done(function(){
        var fb_header = new FbConnect({ appId : fbConnectButton.data('fb-app-id')});
        fbConnectButton.unbind("click");
        fbConnectButton.click(function(){
            fb_header.fbEnsureInit(fb_header.allopneusConnect);
        });
    })
     .fail(function(jqxhr, settings, exception ) {
        if(fbConnectButton.data('fb-login-url')) {
            fbConnectButton.click(function () {
                window.open(fbConnectButton.data('fb-login-url'), "fbLoginPopup", "width=600, height=600, scrollbars=yes");
            });
        }
    });
};

Allopneus.ui.async.pushGeneralDataLayer = function(datalayerDiv) {
    var additionalData = Allopneus.datalayer.additionalData;
    var url = Allopneus.urls.secureBaseUrl + '/async/header/datalayer/'+datalayerDiv.data('header-callback-context');
    console.log('Pushing datalayer on ' + url);

    $.ajax({
        type: 'POST',
        url: url,
        data: additionalData,
        xhrFields: {
            withCredentials: true
        },
        success: function (dataLayerContent) {
            dataLayer.push(dataLayerContent);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('textStatus : ' + textStatus + ' | errorThrown : ' + errorThrown);
        }
    });
};

Allopneus.ui.async.callbackDispatcher = function (zoneElement) {
    zoneElement.find('[data-header-callback-action]').each(function(){
        var currentElement = $(this);
        switch (currentElement.data('header-callback-action')) {
            case 'facebook' :
                Allopneus.ui.async.bindFbEvent();
                break;
            case 'generalDatalayer' :
                Allopneus.ui.async.pushGeneralDataLayer(currentElement);
                break;
        }
    });
};
