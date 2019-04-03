
$(document).ready(function(){
    /**
     * On change action on brand selector.
     * Reloads search area and add the range selector.
     */
    $(document).on("change","#brandSelect",function(e)
    {
        e.stopImmediatePropagation();
        var parent = $(this).closest('.vehicle-forms');

        $("div.menu_search_vehicle_overlay").toggle();

        var brandId    = $(this).val();
        if ('' != brandId && typeof brandId !== 'undefined') {
            $.ajax({
                type: "POST",
                url: renderSearchForm,
                data: "brandId=" + brandId,
                async: false,
                success: function(content){
                    $("div.menu_search_vehicle_overlay").toggle();
                    $(parent).html(content);
                }
            });
        }

    });

    /**
     * On change action on range selector.
     * Reloads search area and add the model selector.
     */
    $(document).on("change","#rangeSelect",function(e)
    {
        e.stopImmediatePropagation();
        var parent = $(this).closest('.vehicle-forms');

        $("div.menu_search_vehicle_overlay").toggle();

        var rangeId    = $(this).val();
        var brandId    = $(parent).find('#brandSelect').val();

        if ('' != rangeId && '' != brandId && typeof rangeId !== 'undefined' && typeof brandId !== 'undefined') {
            $.ajax({
                type: "POST",
                url: renderSearchForm,
                data: "brandId=" + brandId + "&rangeId=" + rangeId,
                async: false,
                success: function(content){
                    $("div.menu_search_vehicle_overlay").toggle();
                    $(parent).html(content);
                }
            });
        }
    });

    /**
     * On change action on model selector.
     * Reloads search area and add the model construction dates selector.
     */
    $(document).on("change","#modelSelect",function(e)
    {
        e.stopImmediatePropagation();
        var parent = $(this).closest('.vehicle-forms');

        $("div.menu_search_vehicle_overlay").toggle();

        var modelSlug    = $(this).val();
        var brandId    = $(parent).find('#brandSelect').val();
        var rangeId    = $(parent).find('#rangeSelect').val();

        if ('' != rangeId && '' != brandId && typeof rangeId !== 'undefined' && typeof brandId !== 'undefined') {
            $.ajax({
                type: "POST",
                url: renderSearchForm,
                data: "brandId=" + brandId + "&rangeId=" + rangeId + "&modelSlug=" + modelSlug,
                async: false,
                success: function(content){
                    $("div.menu_search_vehicle_overlay").toggle();
                    $(parent).html(content);
                }
            });
        }
    });

    /**
     * On change action on model construction date selector.
     * Reloads search area and add the motorisation selector.
     */
    $(document).on("change","select#modelDateStartSelect",function(e)
    {
        e.stopImmediatePropagation();
        var parent = $(this).closest('.vehicle-forms');

        $(parent).find("input#modelDateStartSelect").val(
            $(parent).find("select#modelDateStartSelect").val()
        );
        $("div.menu_search_vehicle_overlay").toggle();

        var dateStart   = $(parent).find('#modelDateStartSelect').val();
        var brandId    = $(parent).find('#brandSelect').val();
        var rangeId    = $(parent).find('#rangeSelect').val();
        var modelSlug    = $(parent).find('#modelSelect').val();

        if ('' != dateStart) {
            $.ajax({
                type: "POST",
                url: renderSearchForm,
                data: "brandId=" + brandId + "&rangeId=" + rangeId + "&modelSlug=" + modelSlug + "&modelDateStartTime=" + dateStart,
                async: false,
                success: function(content){
                    $("div.menu_search_vehicle_overlay").toggle();
                    $(parent).html(content);
                }
            });
        }
    });

    /**
     * On change action on motorisation selector : redirect to the 'show dims' page
     */
    $(document).on("change", "#motorisationSelect", function(e)
    {
        e.stopImmediatePropagation();
        var parent = $(this).closest('.vehicle-forms');

        $("div.menu_search_vehicle_overlay").toggle();

        var dataPost = $(this).attr('data-post');
        var motorisationId = $(this).val();

        if (undefined != dataPost) {
            var dateStart = $(parent).find('#modelDateStartSelect').val();
            var brandId    = $(parent).find('#brandSelect').val();
            var rangeId    = $(parent).find('#rangeSelect').val();
            var modelSlug    = $(parent).find('#modelSelect').val();

            if ('' != motorisationId) {
                $.ajax({
                    type: "POST",
                    url: renderSearchForm,
                    data: "brandId=" + brandId + "&rangeId=" + rangeId + "&modelSlug=" + modelSlug + "&modelDateStartTime=" + dateStart + "&motorisationId=" + motorisationId,
                    async: false,
                    success: function (content) {
                        $("div.menu_search_vehicle_overlay").toggle();
                        $(parent).html(content);
                    }
                });
            }
        } else {
            showVehicleDims = showVehicleDims.replace('0', motorisationId);
            window.location = showVehicleDims;
        }
    });

    /* Function to manage the 'modifier' link when an element is chosen */
    $(document).on("click", "#vehicleBrandChosen a", function(e)
    {
        var parent = $(this).closest('.vehicle-forms');
        $(parent).find('#vehicleBrandChosen').hide();
        $(parent).find('#vehicleBrandSelect').show().val('').find('option').removeAttr('selected');

        // Reset de la gamme
        $(parent).find('#vehicleRangeChosen').hide();
        $(parent).find('#vehicleRangeSelect').show().val('').find('option').removeAttr('selected');

        // Reset du modèle
        $(parent).find('#vehicleModelChosen').hide();
        $(parent).find('#vehicleModelSelect').show().val('').find('option').removeAttr('selected');

        // Reset de la date
        $(parent).find('#vehicleModelDateChosen').hide();
        $(parent).find('#vehicleModelDateSelect').show().val('').find('option').removeAttr('selected');

        // Reset de la motorisation
        $(parent).find('#vehicleMotorisationChosen').hide();
        $(parent).find('#vehicleMotorisationSelect').show().val('').find('option').removeAttr('selected');
    });

    $(document).on("click", "#vehicleRangeChosen a", function(e)
    {
        var parent = $(this).closest('.vehicle-forms');
        $(parent).find('#vehicleRangeChosen').hide();
        $(parent).find('#vehicleRangeSelect').show().val('').find('option').removeAttr('selected');

        // Reset du modèle
        $(parent).find('#vehicleModelChosen').hide();
        $(parent).find('#vehicleModelSelect').show().val('').find('option').removeAttr('selected');

        // Reset de la date
        $(parent).find('#vehicleModelDateChosen').hide();
        $(parent).find('#vehicleModelDateSelect').show().val('').find('option').removeAttr('selected');

        // Reset de la motorisation
        $(parent).find('#vehicleMotorisationChosen').hide();
        $(parent).find('#vehicleMotorisationSelect').show().val('').find('option').removeAttr('selected');
    });

    $(document).on("click","#vehicleModelChosen a",function(e)
    {
        var parent = $(this).closest('.vehicle-forms');
        $(parent).find('#vehicleModelChosen').hide();
        $(parent).find('#vehicleModelSelect').show().val('').find('option').removeAttr('selected');

        // Reset de la date
        $(parent).find('#vehicleModelDateChosen').hide();
        $(parent).find('#vehicleModelDateSelect').show().val('').find('option').removeAttr('selected');

        // Reset de la motorisation
        $(parent).find('#vehicleMotorisationChosen').hide();
        $(parent).find('#vehicleMotorisationSelect').show().val('').find('option').removeAttr('selected');
    });

    $(document).on("click","#vehicleModelDateChosen a",function(e)
    {
        var parent = $(this).closest('.vehicle-forms');
        $(parent).find('#vehicleModelDateChosen').hide();
        $(parent).find('#vehicleModelDateSelect').show().val('').find('option').removeAttr('selected');

        // Reset de la motorisation
        $(parent).find('#vehicleMotorisationChosen').hide();
        $(parent).find('#vehicleMotorisationSelect').show().val('').find('option').removeAttr('selected');
    });

    $(document).on("click","#vehicleMotorisationChosen a",function(e)
    {
        var parent = $(this).closest('.vehicle-forms');
        $(parent).find('#vehicleMotorisationChosen').hide();
        $(parent).find('#vehicleMotorisationSelect').show().val('').find('option').removeAttr('selected');
    });

    $('#vs_model_section', '.js-form-souscription').hide();
    $('#vs_year_section', '.js-form-souscription').hide();
    $('#vs_motor_section', '.js-form-souscription').hide();
});
