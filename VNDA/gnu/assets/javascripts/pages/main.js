import { header } from '../components/header.js';
import { footer } from '../components/footer.js';
import { setCartDrawer, setNewsletterPopup } from '../components/vndaComponents.js';

export const pages = {
  init: () => {        
    header.init();
    footer.init();

    setNewsletterPopup();
    setCartDrawer();
  },
};
