var Allopneus = Allopneus || {};

(function () {
    var GeoSearch = {

        $form: null,
        desktopBaseUrl: '',
        searchScope: '',
        noResultLabelFinal: '',
        geoSearchSelected: false,
        firstElement: null,

        init: function (formClass, desktopBaseUrl, searchScope, noResultLabel) {
            GeoSearch.$form = $('.' + formClass);
            GeoSearch.desktopBaseUrl = desktopBaseUrl;
            GeoSearch.searchScope = searchScope;
            GeoSearch.bindGeoSearchFormSubmit();
            GeoSearch.bindGeolocationSearch();
            GeoSearch.initAutocomplete();
            GeoSearch.noResultLabelFinal = noResultLabel;
        },

        resetLocality: function () {
            GeoSearch.$form.find('#geo-search-locality').val('');
            GeoSearch.$form.find('#geo-search-locality').css('box-shadow', 'none');
            GeoSearch.$form.find('#geo-search-locality').attr('placeholder', GeoSearch.$form.find('#geo-search-query').val());
        },

        handleGeoSearchSelect: function (item) {
            if (null == item.postalCode) {
                return false;
            }

            GeoSearch.$form.find('#geo-search-query').val(item.city+' '+item.postalCode);
            GeoSearch.$form.find('#geo-search-zipcode').val(item.postalCode);
            GeoSearch.$form.find('#geo-search-city').val(item.city);

            // If no coordinates found search it
            if (null == item.latitude) {
                GeoSearch.$form.find('#geo-search-query').val(item.label+' '+item.city+' '+item.postalCode);

                $.ajax({
                    url: GeoSearch.desktopBaseUrl + '/common/geo/coordinates',
                    data: {
                        address: item.address,
                        postal_code: item.postalCode,
                        city: item.city,
                        country_code: item.countryCode,
                        metadata: item.metaData
                    }
                })
                    .done(function (result) {
                        GeoSearch.processGeoSearchSelect(result.latitude, result.longitude);
                    })
                ;
            } else {
                GeoSearch.processGeoSearchSelect(item.latitude, item.longitude);
            }

            return true;
        },

        processGeoSearchSelect: function (latitude, longitude) {
            GeoSearch.$form.find('.input-latitude').val(latitude);
            GeoSearch.$form.find('.input-longitude').val(longitude);
            GeoSearch.resetLocality();
            GeoSearch.$form.submit();
        },

        bindGeoSearchFormSubmit: function () {
            GeoSearch.$form.submit(function (event) {
                event.preventDefault();

                GeoSearch.handleGeoSearchFormSubmit();
            });
        },

        handleGeoSearchFormSubmit: function () {
            // Handle the form submit with no select in the completion
            if (false === GeoSearch.geoSearchSelected) {
                if (null == GeoSearch.firstElement) {
                    return false;
                }
                //simulate the select of first element
                GeoSearch.geoSearchSelected = true;

                return GeoSearch.handleGeoSearchSelect(GeoSearch.firstElement);
            }

            // Call the form action if exists
            var formAction = GeoSearch.$form.attr('action');
            if (formAction) {
                window.location.href = formAction + '?' + GeoSearch.$form.serialize();

                return true;
            }

            var geoSearchCallback = GeoSearch.$form.data('callback');
            // Call the callback function if exists after search
            if (geoSearchCallback) {
                GeoSearch.handleCallback(geoSearchCallback);
            }

            return true;
        },

        bindGeolocationSearch: function () {
            $('#geo-search-geoloc').click(function (event) {
                event.preventDefault();

                if (!('geolocation' in navigator)) {
                    alert('Impossible de localiser votre appareil.');

                    return;
                }

                var $icon = $('.icon-geo'),
                    $this = $(this),
                    $loader = $('.loader-geo');

                if (!$loader.length) {
                    $loader = $('<span class="loader-geo"></span>');
                    $loader.appendTo($this);
                }
                $icon.hide();

                var success = function (position) {
                    GeoSearch.$form.find('#geo-search-query').val('Ma position');
                    GeoSearch.$form.find('#geo-search-zipcode').val('');
                    GeoSearch.$form.find('#geo-search-city').val('');
                    GeoSearch.resetLocality();
                    var coordinates = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    };

                    // Try to redirect if data-redirect-url exists
                    var geolocationSearchRedirectUrl = $this.data('redirect-url');

                    if (geolocationSearchRedirectUrl) {
                        window.location.href = geolocationSearchRedirectUrl + '?' + $.param(coordinates);

                        return true;
                    }

                    GeoSearch.$form.find('.input-latitude').val(coordinates.latitude);
                    GeoSearch.$form.find('.input-longitude').val(coordinates.longitude);

                    var geolocationSearchCallback = $this.data('callback');

                    // Call the callback function if exists
                    if (geolocationSearchCallback) {
                        GeoSearch.handleCallback(geolocationSearchCallback);
                    }

                    clearTimeout(timeoutId);
                    clearLoader();
                };

                var timeout = 20000,
                    options = {
                        enableHighAccuracy: true,
                        timeout: timeout,
                        maximumAge: 300000
                    };

                var error = function (positionError) {
                    clearTimeout(timeoutId);
                    clearLoader();

                    if (positionError && positionError.code == 1) { // PositionError.PERMISSION_DENIED
                        alert("Vous devez autoriser la localisation de votre appareil.");
                    } else {
                        alert("Impossible de localiser votre appareil.");
                    }
                };

                var clearLoader = function () {
                    $loader.remove();
                    $icon.show();
                };

                // getCurrentPosition may not time out if authorization is not answered by user
                var timeoutId = setTimeout(clearLoader, timeout + 5000);

                navigator.geolocation.getCurrentPosition(success, error, options);
            });
        },

        initAutocomplete: function () {
            var autocompleteInstance = GeoSearch.$form.find('#geo-search-locality').autocomplete({
                source: function (request, response) {
                    $.ajax({
                        url: GeoSearch.desktopBaseUrl + '/common/geo/addresses',
                        data: {
                            query: request.term,
                            scope: GeoSearch.searchScope
                        },
                        dataType: 'json'
                    })
                        .done(function (data) {
                            if (!data.length) {
                                var result = [
                                    {
                                        label: GeoSearch.noResultLabelFinal,
                                        labelComplementary: '',
                                        postalCode: null
                                    }
                                ];
                                response(result);
                            } else {
                                response(data);
                            }
                        })
                        .fail(function () {
                            response([]);
                        })
                    ;
                },
                autoFocus: true,
                minLength: 2,
                select: function (event, ui) {
                    GeoSearch.geoSearchSelected = true;
                    GeoSearch.handleGeoSearchSelect(ui.item, true);
                }
            }).autocomplete("instance");

            autocompleteInstance._renderItem = function (ul, item) {
                var regEx = new RegExp(item.query, "ig");
                var resultMatch = item.label.match(regEx);
                var highlightString = item.query;
                if (null != resultMatch) {
                    highlightString = resultMatch[0];
                }

                return $("<li>")
                    .append("<div class='autocomplete_row' data-item='"+ item +"'>" + item.label.replace(regEx, '<b>' + highlightString + '</b>') + " <span>" + item.labelComplementary + "</span></div>")
                    .appendTo(ul);
            };

            autocompleteInstance._renderMenu = function (ul, items) {
                var that = this;
                $.each(items, function (index, item) {
                    if (0 == index) {
                        GeoSearch.firstElement = item;
                    }
                    that._renderItemData(ul, item);
                });
            };
        },

        handleCallback: function(callbackPath, callbackParams) {
            if (callbackPath) {
                var scopes = callbackPath.split('.');
                var callback = window;
                var method = scopes[scopes.length - 1];
                for (var i = 0; i < scopes.length - 1; i++) {
                    callback = callback[scopes[i]];
                }
                if (typeof(callback[method]) == 'function') {
                    if (callbackParams) {
                        callback[method].apply(callback[method], callbackParams);
                    } else {
                        callback[method]();
                    }
                }
            }
        }
    };

    Allopneus.Common = Allopneus.Common || {};
    Allopneus.Common.GeoSearch = GeoSearch;
})(Allopneus, $);
