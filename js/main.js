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


$(function () {
    $('.has-dropdown a').click(function () {
        $(this).next('.dropdown-menu').toggleClass('open');
    });

    // $(document).click(function (e) {
    //     var target = e.target;
    //     if (!$(target).is('.has-dropdown a') && !$(target).parents().is('.has-dropdown a')){ 
    //         $('.dropdown-menu').fadeOut(); 
    //     }
    // });
});

$(".burger").click(function () {
    $(".header-menu").toggleClass("open-menu");
    $("body").toggleClass("no-scroll");
    $(".burger span").toggleClass("open-burger");
});
$(".close-menu").click(function () {
    $(".header-menu").removeClass("slide");
});

$("form").submit(function (event) {
    event.preventDefault();

    //get the form data
    var formData = {
        name: $("input[name=name]").val(),
        email: $("input[name=email]").val(),
        tel: $("input[name=tel]").val()
    };

    // process the form
    $.ajax({
        type: "POST",
        url: "//jsonplaceholder.typicode.com/posts",
        data: formData,
        dataType: "json",
        encode: true
    }).done(function (data) {
        $('.form-inner').remove()
        $(".response")
        // .empty()
        // .append(JSON.stringify(data, null, 2));
        $('.response').append('<div class="sucscess"><div class="modal_title">Заявка принята!</div></div>');

    });
});