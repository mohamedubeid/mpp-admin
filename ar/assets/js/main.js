(function (window, document, $, undefined) {
    'use strict';
    var axilInit = {
        i: function (e) {
            axilInit.s();
            axilInit.methods();
        },

        s: function (e) {
            (this._window = $(window)),
                (this._document = $(document)),
                (this._body = $('body')),
                (this._html = $('html'));
        },
        methods: function (e) {
            axilInit.w();
            axilInit.axilHover();
            axilInit.axilBackToTop();
            axilInit.axilSlickActivation();
            axilInit.megamenuHover();
            axilInit.mobileMenuShow();
            axilInit.mobileMenuHide();
            axilInit.mobileMenuNavShow();
            axilInit.trendPost();
            axilInit.contactForm();
            axilInit.mobileSearch();
            axilInit.observeSlider();
        },

        w: function (e) {
            this._window
                .on('load', axilInit.l)
                .on('scroll', axilInit.scrl)
                .on('resize', axilInit.res);
        },

        observeSlider: function () {
            const img1 = document.querySelector("#observe1"),
              img2 = document.querySelector("#observe2");
            let counter = 0;
            
            function testImage(img) {
            var tester = new Image();
            tester.src = img.src;
            // tester.onload = imageFound;
            tester.onerror = ()=>{imageNotFound(img)};
            }
            // function imageFound() {
            // }
            function imageNotFound(img) {
                counter++;
                let ind = +img.parentElement.parentElement.parentElement.getAttribute('data-slick-index');
                $('.slider-activation').slick('slickRemove',ind);
                if (ind !== 0){
                    ind--;
                }
                if(counter >= 2){
                    document.querySelector('#sliderID').style.display = 'none';
                }
            }
            testImage(img1);
            testImage(img2);
        },

        scrl: function () {},

        mobileSearch: function () {
            $('.search-button-toggle').on('click', function (e) {
                e.preventDefault();
                $(this).toggleClass('open');
                $(this).siblings('.header-search-form').toggleClass('open');
            });
        },

        contactForm: function () {
            $('.axil-contact-form').on('submit', function (e) {
                e.preventDefault();
                var _self = $(this);
                var __selector = _self.closest('input,textarea');
                _self.closest('div').find('input,textarea').removeAttr('style');
                _self.find('.error-msg').remove();
                _self
                    .closest('div')
                    .find('button[type="submit"]')
                    .attr('disabled', 'disabled');
                var data = $(this).serialize();
                $.ajax({
                    url: 'mail.php',
                    type: 'post',
                    dataType: 'json',
                    data: data,
                    success: function (data) {
                        _self
                            .closest('div')
                            .find('button[type="submit"]')
                            .removeAttr('disabled');
                        if (data.code == false) {
                            _self
                                .closest('div')
                                .find('[name="' + data.field + '"]');
                            _self
                                .find('.btn-primary')
                                .after(
                                    '<div class="error-msg"><p>*' +
                                        data.err +
                                        '</p></div>'
                                );
                        } else {
                            $('.error-msg').hide();
                            $('.form-group').removeClass('focused');
                            _self
                                .find('.btn-primary')
                                .after(
                                    '<div class="success-msg"><p>' +
                                        data.success +
                                        '</p></div>'
                                );
                            _self.closest('div').find('input,textarea').val('');

                            setTimeout(function () {
                                $('.success-msg').fadeOut('slow');
                            }, 5000);
                        }
                    },
                });
            });
        },

        mobileMenuShow: function () {
            $('.hamburger-menu').on('click', function (e) {
                e.preventDefault();
                axilInit._body.addClass('popup-mobile-menu-show'),
                    axilInit._html.css({
                        overflow: 'hidden',
                    });
            });
        },

        mobileMenuHide: function () {
            $('.mobile-close').on('click', function (e) {
                e.preventDefault();
                axilInit._body.removeClass('popup-mobile-menu-show'),
                    axilInit._html.css({
                        overflow: '',
                    });
                $('.popup-mobilemenu-area .menu-item-has-children a')
                    .removeClass('open')
                    .siblings('.axil-submenu')
                    .slideUp('400');
            });
            $('.popup-mobilemenu-area').on('click', function (e) {
                e.target === this &&
                    axilInit._body.removeClass('popup-mobile-menu-show'),
                    axilInit._html.css({
                        overflow: '',
                    });
            });
        },

        mobileMenuNavShow: function (e) {
            var screenWidth = axilInit._window.width();
            if (screenWidth < 1200) {
                $('.popup-mobilemenu-area .menu-item-has-children a').on(
                    'click',
                    function (e) {
                        $(this).siblings('.axil-submenu').slideToggle('400');
                        $(this)
                            .toggleClass('open')
                            .siblings('.axil-submenu')
                            .toggleClass('active');
                    }
                );
            }
        },

        axilHover: function () {
            $(
                '.content-direction-column, .post-listview-visible-color'
            ).mouseenter(function () {
                var self = this;
                $(self).removeClass('axil-control');
                setTimeout(function () {
                    $(
                        '.content-direction-column.is-active, .post-listview-visible-color .post-list-view.is-active'
                    )
                        .removeClass('is-active')
                        .addClass('axil-control');
                    $(self).removeClass('axil-control').addClass('is-active');
                }, 0);
            });
        },

        trendPost: function () {
            $(window).resize(function () {});
            //do something
            var width = axilInit._window.width();
            if (width > 991) {
                $('.trend-post').mouseenter(function () {
                    var self = this;
                    $(self).removeClass('axil-control');
                    setTimeout(function () {
                        $('.trend-post.is-active')
                            .removeClass('is-active')
                            .addClass('axil-control');
                        $(self)
                            .removeClass('axil-control')
                            .addClass('is-active');
                    }, 0);
                });
            }
        },

        megamenuHover: function () {
            $('.vertical-nav-menu li.vertical-nav-item').hover(function () {
                $('.axil-vertical-inner').hide();
                $('.vertical-nav-menu li.vertical-nav-item').removeClass(
                    'active'
                );
                $(this).addClass('active');
                var selected_tab = $(this).find('a').attr('href');
                $(selected_tab).stop().fadeIn();
                return false;
            });
        },

        axilBackToTop: function () {
            var btn = $('#backto-top');
            $(window).scroll(function () {
                if ($(window).scrollTop() > 300) {
                    btn.addClass('show');
                } else {
                    btn.removeClass('show');
                }
            });
            btn.on('click', function (e) {
                e.preventDefault();
                $('html, body').animate(
                    {
                        scrollTop: 0,
                    },
                    '300'
                );
            });
        },

        axilSlickActivation: function (e) {
            $('.axil-slide').attr('dir', 'rtl');
            $('.slider-style-1').attr('dir', 'rtl');
            $('.slider-activation').attr('dir', 'rtl');
            $('.slider-activation').slick({
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                dots: false,
                fade: true,
                adaptiveHeight: true,
                cssEase: 'linear',
                prevArrow:
                    '<button class="slide-arrow prev-arrow"><i class="fal fa-arrow-left"></i></button>',
                nextArrow:
                    '<button class="slide-arrow next-arrow"><i class="fal fa-arrow-right"></i></button>',
                rtl: true,
            });

            $('.modern-post-activation').slick({
                infinite: true,
                slidesToShow: 3,
                slidesToScroll: 1,
                arrows: true,
                dots: false,
                prevArrow:
                    '<button class="slide-arrow prev-arrow"><i class="fal fa-arrow-left"></i></button>',
                nextArrow:
                    '<button class="slide-arrow next-arrow"><i class="fal fa-arrow-right"></i></button>',
                responsive: [
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 2,
                        },
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2,
                        },
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                        },
                    },
                ],
            });

            // Bootstrap Tab With Slick
            $('a[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
                $('.modern-post-activation').slick('setPosition');
            });

            $('.post-gallery-activation').slick({
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                dots: false,
                fade: true,
                adaptiveHeight: true,
                cssEase: 'linear',
                prevArrow:
                    '<button class="slide-arrow prev-arrow"><i class="fal fa-arrow-left"></i></button>',
                nextArrow:
                    '<button class="slide-arrow next-arrow"><i class="fal fa-arrow-right"></i></button>',
            });

            $('.categories-activation').slick({
                infinite: true,
                slidesToShow: 6,
                slidesToScroll: 1,
                arrows: true,
                dots: false,
                adaptiveHeight: true,
                prevArrow:
                    '<button class="slide-arrow prev-arrow"><i class="fal fa-arrow-left"></i></button>',
                nextArrow:
                    '<button class="slide-arrow next-arrow"><i class="fal fa-arrow-right"></i></button>',
                responsive: [
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 5,
                        },
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 4,
                        },
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 2,
                        },
                    },
                ],
            });

            $('.slick-nav-avtivation-new').slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                vertical: true,
                asNavFor: '.slick-for-avtivation-new',
                dots: false,
                focusOnSelect: true,
                verticalSwiping: false,
                centerMode: false,
                centerPadding: '0',
                arrows: false,
                autoplay: true,
                autoplaySpeed: 5000,
                infinite: false,
                responsive: [
                    {
                        breakpoint: 1199,
                        settings: {
                            vertical: true,
                            slidesToShow: 3,
                        },
                    },
                    {
                        breakpoint: 992,
                        settings: {
                            vertical: true,
                            slidesToShow: 3,
                        },
                    },
                    {
                        breakpoint: 577,
                        settings: {
                            vertical: true,
                            slidesToShow: 2,
                        },
                    },
                ],
            });

            $('.slick-for-avtivation-new').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                fade: true,
                asNavFor: '.slick-nav-avtivation-new',
                infinite: false,
                autoplay: true,
                responsive: [
                    {
                        breakpoint: 769,
                    },
                ],
            });
        },
    };
    axilInit.i();
})(window, document, jQuery);
