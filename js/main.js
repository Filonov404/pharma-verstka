document.addEventListener("DOMContentLoaded", () => {



  const textFixWidows = (html) => {
  return html.replace(/( |\u00A0|\()([№а-яА-Я])(\.)? /gu, (match, space, letter, dot) => {
    return `${space}${letter}${dot || ''}\u00A0`;
  });
};

  document.querySelectorAll('p, h1, h2, h3, span, div').forEach(el => {
    if (!el.children.length && el.innerHTML.trim().length > 0) {
      el.innerHTML = textFixWidows(el.innerHTML);
    }
  });

  const burger = document.querySelector(".burger");
  (burgerSpan = document.querySelector(".burger span")),
    (menu = document.querySelector(".header-menu")),
    (catalogBtn = document.querySelector(".btn-catalog")),
    (catalogMenu = document.querySelector(".catalog-menu"));
  const menuItems = document.querySelectorAll('.catalog-menu .menu-item-content');
  const backButtons = document.querySelectorAll('.catalog-menu .submenu .back-button');

  if (!menu || catalogBtn) {
    burger.addEventListener("click", () => {
      document.body.classList.toggle("no-scroll");
      catalogMenu.classList.toggle("open");
      burgerSpan.classList.toggle("open-burger");
    });
  } else {
    burger.addEventListener("click", () => {
      document.body.classList.toggle("no-scroll");
      menu.classList.toggle("open");
      burgerSpan.classList.toggle("open-burger");
    });
  }
  if (catalogBtn) {
    catalogBtn.addEventListener("click", () => {
      catalogMenu.classList.toggle("open");
      burgerSpan.classList.toggle("open-burger");
    })
  }

  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      const submenu = item.parentElement.querySelector('.submenu');
      if (submenu) {
        const backButton = submenu.querySelector('.back-button');
        if (backButton) {
          backButton.textContent = `← ${item.textContent.trim()}`;
        }
        if (submenu.classList.contains('open')) {
          submenu.classList.remove('open');
        } else {
          document.querySelectorAll('.catalog-menu .submenu.open').forEach(openSub => {
            openSub.classList.remove('open');
          });
          submenu.classList.add('open');
        }
      }
    });
  });

  backButtons.forEach(button => {
    button.addEventListener('click', () => {
      const submenu = button.closest('.submenu');
      if (submenu) {
        submenu.classList.remove('open');
      }
    });
  });
  document.addEventListener("click", (event) => {
    if (
      menu &&
      burger &&
      !menu.contains(event.target) &&
      !burger.contains(event.target)
    ) {
      if (!menu.contains(event.target) && !burger.contains(event.target)) {
        menu.classList.remove("open");
        menuItems.forEach((item) => {
          item.classList.remove("open");
        });
      }
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
          outside = !inButton
            ? dropdownType !== "closing"
              ? !inBox
                ? true
                : false
              : true
            : false;
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
      $langToggler = $lang.find(".js-lang-toggler");
    $langToggler.on("click", function () {
      var lang = $(this).attr("href").substring(1);
      $langDisplay.text(lang);
    });
  });

  $(".header-menu li:has(.dropdown-menu)").append(
    $(
      '<span class="dropdown-icon"><svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.99992 5.58586L12.2928 0.292969L13.707 1.70718L6.99992 8.41429L0.292818 1.70718L1.70703 0.292969L6.99992 5.58586Z" fill="#1A1A1E"/></svg></span>',
    ),
  );

  $("form").submit(function (event) {
    event.preventDefault();
    var formData = {
      name: $("input[name=name]").val(),
      email: $("input[name=email]").val(),
      tel: $("input[name=tel]").val(),
    };
    $.ajax({
      type: "POST",
      url: "//jsonplaceholder.typicode.com/posts",
      data: formData,
      dataType: "json",
      encode: true,
    }).done(function (data) {
      $(".form-inner").remove();
      $(".response");
      $(".response").append(
        '<div class="sucscess"><div class="modal_title">Заявка принята!</div></div>',
      );
    });
  });

  // Мок-данные (имитация ответа с бэкенда)
  const mockSlidesData = [
    {
      title: "Чувствовать себя лучше!",
      description:
        "Si14 Life Packs — это уникальное сочетание натуральных продуктов, разработанных для достижения конкретных целей по улучшению вашего здоровья, самочувствия и внешнего вида.",
      image: ".././images/catalog/cat-slide1.png",
      thumbnail: ".././images/catalog/cat-slide1.png",
    },
    {
      title: "Здоровье и красота!",
      description:
        "Si14 Life Packs помогут вам достичь идеального баланса между внутренним здоровьем и внешней красотой.",
      image: ".././images/catalog/cat-slide2.png",
      thumbnail: ".././images/catalog/cat-slide2.png",
    },
    {
      title: "Энергия каждый день!",
      description:
        "Si14 Life Packs — это ваш ежедневный источник энергии и жизненной силы.",
      image: ".././images/catalog/cat-slide3.png",
      thumbnail: ".././images/catalog/cat-slide3.png",
    },
  ];


  function initSlider() {
    const slidesData = mockSlidesData;

    new Swiper(".swiper", {
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: function (index, className) {
          return `<span class="${className}"><img src="${slidesData[index].thumbnail}" alt="Slide ${index + 1}"></span>`;
        },
      },
    });

    const swiperWrapper = document.getElementById("swiper-wrapper");
    if (swiperWrapper) {
      slidesData.forEach((slide) => {
        const slideElement = document.createElement("div");
        slideElement.classList.add("swiper-slide");
        slideElement.innerHTML = `
                <div class="slide-content atomar-item-text">
                    <h3 class="subtitle pb-12">${slide.title}</h3>
                    <p class="pb-24 d-block">${slide.description}</p>
                    <a href="#" class="gomeopaty-more more-btn text-a-center">Подробнее</a>
                </div>
                <div class="slide-image">
                    <img src="${slide.image}" alt="${slide.title}">
                </div>
            `;
        swiperWrapper.appendChild(slideElement);
      });
    }
  }



  initSlider();

});