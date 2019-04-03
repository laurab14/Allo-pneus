/*global jQuery:false, window:false, document:false */
/*!
 * jQuery plugin for dynamic replacement of spans by clickable links
 */
;(function ( $, window, document, undefined ) {

    $.fn.obfq = function ( options ) {

        options = $.extend( {}, $.fn.obfq.options, options );

        return this.each(function () {

            var elem = $(this);
            elem.click( function () {
                
                var target = $(elem.attr(options.targetAttr));
                if ( $.isFunction( target.first ) ) {

                    target = target.first();
                }
                var targetUrl = target.attr(options.targetUrlAttr);

                if( undefined !== targetUrl ) {
                    gaLinking.push(target, targetUrl);
                }
            });

        });
    };
    $.fn.obfq.options = {
        targetAttr: "data-obfq",
        targetUrlAttr: "href"
    };

})( jQuery, window, document );