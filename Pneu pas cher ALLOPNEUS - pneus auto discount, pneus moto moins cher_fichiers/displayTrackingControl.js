(function ($) {
    var DisplayTrackingControl = {
        start: function (contentUrl) {
            $.ajax({
                type: "GET",
                url: contentUrl,
                xhrFields: {
                    withCredentials: true
                }
            }).done(function (content) {
                if (content) {
                    var $trackingControl = $('#tracking-control');
                    $trackingControl.html(content);

                    var $trackingControlClose = $('#tracking-control-close');
                    var orderId = $trackingControlClose.data('order-id');

                    var cookieSettings = {
                        cookieKey: "allopneus_hide_dup_tracking_control",
                        cookieExpires: 7,
                        path: "/",
                        domain: ".allopneus.com"
                    };

                    var encodedCookieValues = Cookies.get(cookieSettings.cookieKey);
                    var cookieValues = JSON.parse(encodedCookieValues ? encodedCookieValues : '[]');

                    if (Array.isArray(cookieValues) && cookieValues.length > 0 && cookieValues.indexOf(orderId) !== -1) {
                        // hide the tracking control
                        $trackingControl.hide();
                    } else {
                        // bind close event
                        $trackingControlClose.on('click', function () {
                            // set cookie to remember that this order should not be displayed again
                            if (!Array.isArray(cookieValues)) {
                                cookieValues = [];
                            }
                            cookieValues.push(orderId);
                            Cookies.set(cookieSettings.cookieKey, JSON.stringify(cookieValues), {domain: cookieSettings.domain, expires: cookieSettings.cookieExpires, path: cookieSettings.path});

                            $trackingControl.hide();
                        });
                    }

                    if ($('#ariane_vehicule').length) {
                        $('#tracking-control').css('margin-top', '30px');
                    }
                }
            }).fail(function () {
                console.error('Error while getting tracking control');
            });
        }
    };

    window.Allopneus = window.Allopneus || {};
    window.Allopneus.displayTrackingControl = DisplayTrackingControl;
}(jQuery));
