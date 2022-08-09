$(function () {
    // handling clicks on links in the header navigation
    let all_nav_links = document.querySelectorAll('.header__links-page')

    all_nav_links.forEach(function (item) {

        $(item).on('click', function () {
            let previous_active = $('.header__links-page--active');
            previous_active.removeClass('header__links-page--active')
            $(item).addClass('header__links-page--active')
        });
    });

    $('.stories__slider').slick({
        infinite: true,
        prevArrow: '<button class="prev-slide slide-button"></button>',
        nextArrow: '<button class="next-slide slide-button"></button>',
        responsive: [
            {
                breakpoint: 1391,
                settings: {
                    infinite: true,
                    dots: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                }
            },
        ]
    });

    $('.positions__slider-wrapper').slick({
        prevArrow: '<button class="prev-slide slide-button"></button>',
        nextArrow: '<button class="next-slide slide-button"></button>',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    infinite: true,
                    dots: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                }
            },
        ]

    });


    $('.benefits__items').slick({
        dots: false,
        arrows: false,
        lidesToShow: 6,
        slidesToScroll: 6,
        variableWidth: true,
        infinite: false,
        responsive: [
            {
                breakpoint: 1223,
                settings: {
                    infinite: true,
                    dots: true,
                    variableWidth: true,
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    arrows: false,
                }
            },
        ]
    });

    // switch 
    $('.vacancies__items-all').fadeOut();
    $('.switch').click(function () {
        $(this).toggleClass("switchOn");

        let choice_country = $('.vacancies__switcher-country');
        let choice_all = $('.vacancies__switcher-all');
        let choice_country_items = $('.vacancies__items-country');
        let choice_all_items = $('.vacancies__items-all');

        $(choice_country).toggleClass('vacancies__switcher-choice--active');
        $(choice_country_items).fadeToggle()

        $(choice_all).toggleClass('vacancies__switcher-choice--active');
        $(choice_all_items).fadeToggle()

    });

    // click on the burger. mobile menu
    let burger_button = document.querySelector('.header__burger-btn');
    let mobile_nav = document.querySelector('.header__links');
    $(burger_button).on('click', function (item) {
        $(mobile_nav).slideToggle();
        $('html').toggleClass('fade');
    });

    let close_moblie_nav = document.querySelector('.header__links-close');
    $(close_moblie_nav).on('click', function () {
        $(mobile_nav).slideToggle();
        $('html').toggleClass('fade');
    });

    // video
    let play_btn = $('.video-fluid__play');
    let videoEl = document.querySelector('.video-fluid__video');
    $(play_btn).on('click', function () {
        $(videoEl).addClass('video-fluid__video--play');
        $(this).addClass('video-fluid__play--hidden');
        videoEl.controls = false;
        videoEl.play();

    });

    $(videoEl).on('click', function () {

        if (videoEl.paused)
            videoEl.play();
        else
            videoEl.pause();
    });

    // form styler 
    $('input, select').styler();

    let all_inputs = document.querySelectorAll('.form-feedback__input input');
    all_inputs.forEach(function (item) {
        if (item.value !== '') {
            $(item).addClass('not-empty');
        }

        item.addEventListener('input', function () {
            if (this.value !== '') {
                $(this).addClass('not-empty');
            } else {
                $(this).removeClass('not-empty');
            }
        });
    });

    $('.form-feedback__input textarea').on('input', function (item) {
        if ($(this).val() !== '') {
            $(this).addClass('not-empty');
        } else {
            $(this).removeClass('not-empty');
        }
    });


    $('a[href^="#"]').click(function (e) {
        e.preventDefault()
        let anchor = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(anchor).offset().top
        }, 600);
    });

});