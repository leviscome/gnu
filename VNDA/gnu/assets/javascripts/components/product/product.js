import Swiper, { Navigation, Pagination, FreeMode, EffectFade }  from 'swiper';

import { variants } from '../product/content/variants.js';
import { info } from '../product/content/info.js';
import { notify } from '../product/content/notify.js';
import { shipping } from './content/shipping.js';
import BuyTogether from './buyTogether.js';

import '../product/content/zoom.min.js';

export const product = {
  wrapperImages: $('[data-section-product]').find('[data-product-images]'),
  sliderProduct: $('[data-section-product]').find(
    '[data-product-images] [data-main-slider]'
  ),
  thumbsProduct: $('[data-section-product]').find(
    '[data-product-images] [data-slider-thumbs]'
  ),
  showFirstImages: function () {
    const variants = vnda.variants.all();
    const imagesWithoutSkus = this.sliderProduct.find('.image-without-sku');
    const thumbsWithoutSkus = this.thumbsProduct.find('.image-without-sku');

    if (imagesWithoutSkus.length > 0) {
      imagesWithoutSkus.removeClass('inactive').addClass('active');
      thumbsWithoutSkus.removeClass('inactive').addClass('active');
    } else {
      for (let i = 0; i < variants.length; i++) {
        if (variants[i].main) {
          this.sliderProduct
            .find('[data-image][data-skus-image*="' + variants[i].sku + '"]')
            .addClass('active')
            .removeClass('inactive');

          this.thumbsProduct
            .find(
              '[data-image-thumb][data-skus-image*="' + variants[i].sku + '"]'
            )
            .addClass('active')
            .removeClass('inactive');
        }
      }
    }
  },

  setGallery: function () {
    const qtdImages = this.sliderProduct.find('[data-image]').length;

    if (qtdImages <= 1) {
      this.wrapperImages.addClass('without-thumbs');
    } else {
      this.wrapperImages.removeClass('without-thumbs');
    }

    const gallery = new Swiper('.swiper[data-main-slider]', {
      modules: [Navigation, EffectFade, Pagination],
      slidesPerView: 1,
      spaceBetween: 0,
      preloadImages: false,
      // lazy: true,
      watchOverflow: true,
      simulateTouch: false,
      navigation: {
        nextEl: '.swiper[data-main-slider] .swiper-button-next',
        prevEl: '.swiper[data-main-slider] .swiper-button-prev',
      },
      pagination: {
        el: '.swiper[data-main-slider] .swiper-pagination',
        clickable: true,
      }
    });

    new Swiper('.swiper[data-slider-thumbs]', {
      modules: [Navigation, FreeMode, EffectFade],
      spaceBetween: 10,
      slidesPerView: 5,
      freeMode: true,
      preloadImages: false,
      lazy: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      simulateTouch: true,
      watchOverflow: true,
      direction: 'vertical',
      navigation: {
        nextEl: '.swiper[data-slider-thumbs] .swiper-button-next',
        prevEl: '.swiper[data-slider-thumbs] .swiper-button-prev',
      },
    });

    this.sliderProduct.push(gallery);

    $(document).on('click', '[data-image-thumb]:visible', function () {
      gallery.slideTo($(this).index('[data-image-thumb]:visible'));
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
        slidesPerView: 3,
        spaceBetween: 16,
        preloadImages: false,
        lazy: true,
        watchOverflow: true,
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
            slidesPerView: 4,
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
  addItemKit: function (products = [], _$parent, addItemResult) {
    var _this = this;
    var $btnComprar = $('[data-kit-button]');
    var $boxResponse = $(
      '[data-form-product-kit] .msg-response:not(.resp-validate)'
    );
    var urlUpdate = '/carrinho';

    const data = {
      items: [],
    };

    products.forEach((product) => {
      var sku = product.querySelector('[name="sku"]').value;
      var qty = product.querySelector('[name="quantity"]').value;

      if (!product.classList.contains('-disabled') && sku) {
        data.items.push({
          sku: sku,
          quantity: qty,
        });
      }
    });

    const json_data = JSON.stringify(data);

    if (!$btnComprar.hasClass('adding')) {
      $.ajax({
        url: '/carrinho/adicionar/kit',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        xhrFields: {
          withCredentials: true,
        },
        cache: false,
        data: json_data,
        beforeSend: function () {
          $btnComprar.addClass('adding');
        },
      })
        .done(function (resp) {
          if (typeof info.addItemResult == 'function') {
            info.addItemResult(
              _$parent,
              'produto-adicionado',
              resp.items_count,
              $boxResponse
            );
          } else {
            info.addItemResultDefault(
              _$parent,
              'produto-adicionado',
              resp,
              $boxResponse
            );
          }
        })
        .fail(function (resp) {
          if (typeof info.addItemResult == 'function') {
            info.addItemResult(
              _$parent,
              'erro-adicionar',
              resp.items_count,
              $boxResponse
            );
          } else {
            info.addItemResultDefault(
              _$parent,
              'erro-adicionar',
              resp,
              $boxResponse
            );
          }
        })
        .always(function () {
          $btnComprar.removeClass('adding');
        });
    }
  },
  setTabs: function () {
    $('.tabs .titulo').on('click', function () {
      var id = $(this).data('content');

      $('.tabs .titulo').removeClass('active');
      $(this).addClass('active');

      $('.contents .content').removeClass('active');
      $(id).addClass('active');
    });
  },
  init: function () {
    this.showFirstImages();
    this.setGallery();
    this.setProductsCarousel();
    this.setTabs();

    notify.init();
    variants.init();
    info.init();
    shipping.init();
    BuyTogether.init();
  },
};
