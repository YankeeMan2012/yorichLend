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
        $('.overlay, .close').on('click', function()  { $('.modalBox').removeClass('openForm openPortfolio openThanks'); });
        $('#portfolio .site a').on('click', function(e)  { e.preventDefault(); $('.modalBox').addClass('openPortfolio'); });
        $('.form button').on('click', function(e)  { AppJS.ajaxSubmit(e, this); });
    },

    ajaxSubmit: function (e, submit) {
        e.preventDefault();
        var regEmail = /^\w+([\.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;
        var regMobile = /^\+?[\d]{1,3}(-|\s)?\(?[\d]{1,3}\)?(-|\s)?[\d](-|\s)?[\d](-|\s)?[\d](-|\s)?[\d](-|\s)?[\d](-|\s)?[\d](-|\s)?\d$/;
        var preLoader = $('.preLoader');
        var form = $(submit).closest('form');
        var data = form.serializeArray();
        $('.invalid').removeClass('invalid');
        if (regEmail.test(data[0].value) || regMobile.test(data[0].value)) {
            preLoader.show();
            $.post('/mail.php', data, function () {
                $('.modalBox').addClass('openThanks');
                preLoader.hide();
            });
        } else {
            form.find('[name="login"]').closest('.inputBox').addClass('invalid');
        }
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


