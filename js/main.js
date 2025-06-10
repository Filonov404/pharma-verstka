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
  const burgerSpan = document.querySelector(".burger span");
  const menu = document.querySelector(".header-menu");
  const catalogBtn = document.querySelector(".btn-catalog");
  const catalogMenu = document.querySelector(".catalog-menu");
  const menuItems = document.querySelectorAll('.header-menu .has-dropdown > a');
  const backButtons = document.querySelectorAll('.catalog-menu .submenu .back-button');

  if (burger) {
    burger.addEventListener("click", () => {
      document.body.classList.toggle("no-scroll");
      if (catalogMenu) {
        catalogMenu.classList.toggle("open");
      } else if (menu) {
        menu.classList.toggle("open");
      }
      burgerSpan.classList.toggle("open-burger");
    });
  }

  if (catalogBtn) {
    catalogBtn.addEventListener("click", () => {
      catalogMenu.classList.toggle("open");
      burgerSpan.classList.toggle("open-burger");
    });
  }

  menuItems.forEach(item => {
    item.addEventListener('click', (e) => {
      if (window.innerWidth < 1024) {
        e.preventDefault();
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
    if (menu && burger && !menu.contains(event.target) && !burger.contains(event.target)) {
      menu.classList.remove("open");
      menuItems.forEach((item) => {
        item.classList.remove("open");
      });
    }
  });

  document.querySelectorAll('.js-lang').forEach(lang => {
    const langDisplay = lang.querySelector('.js-lang-display');
    const langTogglers = lang.querySelectorAll('.js-lang-toggler');
    const dropdownBox = lang.querySelector('.js-dropdown-box');

    if (langDisplay && dropdownBox) {
      langDisplay.addEventListener('click', (e) => {
        e.preventDefault();
        dropdownBox.classList.toggle('active');
      });
    }

    langTogglers.forEach(toggler => {
      toggler.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = toggler.getAttribute('href')?.substring(1) || '';
        if (langDisplay && lang) {
          langDisplay.textContent = lang.toUpperCase(); // Обновляем текст кнопки
          // Здесь можно добавить вызов функции для бэкенда, например:
          changeLanguage(lang); // Функция-заглушка для бэкенда
        }
        if (dropdownBox) {
          dropdownBox.classList.remove('active'); // Закрываем dropdown
        }
      });
    });

    // Закрытие dropdown при клике вне
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.js-lang') && dropdownBox) {
        dropdownBox.classList.remove('active');
      }
    });
  });

  // Функция-заглушка для бэкенда
  function changeLanguage(lang) {
    console.log(`Выбран язык: ${lang}`); // Замените на логику бэкенда
  }

  document.querySelectorAll('.header-menu li:has(.dropdown-menu)').forEach(li => {
    const icon = document.createElement('span');
    icon.className = 'dropdown-icon';
    icon.innerHTML = `<svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.99992 5.58586L12.2928 0.292969L13.707 1.70718L6.99992 8.41429L0.292818 1.70718L1.70703 0.292969L6.99992 5.58586Z" fill="#1A1A1E"/></svg>`;
    li.appendChild(icon);
  });


  function initProductPopup() {
    const popup = document.getElementById('popup-success');
    const popupClose = document.getElementById('popup-close');
    const popupImg = popup?.querySelector('.popup-product-img img');
    const popupPrice = popup?.querySelector('.popup-product-price');
    const popupName = popup?.querySelector('.popup-product-name');
    const popupDesc = popup?.querySelector('.popup-product-description');

    if (!popup) return;

    document.querySelectorAll('.catalog-item-card .more-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const card = button.closest('.catalog-item-card');
        if (card) {
          const price = card.querySelector('.subtitle')?.textContent.trim() || '';
          const name = card.querySelector('.bold-text')?.textContent.trim() || '';
          const desc = card.querySelector('span')?.textContent.trim() || '';
          const img = card.querySelector('.catalog-img img')?.getAttribute('src') || '';

          if (popupImg) popupImg.src = img;
          if (popupImg) popupImg.alt = name;
          if (popupPrice) popupPrice.textContent = price;
          if (popupName) popupName.textContent = name;
          if (popupDesc) popupDesc.textContent = desc;

          popup.classList.add('active');
        }
      });
    });

    [popupClose].forEach(el => {
      if (el) {
        el.addEventListener('click', () => {
          popup.classList.remove('active');
        });
      }
    });

    popup.addEventListener('click', (e) => {
      if (e.target === popup) popup.classList.remove('active');
    });
  }



  function initForm(formId, popupMessage) {
    const form = document.getElementById(formId);
    const popup = document.getElementById('popup-success');
    const popupTitle = popup?.querySelector('.popup-title');
    const popupText = popup?.querySelector('.popup-text');
    const popupClose = document.getElementById('popup-close');
    const popupBtn = document.getElementById('popup-btn');

    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      console.log(`Submitting form with ID: ${formId}`);
      let valid = true;
      let submitButton = form.querySelector('.form-submit, .new-form__btn');
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Отправка...';
      } else {
        console.warn(`Submit button not found in form #${formId} with classes '.form-submit' or '.new-form__btn'`);
      }

      form.querySelectorAll('.form-input').forEach(input => {
        const error = input.parentNode.querySelector('.form-error');
        const value = input.value.trim();
        const name = input.name;

        if (!value) {
          error.textContent = 'Обязательное поле';
          input.classList.add('input-error');
          valid = false;
        } else {
          if (name === 'email') {
            const emailPattern = /^[\w-.]+@[\w-]+\.[a-z]{2,}$/i;
            if (!emailPattern.test(value)) {
              error.textContent = 'Некорректный email';
              input.classList.add('input-error');
              valid = false;
            } else {
              error.textContent = '';
              input.classList.remove('input-error');
            }
          } else if (name === 'phone') {
            const phonePattern = /^\+?\d{10,15}$/;
            if (!phonePattern.test(value.replace(/\s/g, ''))) {
              error.textContent = 'Некорректный номер телефона';
              input.classList.add('input-error');
              valid = false;
            } else {
              error.textContent = '';
              input.classList.remove('input-error');
            }
          } else {
            error.textContent = '';
            input.classList.remove('input-error');
          }
        }
      });

      if (!valid) {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = formId === 'consult-form' ? 'Получить консультацию' : 'Получить расчет';
        }
        return;
      }

      setTimeout(() => {
        form.reset();
        form.querySelectorAll('.form-input').forEach(input => {
          input.classList.remove('input-error', 'not-empty');
        });
        if (popup) {
          popupTitle.textContent = formId === 'consult-form' ? 'Заявка отправлена' : 'Запрос отправлен';
          popupText.textContent = popupMessage;
          popup.classList.add('active');
        }
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = formId === 'consult-form' ? 'Получить консультацию' : 'Получить расчет';
        }
      }, 300);
    });

    form.querySelectorAll('.form-input').forEach(input => {
      input.addEventListener('input', function () {
        const error = this.parentNode.querySelector('.form-error');
        if (error) error.textContent = '';
        this.classList.remove('input-error');
        this.classList.toggle('not-empty', this.value.trim() !== '');
      });
    });

    [popupClose, popupBtn].forEach(el => {
      if (el) {
        el.addEventListener('click', () => {
          if (popup) popup.classList.remove('active');
        });
      }
    });

    if (popup) {
      popup.addEventListener('click', (e) => {
        if (e.target === popup) popup.classList.remove('active');
      });
    }
  }



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


  function initNewSlider() {
    new Swiper(".spera-slider", {
      loop: true,
      adaptiveHeight: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }


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

  function initStickyHeader() {
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

  initProductPopup();
  initForm('consult-form', 'Мы скоро свяжемся с вами');
  initForm('form-subs', 'Мы отправили расчет прибыли франшизы на ваш email');
  initSlider();
  initStickyHeader();
});