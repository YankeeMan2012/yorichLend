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
        $('.addApplication').on('click', function()  { AppJS.modalForm(this); });
        $('.overlay, .close').on('click', function()  { AppJS.closeModal(); });
        $('#portfolio .site a').on('click', function(e)  { AppJS.openPortfolio(e, this); });
        $('.form button').on('click', function(e)  { AppJS.ajaxSubmit(e, this); });
    },

    openPortfolio: function (e, el) {
        e.preventDefault();
        var index = $(el).closest('.site').index() + 1;
        AppJS.portSlider.slideTo(index, 0);
        $('.modalBox').addClass('openPortfolio');
    },

    modalForm: function (el) {
        var index = $(el).closest('.card').index() + 1;
        var link = $('.form.modal .wrap a');
        $('.form.modal [name="title"]').val(index);
        switch (index) {
            case 1:
                link.text('LANDING PAGE');
                break;
            case 2:
                link.text('САЙТА-ВИЗИТКИ');
                break;
            case 3:
                link.text('КОРПОРАТИВНОГО САЙТА');
                break;
            case 4:
                link.text('ИНТЕРНЕТ-КАТАЛОГА');
                break;
            case 5:
                link.text('ИНТЕРНЕТ-МАГАЗИНА');
                break;
            case 6:
                link.text('БЛОГА/НОВОСТНОГО ПОРТАЛА');
                break;
        }
        $('.modalBox').addClass('openForm');
    },

    closeModal: function () {
        $('.modalBox').removeClass('openForm openPortfolio openThanks');
        $('.modalBox .successForm').removeClass('successForm');
    },

    ajaxSubmit: function (e, submit) {
        e.preventDefault();
        var regEmail = /^\w+([\.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;
        var regMobile = /^\+?[\d]{1,3}(-|\s)?\(?[\d]{1,3}\)?(-|\s)?[\d](-|\s)?[\d](-|\s)?[\d](-|\s)?[\d](-|\s)?[\d](-|\s)?[\d](-|\s)?\d$/;
        var preLoader = $('.preLoader');
        var form = $(submit).closest('form');
        var data = form.serializeArray();
        $('.invalid').removeClass('invalid');
        if (regEmail.test(data[1].value) || regMobile.test(data[1].value)) {
            preLoader.show();
            $.post('/mail.php', data, function () {
                form.addClass('successForm');
                // $('.modalBox').addClass('openThanks');
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

        AppJS.portSlider = new Swiper ('#portSlider', {
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


