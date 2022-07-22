import { product } from "./product";

const BuyTogether = {
  init: function(){
    $(document).on('submit', '[data-form-product-kit]', function (event) {
      event.preventDefault();

      var $form = $(this);
      var $parent = $form.closest('[data-kit-body]');

      var $btnComprar = $parent.find('[data-kit-button]');

      var $boxResponse = $parent.find('.resp-validate');
      var attributesCount = document.querySelectorAll('[data-buy-together]');
      product.addItemKit(
        document.querySelectorAll('[data-buy-together]'),
        $parent
      );
    });

    // handle form submit kit
    $('[data-kit-button]').on('click', function (e) {
      e.preventDefault();
      var $kit_products = $('[data-form-product-kit]');
      $kit_products.trigger('submit');
    });
  }
}

export default BuyTogether;
