$(document).ready( function () {
    AppJS.ready();
});

var AppJS = {

    ready: function () {
        AppJS.handlers();
        AppJS.sliderInit();
    },

    handlers: function () {
        $('.sandWhich, .menu a').on('click', function()  { AppJS.switchMenu(); });
        $('body').on('click', function(e)  { AppJS.bodyClick(e); });
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
        })
    }

};


