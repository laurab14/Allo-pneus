(function($) {

    $.fn.pushProduitHome = function(options) {

        var settings = $.extend({
            itemsPerPage: 4,
            animationDuration: 500,
            intervalDelay: 8000
        }, options);

        var container = this;

        var createChildren = function(elem) {
            var child = $('<ul class="child" />'),
                pagination_content = $('<div class="content-boutons"></div>'),
                pagination = $('<ul class="boutons"></ul>'),
                items = elem.find('.source > ul > li'),
                count = items.length,
                pages = Math.ceil(count / settings.itemsPerPage);

            if (!count) {
                return;
            }

            for (var j = 0; j < settings.itemsPerPage; ++j) {
                var li = $('<li />');

                for (var i = 0; i < pages; ++i) {
                    var currentItem = items.eq(i * settings.itemsPerPage + j);

                    if(settings.itemsPerPage == 4 && j == 0) {
                        currentItem.find('img.w_produit').attr('src', currentItem.find('img.w_produit').attr('data-alt-image'));
                        currentItem.find('img.w_logo').attr('src', currentItem.find('img.w_logo').attr('data-alt-image'));
                        currentItem.find('img.w_logo').addClass('main_logo');
                    }

                    var div = $('<div />');
                    div.append(currentItem.children());

                    li.append(div);
                }

                child.append(li);
            }

            for (i = 0; i < pages; ++i) {
                pagination.append('<li data-index="'+i+'"></li>');
            }
            pagination.find('li:first').addClass('actived');
            pagination_content.prepend(pagination);
            elem.prepend(pagination_content).prepend(child);
        };

        createChildren(this);

        var autoPageChange = function() {
            var pagination = container.find('ul.boutons > li'),
                count = pagination.length;

            if (pagination.is(':hidden') || count <= 1) {
                return;
            }

            var current = parseInt(pagination.filter('.actived').attr('data-index')),
                next = current + 1;

            if (next >= count) {
                next = 0;
            }

            pagination.eq(next).click();
        };

        var currentInterval;

        var resetInterval = function() {
            if (currentInterval) {
                clearInterval(currentInterval);
            }
            currentInterval = setInterval(autoPageChange, settings.intervalDelay);
        };

        this.find('ul.boutons > li').click(function() {
            var bouton = $(this),
                current = parseInt(bouton.parent().children('.actived').attr('data-index')),
                index = parseInt(bouton.attr('data-index'));

            resetInterval();

            if (index == current) {
                return;
            }

            $(this)
                .siblings().removeClass('actived').end()
                .addClass('actived');

            container.find('ul.child > li > div').stop(true, true);

            container.find('ul.child > li').each(function() {
                var li = $(this),
                    divs = li.children('div'),
                    width = divs.eq(0).outerWidth();

                if (index > current) {
                    divs
                        .eq(index)
                            .css({left: width})
                            .animate({left: 0}, settings.animationDuration, function() {
                                divs.slice(current + 1, index).css({left: 0});
                            });
                } else {
                    divs
                        .slice(index + 1, current).css({left: width}).end()
                        .eq(current)
                            .animate({left: width}, settings.animationDuration);
                }
            });
        });

        resetInterval();

        return this;
    };

    $.fn.tabbedPushProduitHome = function(options) {
        var position = true;

        this.children('li')
            .each(function() {
                var li = $(this),
                    tabOptions = options,
                    overrideItemsPerPage = li.attr('data-items-per-page');

                if (overrideItemsPerPage) {
                    tabOptions = $.extend({}, tabOptions, {
                        itemsPerPage: overrideItemsPerPage
                    });
                }

                li.pushProduitHome(tabOptions);
            })
            .children('h2')
                .click(function() {
                    $(this).parent()
                        .siblings()
                            .removeClass('active')
                            .find('.active').removeClass('active').end()
                        .end()
                        .addClass('active')
                        .find('.child, .boutons').addClass('active').end()
                        .find('.boutons > li.actived').click().end(); // reset interval
                })
            .end();

        this.children('li:first').children('h2').click();

        return this;
    };
}(jQuery));
