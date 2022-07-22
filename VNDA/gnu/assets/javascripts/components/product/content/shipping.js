import { formatMoney } from '../../../utils/formats';

export const shipping = {
  submit: function (_$form) {
    const shippingBox = $('[data-shipping-calculator]');
    const formShipping = shippingBox.find('form');
    const inputValue = shippingBox.find('[name=cep]');
    const btnSubmit = shippingBox.find('[type=submit]');
    const printResults = shippingBox.find('[data-list-shipping]');
    let zip = '';

    inputValue.on('input', function (e) {
      const x = e.target.value.replace(/\D/g, '').match(/(\d{0,5})(\d{0,3})/);
      e.target.value = !x[2] ? x[1] : x[1] + '-' + x[2];
    });

    formShipping.on('submit', function (e) {
      e.preventDefault();

      const sku = $('[data-section-product]').find('input[name="sku"]').val();
      const quantity = $('[data-section-product]')
        .find('[name=quantity]')
        .val();

      zip = inputValue.val();
      zip = zip.replace('-', '');

      const data = { sku, quantity, zip };

      if (zip.length == 8) {
        $.ajax({
          url: '/frete_produto',
          cache: false,
          type: 'POST',
          dataType: 'json',
          data,
          beforeSend: function () {
            const progressText = btnSubmit.attr('text-progress');
            btnSubmit.html(progressText);
          },
        })
          .done(function (resp) {
            const methods = JSON.parse(resp.methods),
              address = resp.address_details,
              result =
                '<h4>' +
                address.street_name +
                ' - ' +
                address.neighborhood +
                ', ' +
                address.city +
                '/' +
                address.state +
                '</h4>';

            result += '<ul>';

            methods.forEach(function (method) {
              let price = method.price,
                days = method.delivery_days;

              price = price == 0 ? 'Grátis' : formatMoney(price);

              result +=
                '<li>' +
                method.name +
                ' - ' +
                price +
                '<span class="prazo">' +
                method.description +
                '</span></li>';
            });

            result += '</ul>';

            printResults.html(result);
          })
          .fail(function (error) {
            console.info('Ocorreu um erro');

            const {
              responseJSON: { message },
            } = error;

            if (message.toLowerCase().includes('o cep informado não existe')) {
              printResults.html(
                `<div class="content"><p>${error.responseJSON.message}</p></div>`
              );
            } else {
              printResults.html(
                '<div class="content"><p>Ocorreu um erro</p></div>'
              );
            }
          })
          .always(function () {
            const originalText = btnSubmit.attr('text-original');
            btnSubmit.html(originalText);
          });
      } else {
        printResults.html(
          '<div class="content"><p>Formato de CEP inválido</p></div>'
        );
      }
    });
  },
  init: function () {
    shipping.submit();
  },
};
