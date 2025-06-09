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



  function initForm(formId) {
    const form = document.getElementById(formId);
    const popup = document.getElementById('popup-success');
    const popupClose = document.getElementById('popup-close');
    const popupBtn = document.getElementById('popup-btn');

    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      let valid = true;

      const emailInput = form.querySelector('input[name="email"]');
      const emailError = emailInput?.parentNode.querySelector('.form-error');
      const emailVal = emailInput.value.trim();
      const emailPattern = /^[\w-.]+@[\w-]+\.[a-z]{2,}$/i;

      if (!emailVal) {
        emailError.textContent = 'Обязательное поле';
        emailInput.classList.add('input-error');
        valid = false;
      } else if (!emailPattern.test(emailVal)) {
        emailError.textContent = 'Некорректный email';
        emailInput.classList.add('input-error');
        valid = false;
      } else {
        emailError.textContent = '';
        emailInput.classList.remove('input-error');
      }

      if (!valid) return;

      setTimeout(() => {
        form.reset();
        emailInput.classList.remove('input-error');
        if (popup) popup.classList.add('active');
      }, 300);
    });

    [popupClose, popupBtn].forEach(el => {
      if (el) {
        el.addEventListener('click', function () {
          if (popup) popup.classList.remove('active');
        });
      }
    });

    form.querySelectorAll('.form-input').forEach(input => {
      input.addEventListener('input', function () {
        const error = this.parentNode.querySelector('.form-error');
        if (error) error.textContent = '';
        this.classList.remove('input-error');
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initForm('#consult-form');
  });




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


  new Swiper(".spera-slider", {
    loop: true,
    adaptiveHeight: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

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

  function initPopup() {
    const popup = document.getElementById('popup-success');
    const closeBtns = [document.getElementById('popup-close'), document.getElementById('popup-btn')];

    if (!popup) return;

    document.querySelectorAll('.popup-trigger').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        popup.classList.add('active');
      });
    });

    closeBtns.forEach(btn => {
      if (btn) btn.addEventListener('click', () => popup.classList.remove('active'));
    });

    popup.addEventListener('click', function (e) {
      if (e.target === popup) popup.classList.remove('active');
    });
  }


  function initProductPopup() {
    document.querySelectorAll('.card.more-btn').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();

        const card = this.closest('.catalog-item-card');
        const cardImg = card ? card.querySelector('.catalog-img img') : null;
        const popup = document.getElementById('popup-success');
        const popupProductImg = popup ? popup.querySelector('.popup-product-img') : null;
        const popupProductImgTag = popupProductImg ? popupProductImg.querySelector('img') : null;

        if (popup && popupProductImg && popupProductImgTag && cardImg) {
          popupProductImgTag.src = cardImg.src;
          popupProductImgTag.alt = cardImg.alt;
          popupProductImg.style.display = 'block';
          popup.classList.add('active');
        }
      });
    });

    const closeBtns = [
      document.getElementById('popup-close'),
      document.getElementById('popup-btn')
    ];
    closeBtns.forEach(btn => {
      if (btn) btn.addEventListener('click', () => {
        document.getElementById('popup-success').classList.remove('active');
        const popup = document.getElementById('popup-success');
        popup.querySelector('.popup-product-img').style.display = 'none';
      });
    });

    const popup = document.getElementById('popup-success');
    if (popup) {
      popup.addEventListener('click', function (e) {
        if (e.target === popup) popup.classList.remove('active');
      });
    }
  }

  function initSubscribeForm() {
    const form = document.querySelector('.form-subscribe');
    if (!form) return;

    const emailInput = form.querySelector('input[name="email"]');
    const response = form.querySelector('.response');
    const popup = document.getElementById('popup-success');
    const popupCloseBtns = [popup.querySelector('#popup-close'), popup.querySelector('#popup-btn')];

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = emailInput.value.trim();

      if (!email || !validateEmail(email)) {
        response.textContent = 'Пожалуйста, введите корректный email';
        response.style.color = 'red';
        emailInput.classList.add('input-error'); // ← Исправлено!
        return;
      }
      response.textContent = '';
      emailInput.classList.remove('input-error'); // ← Исправлено!
      popup.classList.add('active');
      // form.reset();
    });

    // Убираем ошибку при вводе
    emailInput.addEventListener('input', function () {
      response.textContent = '';
      emailInput.classList.remove('input-error');
    });

    popupCloseBtns.forEach(btn => {
      if (btn) btn.addEventListener('click', () => {
        popup.classList.remove('active');
      });
    });
    popup.addEventListener('click', function (e) {
      if (e.target === popup) popup.classList.remove('active');
    });
    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
  }

  function initStyckyHeader() {
    const header = document.querySelector('.header');
    let lastScroll = 0;
    let isSticky = false;

    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      if (currentScroll > 40) {
        if (!isSticky) {
          header.classList.add('sticky');
          isSticky = true;
        }
      } else {
        if (isSticky) {
          header.classList.remove('sticky');
          isSticky = false;
        }
      }
      lastScroll = currentScroll;
    });

    if (isSticky) {
      document.body.style.paddingTop = header.offsetHeight + 'px';
    } else {
      document.body.style.paddingTop = '';
    }
  }

  initStyckyHeader();
  initSubscribeForm();
  initProductPopup();
  initPopup();
  initSlider();
  initForm();


});