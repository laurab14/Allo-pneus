(function(global, $) {
    'use strict';

    /**
     * Internet Explorer 8 and below doesn't check hidden radio/checkbox <input>
     * when clicking on corresponding <label>. This polyfill emulates this behavior.
     *
     * @constructs
     */
    var LabelPolyfill = function() {
        if (this.isRequired()) {
            $(document).on('click', 'label[for]', onLabelClick);
        }
    };

    /**
     * Handles clicks on labels and, if the input is a hidden radio or checkbox:
     *  - checks the input
     *  - triggers a change event
     *  - triggers a click event
     *
     * @param {jQuery.Event} event A jQuery Event instance.
     */
    var onLabelClick = function(event) {
        var id        = $(this).attr('for');
        var $input    = $('input#'+id);
        var isVisible = $input.is(':visible') && $input.css('visibity') != 'hidden';

        if ($input.is(':checkbox, :radio') && !$input.is(':disabled') && $input.get(0) !== event.target && !isVisible) {
            event.preventDefault();

            // make sure that the input's value is actually changed when triggering the change event
            $input.one('change', function(event) {
                event.stopImmediatePropagation();

                setTimeout(function() {
                    $input.trigger('change');
                }, 0);
            });

            $input.trigger('click');
        }
    };

    /**
     * Returns whether the polyfill is required for the current context.
     *
     * @returns {boolean} true if the polyfill is required.
     */
    LabelPolyfill.prototype.isRequired = function() {
        var matches = /\bMSIE (\d)\.\d\b/.exec(window.navigator.userAgent);

        return null !== matches && matches[1] <= 8;
    };

    global.LabelPolyfill = LabelPolyfill;

})(window, jQuery);