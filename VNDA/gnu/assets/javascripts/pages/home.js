import Swiper, { Navigation, Pagination } from 'swiper';

import { pagination } from '../components/products/content/pagination.js';

const home = {
  setBannerRotative: () => {
    const bannerRotative = document.querySelectorAll('[data-banner-rotative]');

    bannerRotative.forEach((section) => {
      const carousel = section.querySelector('.swiper');
      const pagination = section.querySelector('.swiper-pagination');
      const next = section.querySelector('.swiper-button-next');
      const prev = section.querySelector('.swiper-button-prev');

      new Swiper(carousel, {
        modules: [Navigation, Pagination],
        slidesPerView: 1,
        spaceBetween: 0,
        watchOverflow: true,
        autoHeight: true,
        preloadImages: false,
        lazy: true,
        navigation: {
          nextEl: next,
          prevEl: prev,
        },
        pagination: {
          el: pagination,
          type: 'bullets',
          clickable: true,
        },
      });
    });
  },
  setProductsCarousel: function () {
    const productsCarousel = document.querySelectorAll(
      '[data-products-carousel]'
    );

    productsCarousel.forEach((section) => {
      const carousel = section.querySelector('.swiper');
      const pagination = section.querySelector('.swiper-pagination');
      const next = section.querySelector('.swiper-button-next');
      const prev = section.querySelector('.swiper-button-prev');

      new Swiper(carousel, {
        modules: [Navigation, Pagination],
        slidesPerView: 2,
        spaceBetween: 16,
        watchOverflow: true,
        preloadImages: false,
        lazy: true,
        breakpoints: {
          768: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
          1440: {
            slidesPerView: 5,
            spaceBetween: 36,
          },
        },
        mousewheel: {
          forceToAxis: true,
        },
        pagination: {
          el: pagination,
          type: 'bullets',
          clickable: true,
        },
        navigation: {
          nextEl: next,
          prevEl: prev,
        },
      });
    });
  },
  swipersHome: function () {
    try {
      //Quando a página carrega seleciona o primeiro swiper da lista
      loadProductSwiper(1);

      //Adiciona evento Click nos links
      $('.home-products-tabs .links a').on('click', function (e) {
        e.preventDefault();
        $('.home-products-tabs .links a').removeClass('active');
        $(this).addClass('active');
        var tag = $(this).attr('href');
        $('.product-list').removeClass('active');
        $('[data-link="' + tag + '"]').addClass('active');
        var val = $(this).attr('value');

        //Instancia o swiper de acordo com o index selecionado
        loadProductSwiper(val);
      });

      //Instancia dinamicamente o swiper selecionado
      function loadProductSwiper(index) {
        var swiperHomeProdutos = new Swiper(`.swiper-home-produtos-${index}`, {
          direction: 'horizontal',
          slidesPerView: 1,
          spaceBetween: 10,
          watchOverflow: true,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          breakpoints: {
            '@0.75': {
              slidesPerView: 1,
            },
            '@1.00': {
              slidesPerView: 2,
            },
            '@1.20': {
              slidesPerView: 4,
            },
            '@1.50': {
              slidesPerView: 4,
            },
          },
        });
      }
    } catch (error) {
      /*LOG DEV  */
      //console.log(`${error}`);
      /*LOG PROD */
      console.log(`ação inesperada em store home:swipersHome`);
    }
  },
  setSwiperInsta: () => {
    const swiper = document.querySelector('[data-swiper-insta]');
    if (swiper) {
      const pagination = swiper.querySelector(
        '.swiper-pagination'
      );
      const next = swiper.querySelector(
        '.swiper-button-next'
      );
      const prev = swiper.querySelector(
        '.swiper-button-prev'
      );
      const swiperInsta = new Swiper('[data-swiper-insta] .swiper', {
        modules: [Navigation, Pagination],
        slidesPerView: 3,
        spaceBetween: 16,
        watchOverflow: true,
        preloadImages: false,
        lazy: true,
        navigation: {
          nextEl: next,
          prevEl: prev,
        },
        pagination: {
          el: pagination,
          type: 'bullets',
          clickable: true,
        },
        breakpoints: {
          768: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1440: {
            slidesPerView: 5,
            spaceBetween: 36,
          },
        },
      });
    }
  },
  init: function () {
    this.setBannerRotative();
    this.setProductsCarousel();
    this.swipersHome();
    this.setSwiperInsta();

    pagination.init();
  },
};

export default home;
