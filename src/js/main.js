$(document).ready( function () {
    AppJS.ready();
});

var AppJS = {

    ready: function () {
        AppJS.handlers();
        AppJS.sliderInit();
    },

    handlers: function () {
        $('.sandWhich').on('click', function()  { AppJS.switchMenu(); });
        $('.menu a').on('click', function(e)  { AppJS.closeMenu(e) });
        $('body').on('click', function(e)  { AppJS.bodyClick(e); });
        $('.addApplication').on('click', function()  { $('.modalBox').addClass('openForm'); });
        $('.hover, .close').on('click', function()  { $('.modalBox').removeClass('openForm openPortfolio'); });
        $('#portfolio .site a').on('click', function(e)  { e.preventDefault(); $('.modalBox').addClass('openPortfolio'); });
    },

    switchMenu: function() {
        var header = $('header');
        var menu = $('.menu');
        header.toggleClass('openMenu');
        if (header.hasClass('openMenu')) {
            menu.slideDown();
        } else {
            menu.slideUp();
        }
    },

    closeMenu: function (e) {
        if (!$(e.target).closest('openMenu').length) {
            $('.menu').slideUp();
            $('header').removeClass('openMenu');
        }
    },

    bodyClick: function (e) {
        if (!$(e.target).closest('header').length && $('header').hasClass('openMenu')) {
            AppJS.switchMenu();
        }
    },
    
    sliderInit: function () {
        new Swiper ('#slider', {
            prevButton: '.prev',
            nextButton: '.next',
            pagination: '.swiper-pagination',
            paginationClickable: true,
            speed: 700,
            loop: true
        });

        var port = new Swiper ('#portSlider', {
            prevButton: '.port-prev',
            nextButton: '.port-next',
            speed: 700,
            loop: true,
            onInit: function () {
                $('.close').on('click', function()  { $('.modalBox').removeClass('openPortfolio'); });
            }
        });
    }

};


