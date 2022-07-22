import { pages } from './pages/main.js';
import { INSTITUCIONAL } from './utils/constants.js';
import FixedHeader from './common/fixedHeader';

window.addEventListener(
  'DOMContentLoaded',
  async () => {
    let page = $('body').data('page');

    pages.init();
    FixedHeader.init();
    
    if (page !== 'page') {
      (await import(`./pages/${page}`)).default.init();
    } else {
      page = document.location.href.split('/').pop();

      if (INSTITUCIONAL[page] !== undefined) {
        (
          await import(`./pages/institucional/${INSTITUCIONAL[page]}`)
        ).default.init();
      }
    }

    console.info(
      '%cVnda - Tecnologia em Ecommerce',
      'color: #f88d5b; font-size: 15px; font-family: "Verdana", sans-serif; font-weight: bold;'
    );
  },
  { passive: true }
);
