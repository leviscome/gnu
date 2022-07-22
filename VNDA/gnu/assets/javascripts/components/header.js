import Mmenu from 'mmenu-js';

import { isMobile } from '../utils/mobile.js';

export const header = {
  cart: {
    count: {
      selector: '[data-cart-count]',
      attr: '[data-cart-count-attr]',
      text: '[data-cart-item-text]',
      textLabel: '[data-cart-item-text-label]',
    },
    load: function (total) {
      this.updateCount(total.items_count);
      window.componentCartDrawer.open();
    },
    show: function () {
      window.componentCartDrawer.open();
    },
    updateCount: function (itemsCount) {
      $(this.count.attr).data('cart-count-attr', itemsCount);
      $(this.count.attr).attr('data-cart-count-attr', itemsCount);

      $(this.count.attr).html(itemsCount);
      $(this.count.text).html(itemsCount);
      $(this.count.textLabel).html(
        itemsCount > 1 ? 'itens' : 'item'
      );

      if (itemsCount > 0) {
        $('[data-cart-body]').parent().addClass('active');
      } else {
        $('[data-cart-body]').parent().removeClass('active');
      }
    },
    getCount: function () {
      async function getCartItens() {
        let itens;

        try {
          itens = await $.ajax({
            url: '/carrinho/itens',
            type: 'GET',
            dataType: 'text',
          });

          return itens;
        } catch (error) {
          console.error(error);
        }
      }

      if ($(this.count.selector).length > 0) {
        getCartItens().then((total) => {
          const itens = Number.isInteger(parseInt(total));
          if (itens) {
            $(this.count.attr).attr('data-cart-count-attr', total);
            $(this.count.selector).html(total);

            const boxCart = $('[data-cart-body]');

            if (boxCart.length > 0) {
              if (total > 0) {
                pages.headerCart.load(total);
              } else {
                boxCart.html(
                  '<div class="empty"><p>Seu carrinho está vazio...</p></div>'
                );
              }
            }
          }
        });
      }
    },
    init: function () {
      this.getCount();
    },
  },
  menu: {
    setMenuMobile: function () {
      const mmenu = new Mmenu('.menu-mobile', 
        {
          slidingSubmenus: false,
          // offCanvas: {
          //   use: false,
          // },
          navbar: {
            add: false,
          },
          extensions: ['pagedim-black', 'position-front'],
        },
        {
          offCanvas: {
            pageSelector: '#wrapper',
          },
        }
      );

      $('[data-action="open-menu-mobile"]').on('click', function (event) {
        event.preventDefault();

        const menu = $('.menu-mobile');

        if (menu.hasClass('mm-opened') || menu.hasClass('mm-menu--opened')) {
          mmenu.close();
          menu.toggleClass('show');
        } else {
          mmenu.open();
          menu.toggleClass('show');
        }
      });
    },
    init: function () {  
      if(isMobile()) {
        this.setMenuMobile();
      }
    },
  },
  init: function () {
    this.cart.init();
    this.menu.init();
  },
};
