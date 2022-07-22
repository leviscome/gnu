import { header } from '../../../components/header.js';

export const info = {
  addToCartOpenCartPopup: true,
  addToCartOpenCartPopupMobile: true,
  validate: function (form) {
    const selector = form.find('[data-action="add-cart"]');

    let validated = true;
    const errors = [];

    if (selector.data('available') == 'false') {
      validated = false;
      errors.push('');
    } else {
      if (form.find('[name="sku"]').val() == '') {
        validated = false;
        errors.push('Selecione um atributo para o produto');
      }

      if (form.find('input[name="quantity"]').val() <= 0) {
        validated = false;
        errors.push('Quantidade indisponível');
      }
    }

    return { validated, errors };
  },
  addItem: function (form, parent, addItemResult) {
    const selector = parent.find('[data-action="add-cart"]');
    const urlAdd = '/carrinho/adicionar';
    const url = urlAdd;
    const formSerialize = form.serialize();
    const boxResponse = parent.find(
      '[data-form-product] .msg-response:not(.resp-validate)'
    );

    if (!selector.hasClass('adding')) {
      $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        data: formSerialize,
        beforeSend: function () {
          selector.addClass('adding');
        },
      })
        .done(function (response) {
          // console.info(response);

          if (typeof addItemResult == 'function') {
            addItemResult(form, 'produto-adicionado', response, boxResponse);
          } else {
            this.addItemResultDefault(
              form,
              'produto-adicionado',
              response.items_count,
              boxResponse
            );
          }
        })
        .fail(function (response) {
          if (typeof addItemResult == 'function') {
            addItemResult(form, 'erro-adicionar', response, boxResponse);
          } else {
            this.addItemResultDefault(
              form,
              'erro-adicionar',
              response,
              boxResponse
            );
          }
        })
        .always(function () {
          selector.removeClass('adding');
        });
    }
  },
  addItemResult: function (form, typeResult, result, boxResponse) {
    if (typeResult == 'produto-adicionado') {
      const selector = form.find('[data-action="add-cart"]');

      selector.addClass('success');

      setTimeout(function () {
        selector.removeClass('success').html(selector.data('text-available'));
      }, 3500);

      if ($('body').width() > 768) {
        if (this.addToCartOpenCartPopup) {
          header.cart.load(result);
          header.cart.show();
        } else {
          setTimeout(function () {
            window.location.href = '/carrinho';
          }, 150);
        }
      } else {
        if (this.addToCartOpenCartPopupMobile) {
          header.cart.load(result);
          header.cart.show();
        } else {
          setTimeout(function () {
            window.location.href = '/carrinho';
          }, 150);
        }
      }
    } else if (typeResult == 'erro-adicionar') {
      const errorText = JSON.parse(result.responseText);

      if (typeof boxResponse != 'undefined' && boxResponse.length > 0) {
        $('html,body').animate(
          {
            scrollTop: boxResponse.offset().top,
          },
          '250'
        );

        boxResponse.addClass('error');
        boxResponse.removeClass('success');

        boxResponse.find('span').html(errorText.error);
        boxResponse.slideDown(350);

        setTimeout(function () {
          boxResponse.slideUp(350);
        }, 3500);
      }
    }
  },
  addItemResultDefault: function (form, typeResult, result, boxResponse) {
    if (typeResult == 'produto-adicionado') {
      const selector = form.find('[data-action="add-cart"]');

      selector.addClass('success').html('Produto adicionado!');

      setTimeout(function () {
        selector.removeClass('success').html(selector.data('text-available'));
      }, 3500);

      setTimeout(function () {
        window.location.href = '/carrinho';
      }, 150);
    } else if (typeResult == 'erro-adicionar') {
      const errorText = JSON.parse(result.responseText);

      if (typeof boxResponse != 'undefined' && boxResponse.length > 0) {
        $('html,body').animate(
          {
            scrollTop: boxResponse.offset().top,
          },
          '250'
        );

        boxResponse.addClass('error');
        boxResponse.removeClass('success');

        boxResponse.find('span').html(errorText.error);
        boxResponse.slideDown(350);

        setTimeout(function () {
          boxResponse.slideUp(350);
        }, 3500);
      }
    }
  },
  messageResponse: function (response, boxResponse) {
    const htmlErrors = '';

    if (response.validated) {
      boxResponse.empty();
    } else {
      for (let i = response.errors.length - 1; i >= 0; i--) {
        htmlErrors +=
          '<span class="msg error">' + response.errors[i] + '</span>';
      }

      boxResponse.html(htmlErrors);

      $('html,body').animate(
        {
          scrollTop: boxResponse.offset().top + 100,
        },
        '250'
      );
    }
  },
  handleSubmit: function () {
    const _this = this;

    $(document).on('submit', '[data-form-product]', function (event) {
      event.preventDefault();

      const form = $(this);
      const parent = form.closest('[data-box-produto]');

      const responseValidated = _this.validate(form);
      const boxResponse = parent.find('.msg-response');

      if (responseValidated.validated) {
        _this.addItem(
          form,
          parent,
          function (form, typeResult, result, boxResponse) {
            _this.addItemResult(form, typeResult, result, boxResponse);
          }
        );
      } else {
        _this.messageResponse(responseValidated, boxResponse);
      }
    });
  },
  validateQuantity: function (value) {
    if (!isNaN(value)) {
      if (parseInt(value) > 0) {
        return true;
      }
    }

    return false;
  },
  getClearNumber: function (value) {
    if (!isNaN(value)) {
      const clearNumber = parseInt(value);

      return clearNumber;
    }

    return false;
  },
  setQuantityProduct: function () {
    const quantityInput = document.querySelectorAll('[data-quantity-selector]');
    const _this = this;
    if (quantityInput) {
      $(document).on(
        'click',
        '[data-quantity-selector] [data-plus-quantity]',
        function () {
          const box = $(this).closest('[data-quantity-selector]');
          const input = box.find('input[name="quantity"]');
          const value = input.val();

          if (_this.validateQuantity(value)) {
            const clearNumber = _this.getClearNumber(value);

            input.val(parseInt(clearNumber) + 1);
          }
        }
      );

      $(document).on(
        'click',
        '[data-quantity-selector] [data-minus-quantity]',
        function () {
          const box = $(this).closest('[data-quantity-selector]');
          const input = box.find('input[name="quantity"]');
          const value = input.val();

          if (_this.validateQuantity(value)) {
            const clearNumber = _this.getClearNumber(value);

            if (parseInt(clearNumber) - 1 > 0) {
              input.val(parseInt(clearNumber) - 1);
            }
          }
        }
      );
    }
  },
  init: function () {
    this.setQuantityProduct();

    this.handleSubmit();
  },
};
