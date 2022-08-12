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
    let choice_country = $('.vacancies__switcher-country');
    let choice_all = $('.vacancies__switcher-all');
    let choice_country_items = $('.vacancies__items-country');
    let choice_all_items = $('.vacancies__items-all');

    $('.vacancies__items-all').fadeOut();
    $('.switch').click(function () {
        $(this).toggleClass("switchOn");

        $(choice_country).toggleClass('vacancies__switcher-choice--active');
        $(choice_country_items).fadeToggle()

        $(choice_all).toggleClass('vacancies__switcher-choice--active');
        $(choice_all_items).fadeToggle()

    });

    $('.vacancies__switcher-mobile select').on('change', function (select) {
        $(choice_country).toggleClass('vacancies__switcher-choice--active');
        $(choice_country_items).fadeToggle()

        $(choice_all).toggleClass('vacancies__switcher-choice--active');
        $(choice_all_items).fadeToggle()

        $('.switch').toggleClass("switchOn");
    })

    // click on the burger. mobile menu
    let burger_button = document.querySelector('.header__burger-btn');
    let mobile_nav = document.querySelector('.header__links');
    $(burger_button).on('click', function (item) {
        $(mobile_nav).slideToggle();
        $('body').addClass('mutted');
    });

    let close_moblie_nav = document.querySelector('.header__links-close');
    $(close_moblie_nav).on('click', function () {
        $(mobile_nav).slideToggle();
        $('body').removeClass('mutted');
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

    let all_inputs = document.querySelectorAll('.form-feedback__input input, .form-feedback__input textarea');
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

        item.addEventListener('blur', function () {
            enabledButton();
        });
    });

    // Pre-fill the phone field and automatically set the format when entering 
    let phone_field = document.querySelector('.form-feedback__input-phone input');

    $(phone_field).mask('+7 (999) 999-9999', { placeholder: "." });


    if (phone_field.value === '') {
        phone_field.value = '+7 ('
        $(phone_field).addClass('not-empty');
    } else {

    }

    $(phone_field).on('input', function (item) {
        let mask = '+7 (';

        if ((this.value).length <= 4) {
            this.value = mask
        }

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


    // form validate 

    jQuery.validator.addMethod("accept", function (value, element, param) {
        return value.match(new RegExp(param));
    });


    $(".form-feedback__form").validate({
        errorElement: 'span',
        errorClass: "error",
        highlight: function (element, errorClass, validClass) {
            $(element).parents(".form-feedback__input").addClass('form-feedback__input--error').removeClass('form-feedback__input--valid');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).parents(".form-feedback__input").removeClass('form-feedback__input--error').addClass('form-feedback__input--valid');
        },
        messages: {
            job: {
                required: "Это поле не может быть пустым",
                minlength: "Вводимое значение не может быть короче 3х символов",
            },
            name: {
                required: "Это поле не может быть пустым",
                minlength: "Вводимое значение не может быть короче 5ти символов",
                accept: 'Введите фамилию, имя и отчество через пробел (Например: Иванов Петр Алексеевич)'
            },
            phone: {
                required: "Это поле не может быть пустым",
                accept: 'Не корректный номер телефона (Пример:+7 (987) 98798798 )'
            },
            email: {
                number: "Please enter your age as a numerical value",
                email: "Не корректный email"
            },
            education: {
                required: "Это поле не может быть пустым",
                minlength: "Вводимое значение не может быть короче 6ти символов",
            },
            address: {
                required: "Это поле не может быть пустым",
                minlength: "Вводимое значение не может быть короче 6ти символов",
            },
        },
        rules: {
            job: {
                required: true,
                minlength: 3
            },
            name: {
                required: true,
                minlength: 5,
                accept: "([а-яА-Я]+)"
            },
            phone: {
                required: true,
                accept: /\+7\s?\(?[0-9]{3}\)?\s?[0-9]{3}\-?[0-9]{4}/,
            },
            education: {
                required: true,
                minlength: 6
            },
            address: {
                required: true,
                minlength: 6
            },
            email: {
                required: false,
                email: true
            },
        }
    });

    // Processing a click to delete a field content
    $('.input-file__trash').on('click', function () {
        let input = $('.form-feedback__input-file input')[0];
        input.value = null;
        let jqfile = $(this).siblings('.jq-file')[0];
        $(jqfile).removeClass('changed');
        $(jqfile).find('.jq-file__name').text('');
    });

    $('.form-feedback__input-close').on('click', function (item) {
        let input = $(this).siblings('input')
        $(input).val('');
        console.log(input);
        $(input).removeClass('not-empty')
    });

    $('.form-button__button--disabled').on('click', function (e) {
        e.preventDefault();
        console.log(e)
    });


    // jobs popup slider 
    $('.vacancies .item-button__tab').on('click', function (item) {
        item.preventDefault();
        $('.vacancies__jobs-slider').addClass('vacancies__jobs-slider--show')
        $('body').addClass('mutted');

        $('.vacancies__jobs-slider').css('top', $(window).scrollTop())

        let id = $(this).attr('data-id');
        $('.vacancies .jobs-tab__item').removeClass('jobs-tab__item-active').hide();
        $('.vacancies .vacancies__items-country').find('.item-button__tab').removeClass('item-button__tab--active');
        $(this).addClass('item-button__tab--active');
        $('#' + id).addClass('jobs-tab__item-active').fadeIn();

        // switch-handling
        let identifier = id.split('-')[0]
        let country_jobs_items = document.querySelectorAll(`.jobs-tab__item[id*=${identifier}]`);

        if (country_jobs_items.length > 1) {
            $('.jobs-slider__arrow-prev, .jobs-slider__arrow-next').addClass('jobs-slider__arrow--visible');

            $('.jobs-slider__arrow-prev, .jobs-slider__arrow-next').on('click', function (button) {
                let what_if_btn = $(this).hasClass('jobs-slider__arrow-prev') ? 'prev' : 'next';
                let active_tab_index;
                country_jobs_items.forEach(function (item, index, array) {
                    if ($(item).hasClass('jobs-tab__item-active')) {
                        active_tab_index = index;
                    };

                });

                if (what_if_btn === 'next') {
                    if (active_tab_index < country_jobs_items.length - 1) {
                        $(country_jobs_items[active_tab_index]).removeClass('jobs-tab__item-active').hide();
                        $(country_jobs_items[active_tab_index + 1]).addClass('jobs-tab__item-active').fadeIn();
                    } else {
                        $(country_jobs_items[active_tab_index]).removeClass('jobs-tab__item-active').hide();
                        $(country_jobs_items[0]).addClass('jobs-tab__item-active').fadeIn();
                    }
                } else if (what_if_btn === 'prev') {
                    if (active_tab_index > 0) {
                        $(country_jobs_items[active_tab_index]).removeClass('jobs-tab__item-active').hide();
                        $(country_jobs_items[active_tab_index - 1]).addClass('jobs-tab__item-active').fadeIn();
                    } else {
                        $(country_jobs_items[active_tab_index]).removeClass('jobs-tab__item-active').hide();
                        $(country_jobs_items[country_jobs_items.length - 1]).addClass('jobs-tab__item-active').fadeIn();
                    }
                }
            });
        }
    });

    // Closing the popup window
    $('.close-popup, body.mutted').on('click', function () {
        closePopup();
    });


    // // hide any popup when you click on mutted


    // click to submit to the job popup
    $('.short-info__button button, .full-info__button button').on('click', function (btn) {
        let job_name;

        if ($(this).parent('div').hasClass('short-info__button')) {
            job_name = $(this).parent('.short-info__button').siblings('.short-info__title').text();
        } else {
            job_name = $(this).parent('.full-info__button').parent('.job-popup__full-info').siblings('.job-popup__short-info').find('.short-info__title').text();
        }


        showForm();

        $('.form-feedback__input-job input').val(job_name);
        $('.form-feedback__input-job input').addClass('not-empty');
        $('.form-feedback__input-job input').focus();
        $('.form-feedback__input-job input').blur();
    });

    $('.welcome__info-button button, .student-questionnaire__link a, .footer__top-button button').on('click', function (el) {
        el.preventDefault();
        showForm();
    });


    function showForm() {
        $('.popup-wrapper').removeClass('vacancies__jobs-slider--show');
        $('.form-feedback__wrapper').addClass('form-feedback__wrapper--show');
        $('.form-feedback__wrapper').css('top', $(window).scrollTop())
        $('body').addClass('mutted')
    };


    checkCookies();
});


function addBorderDiv(input) {
    $(input).parent('.form-feedback__input').addClass('form-feedback__input--focus')
};

function removeBorderDiv(input) {
    $(input).parent('.form-feedback__input').removeClass('form-feedback__input--focus')
};



// cookies
function checkCookies() {
    let cookieDate = localStorage.getItem('cookieDate');
    let cookieNotification = document.querySelector('.coockie');
    let cookieBtn = cookieNotification.querySelector('.coockie__button button');

    if (!cookieDate || (+cookieDate + 31536000000) < Date.now()) {
        setTimeout(function () {
            cookieNotification.classList.add('coockie--visible');
        }, 5000)
    }

    cookieBtn.addEventListener('click', function () {
        localStorage.setItem('cookieDate', Date.now());
        cookieNotification.classList.remove('coockie--visible');
    })
}

// close popup 
function closePopup() {
    let all_popups = document.querySelectorAll('.popup-wrapper');
    all_popups.forEach(function (el) {
        if (window.getComputedStyle(el).display !== 'none') {
            $(el).removeClass('vacancies__jobs-slider--show');
            $(el).removeClass('form-feedback__wrapper--show');
            $(el).removeClass('all-done__popup--show');
        }
    });

    $('body').removeClass('mutted');
}


// Checking and unblock send 
function enabledButton() {
    let all_field_true = [];
    all_field_true.push($('.form-feedback__input-job input').val() !== '' && $('.form-feedback__input-job input').attr('aria-invalid') === 'false');
    all_field_true.push($('.form-feedback__input-name input').val() !== '' && $('.form-feedback__input-name input').attr('aria-invalid') === 'false');
    all_field_true.push($('.form-feedback__input-phone input').val() !== '' && $('.form-feedback__input-phone input').attr('aria-invalid') === 'false');
    all_field_true.push($('.form-feedback__input-education input').val() !== '' && $('.form-feedback__input-education input').attr('aria-invalid') === 'false');
    all_field_true.push($('.form-feedback__input-address input').val() !== '' && $('.form-feedback__input-address input').attr('aria-invalid') === 'false');

    if ($('.form-feedback__input-email input').val() !== '') {
        all_field_true.push($('.form-feedback__input-email input').attr('aria-invalid') === 'false');
    }

    all_field_true.push($('.jq-checkbox').hasClass('checked'));

    $('.form-button__button--disabled').off('click')
    $('.form-button__button').off('click')

    if (all_field_true.every(elem => Boolean(elem) === true)) {
        $('.form-button__button--disabled').addClass('form-button__button');
        $('.form-button__button--disabled').removeClass('form-button__button--disabled');

        $('.form-button__button--disabled').off('click')

        $('.form-button__button').on('click', function (e) {
            e.preventDefault();

            $(this).addClass('form-button__button--process')

            // иммитация отправки 
            setTimeout(function () {
                let all_inputs = document.querySelectorAll('.form-feedback__input input, .form-feedback__input textarea');


                $('.form-button__button').removeClass('form-button__button--process');
                $('.form-button__button').addClass('form-button__button--disabled');
                $('.form-button__button').removeClass('form-button__button');
                all_inputs.forEach(function (input) {
                    $(input).val('');
                    $(input).focus();
                    $(input).blur();
                    $(input).removeClass('not-empty');
                });
                enabledButton();

                $('.form-feedback__wrapper').removeClass('form-feedback__wrapper--show');


                $('.all-done__popup').addClass('all-done__popup--show');
                console.log($('.all-done__popup').height());
                $('.all-done__popup').css('top', $(window).scrollTop() + $('.all-done__popup').height() / 2)
            }, 5000)

        });
    } else {
        $('.form-button__button').addClass('form-button__button--disabled');
        $('.form-button__button').removeClass('form-button__button');

        $('.form-button__button').off('click')

        $('.form-button__button--disabled').on('click', function (e) {
            e.preventDefault();
        });
    }
};