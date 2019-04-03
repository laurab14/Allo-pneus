var Slider = Slider || {};

Slider.rules = {
    opeRuleBannersElementId: '#js-home-slider-rules',
    $opeRuleBannersDomElements: null,
    opeRuleBanners: [],

    /**
     * Retrieve the slider rules elements
     */
    init: function () {
        Slider.rules.$opeRuleBannersDomElements = $(Slider.rules.opeRuleBannersElementId).find('span');
        Slider.rules.parseOpeRuleBanners();
    },
    /**
     * instantiate a JS object for each slider rule found.
     */
    parseOpeRuleBanners: function () {
        $.each(Slider.rules.$opeRuleBannersDomElements, function (index, opeRuleDomElement) {
            var $item = $(opeRuleDomElement);
            Slider.rules.opeRuleBanners.push({
                op_id: $item.data('op-id'),
                link_color: $item.data('link-color'),
                link_position: $item.data('link-position'),
                modal_title: $item.data('modal-title'),
                modal_content: $item.data('modal-content'),
                rules_pdf: $item.data('rules-pdf')
            });
        });
    },
    /**
     * Set ope rules links positions and color when needed
     */
    setOpeRulesButtons: function ($slideshowBullets) {
        $.each($slideshowBullets, function (index, item) {
            var $rulesBtn = $(item).find('a.js-btn-rules').first();
            var opeRuleBanner = Slider.rules.getOpeRuleBanner($(item).data('op-id'));

            if (null !== opeRuleBanner) {
                $rulesBtn.addClass('js-ope-has-rules '+ opeRuleBanner.link_position);
                $rulesBtn.css('color', opeRuleBanner.link_color);
            }
        });
    },
    /**
     * Retrieve an OpeRule given an OpeId
     *
     * @param {string} opeId "mas850"
     *
     * @returns {object|null}
     */
    getOpeRuleBanner: function (opeId) {
        var opeRule = null;
        for (var i = 0; i < Slider.rules.opeRuleBanners.length; i++) {
            if (Slider.rules.opeRuleBanners[i].op_id === opeId) {
                opeRule = Slider.rules.opeRuleBanners[i];
                break;
            }
        }

        return opeRule;
    }
};

$(document).ready(function() {
    var $body = $('body');
    var $slideShowBullet = $('.js-slideshow-bullet');
    $slideShowBullet.eq(0).addClass('is-active');

    Slider.rules.init();
    Slider.rules.setOpeRulesButtons($slideShowBullet);

    $('.js-slideshow').each(function() {
        var $slideshow = $(this);

        var effect = $(this).attr('data-effect');
        var $backgrounds = $('.js-background');
        var $elements = $slideshow.find('.js-slideshow-element');
        var $bullets = $slideshow.find('.js-slideshow-bullet');
        var $lists = $slideshow.find('.js-slideshow-list');
        var $rulesButtons = $slideshow.find('a.js-btn-rules');
        var $btnArrow = $slideshow.find('.js-slideshow-arrow');

        switch (effect){
            case 'slide':
                var ulWidth = $elements.length * $elements.innerWidth();
                break;

            case 'miniSlide':
                var ulWidth = $elements.innerWidth();
                break;

            case 'fade':
                var ulWidth = $bullets.length * $bullets.outerWidth();
                break;
        }
        $lists.css('width', ulWidth);

        function autoSlideNext(direction){
            var direction = direction || 'right';
            var $bullet = $('.js-slideshow-bullet',$slideshow);
            var bulletLength = $bullet.length;
            var current = $bullet.filter('.is-active').index();
            var next = (current + 1) % bulletLength;
            var prev = (bulletLength + current - 1) % bulletLength;
            if(direction=='left'){
                slideTo($bullet.eq(prev),current);
            } else {
                slideTo($bullet.eq(next),current);
            }
        }

        $.fn.hideAllExcept = function showMe(index) {
            this.css('display','none');
            this.eq(index).css('display','block');
            return this;
        };

        function slideTo($elm, currentIdx) {
            $bullets.removeClass('is-active');

            $elm.addClass('is-active');
            var index = $elm.index();

            switch (effect) {
                case 'slide':
                    var decalage = - (index * $elements.innerWidth()) ;
                    $lists.css('left',decalage+"px");
                    break;

                case 'miniSlide':
                    $elements.hideAllExcept(index);
                    $elements.css('opacity', 0);
                    $elements.eq(index).animate({
                        opacity:1
                    }, {
                        duration:1000,
                        queue:false
                    });
                    break;

                case 'fade':
                    $backgrounds.eq(currentIdx).animate({
                        opacity:0
                    }, {
                        duration:1500,
                        queue:false
                    });
                    var bgBody = $backgrounds.eq(currentIdx).attr('data-background');
                    $body.attr("style",bgBody);
                    $elements.hideAllExcept(index);
                    $backgrounds.hideAllExcept(index);
                    $backgrounds.eq(index).animate({
                        opacity:1
                    }, {
                        duration:1500,
                        queue:false
                    });
                    break;
            }
        }

        var timer = setInterval(autoSlideNext, 6000);
        $bullets.on('click', function() {
            clearInterval(timer);

            var currentIdx = $bullets.filter('.is-active').index();
            slideTo($(this), currentIdx);
        });

        $btnArrow.on('click', function(e){
            clearInterval(timer);
            if ($(e.target).hasClass('js-prev')) {
                autoSlideNext('left');
            } else {
                autoSlideNext();
            }
        });

        $rulesButtons.on('click', function () {
            var opeRule = Slider.rules.getOpeRuleBanner($bullets.filter('.is-active').data('op-id'));
            $('body').append('<div id="js-home-slider-rules-modal" class="reveal-modal reveal-modal-selection home-slider-rules-modal"></div>');
            var $rulesModal = $('#js-home-slider-rules-modal');

            $rulesModal.html('<span><a class="close-reveal-modal"></a></span>' +
                '<div class="modal-body"><h2 class="js-modal-title home-slider-rules-modal-title"></h2>' +
                '<div class="js-modal-content home-slider-rules-modal-content"></div>' +
                '<a class="js-modal-button home-slider-rules-modal-link" target="_blank" href="">Télécharger les modalités complètes</a></div>');

            $rulesModal.find('.js-modal-title').html(opeRule.modal_title);
            $rulesModal.find('.js-modal-content').html(opeRule.modal_content);
            $rulesModal.find('.js-modal-button').attr('href', opeRule.rules_pdf);
            $rulesModal.reveal();
        });
    });
});
