const burger = document.querySelector('.burger');
const burgerSpan = document.querySelector('.burger span');
const menu = document.querySelector('.header-menu');
const menuItems = document.querySelectorAll('.header-menu > li');

burger.addEventListener('click', () => {
    document.body.classList.toggle("no-scroll");
    menu.classList.toggle('open');
    burgerSpan.classList.toggle('open-burger');
});

menuItems.forEach(item => {
    item.addEventListener('click', (event) => {
        if (window.innerWidth <= 1550) {
            event.stopPropagation();
            menuItems.forEach(i => {
                if (i !== item) {
                    i.classList.remove('open');
                }
            });
            item.classList.toggle('open');
        }
    });
});
document.addEventListener('click', (event) => {
    if (!menu.contains(event.target) && !burger.contains(event.target)) {
        menu.classList.remove('open');
        menuItems.forEach(item => {
            item.classList.remove('open');
        });
    }
});

$(".js-dropdown").each(function () {
    var $dropdown = $(this),
        $dropdownToggler = $dropdown.find(".js-dropdown-toggler"),
        $dropdownBox = $dropdown.find(".js-dropdown-box"),
        dropdownType = $dropdown.data("dropdown-type"),
        close = function (e) {
            var $target = $(e.target),
                inBox = $target.closest($dropdownBox[0]).length,
                inButton = $target.closest($dropdownToggler[0]).length,
                outside = (!inButton) ? (dropdownType !== "closing") ? (!inBox) ? true : false : true : false;
            if (outside) {
                $dropdown.removeClass("open");
                $(document).unbind("click", close);
            }
        },
        open = function () {
            if (!$dropdown.hasClass("open")) {
                $(document).bind("click", close);
            } else {
                $(document).unbind("click", close);
            }
            $dropdown.toggleClass("open");
        };
    $dropdownToggler.on("click", open);
});

$(".js-lang").each(function () {
    var $lang = $(this),
        $langDisplay = $lang.find(".js-lang-display"),
        $langToggler = $lang.find(".js-lang-toggler")
        ;
    $langToggler.on("click", function () {
        var lang = $(this).attr("href").substring(1);
        $langDisplay.text(lang);
    });

});

$('.header-menu li:has(.dropdown-menu)').append($('<span class="dropdown-icon"><svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.99992 5.58586L12.2928 0.292969L13.707 1.70718L6.99992 8.41429L0.292818 1.70718L1.70703 0.292969L6.99992 5.58586Z" fill="#1A1A1E"/></svg></span>'));


$("form").submit(function (event) {
    event.preventDefault();
    var formData = {
        name: $("input[name=name]").val(),
        email: $("input[name=email]").val(),
        tel: $("input[name=tel]").val()
    };
    $.ajax({
        type: "POST",
        url: "//jsonplaceholder.typicode.com/posts",
        data: formData,
        dataType: "json",
        encode: true
    }).done(function (data) {
        $('.form-inner').remove()
        $(".response")
        $('.response').append('<div class="sucscess"><div class="modal_title">Заявка принята!</div></div>');
    });
});