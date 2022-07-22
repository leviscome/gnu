export const pagination = {
  params: window._pagination,
  priceProds: {
    selector: '[data-update-price]',
    attr: 'update-price',
  },
  productsWrapper: document.querySelectorAll('.products.grid')[0],
  productWrapper: document.querySelectorAll('.products.grid .content')[0],
  button: document.querySelector('[data-load-more]'),
  stopLoading: function () {
    const button = this.button;

    if (button != null) button.parentElement.removeChild(button);
  },
  setCurrentPage: function (_number) {
    const totalPages = this.params.total_pages;

    if (_number <= totalPages) {
      this.params.current_page = _number;

      if (this.params.current_page >= totalPages) this.stopLoading();

      if (_number < totalPages)
        return (this.params.next_url = this.params.pages[_number].url);
    }
  },
  loadProducts: async function () {
    const nextUrl = this.params.next_url;

    const response = await fetch(nextUrl);
    const data = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(data, 'text/html');
    return doc.querySelectorAll('.product');
  },
  getPriceProd: function () {
    const selector = this.priceProds.selector;
    const attr = this.priceProds.attr;

    if ($(selector).length > 0) {
      $(selector).each(function (_, __) {
        const prodId = $(this).data(attr);
        const url = '/produto/preco/' + prodId;

        if (prodId != '' && prodId != null) {
          $.ajax({
            url: url,
            type: 'GET',
          })
            .done(function (resp) {
              this.html(resp);
            })
            .fail(function (resp) {
              console.error(resp);
            });
        }
      });
    }
  },
  getNextPage: async function () {
    const currentPage = this.params.current_page;
    const wrapper = this.productsWrapper;
    const productWrapper = this.productWrapper;

    if (!wrapper.classList.contains('searching')) {
      this.productsWrapper.classList.add('searching');

      const newProducts = await this.loadProducts();

      newProducts.forEach((product) => {
        productWrapper.appendChild(product);
      });

      this.setCurrentPage(currentPage + 1);

      lazyLoadInstance.update();

      window.Vnda.Component.Price.update();

      this.getPriceProd();

      wrapper.classList.remove('searching');
    }
  },

  init: function () {
    const button = this.button;

    if (typeof this.params != undefined) {
      if (button != null) {
        button.addEventListener(
          'click',
          () => {
            this.getNextPage();
          },
          { passive: true }
        );
      }
    }
  },
};
