;(function ($) {
    /*
     Options:
     - closeSelector
     - alertCookieSelector
     */
    window.HeveaCookieLaw = function (options) {
        var settings = {
            alloCookie: {
                cookieKey: 'allopneus_accept_cookie_policy',
                cookieExpires: 60,
                path: '/',
                domain: '.allopneus.com'
            },
            cookieWarningDisplayed: {
                cookieKey: 'allopneus_cookie_warning_displayed',
                cookieExpires: 60,
                path: '/',
                domain: '.allopneus.com'
            },
            cookieAlertSelector: null,
            closeSelector: null
        };
        $.extend(settings, options);
        var cookiePrivacyValue = Cookies.get(settings.alloCookie.cookieKey);
        var cookieDisplayValue = Cookies.get(settings.cookieWarningDisplayed.cookieKey);

        if(!cookiePrivacyValue){
            if (cookieDisplayValue) {
                Cookies.set(settings.alloCookie.cookieKey, 1, {domain: settings.alloCookie.domain, expires: settings.alloCookie.cookieExpires, path: settings.alloCookie.path});
                Cookies.set(settings.cookieWarningDisplayed.cookieKey, null, {path: settings.cookieWarningDisplayed.path});
                $(settings.cookieAlertSelector).remove();
            } else {
                Cookies.set(settings.cookieWarningDisplayed.cookieKey, 1, {domain: settings.cookieWarningDisplayed.domain, expires: settings.cookieWarningDisplayed.cookieExpires, path: settings.cookieWarningDisplayed.path});
            }
        } else {
            $(settings.cookieAlertSelector).remove();
        }

        $(settings.closeSelector).on('click', function () {
            $(settings.cookieAlertSelector).remove();
        });
    };
}(jQuery));
