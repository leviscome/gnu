export const notify = {
  submit: function (_$form) {
    var formData = _$form.serialize();
  
    if (!_$form.hasClass('sending')) {
      $.ajax({
        url: _$form.attr('action'),
        type: 'post',
        dataType: 'json',
        data: formData,
        beforeSend: function () {
          _$form.addClass('sending');
        },
      })
      .done(function (resp) {
        console.log('success');
        console.info(resp);

        var msgSuccess =
          'Você receberá um e-mail quando o produto estiver disponível';

        if (resp.error) {
          _$form.find('[data-msg-retorno] [data-msg-error]').html(resp.error);
          _$form
            .find('[data-msg-retorno] [data-msg-success]')
            .removeClass('visible');
          _$form
            .find('[data-msg-retorno] [data-msg-error]')
            .addClass('visible');
        } else {
          // Envia um email para o cliente saber que o usuário solicitou o avise-me
          $.ajax({
            url: '/webform',
            type: 'POST',
            data: {
              key: _$form.find('[name="key"]').val(),
              reply_to: _$form.find('[name="email"]').val(),
              email: _$form.find('[name="email"]').val(),
              product_name: _$form.find('[name="nome"]').val(),
              referencia: _$form.find('[name="referencia"]').val(),
              sku: _$form.find('[name="sku"]').val(),
            },
          })
            .done(function (resp) {
              _$form
                .find('[data-msg-retorno] [data-msg-success]')
                .addClass('visible');
              _$form
                .find('[data-msg-retorno] [data-msg-error]')
                .removeClass('visible');

              _$form[0].reset();
            })
            .fail(function (error) {
              _$form
                .find('[data-msg-retorno] [data-msg-success]')
                .removeClass('visible');
              _$form
                .find('[data-msg-retorno] [data-msg-error]')
                .addClass('visible');
            });
        }
      })
      .fail(function (resp) {
        console.log('error');
        console.error(resp);
        console.error(resp.responseText);
        console.error(resp.responseText.error);

        var errorText = JSON.parse(resp.responseText);
        console.info(errorText);

        _$form
          .find('[data-msg-retorno] [data-msg-error]')
          .html(errorText.error);
        _$form
          .find('[data-msg-retorno] [data-msg-success]')
          .removeClass('visible');
        _$form
          .find('[data-msg-retorno] [data-msg-error]')
          .addClass('visible');
      })
      .always(function () {
        _$form.removeClass('sending');
      });
    }
  },
  init: function() {
    $(document).on('submit', '[data-form-notify]', function (event) {
      event.preventDefault();
      notify.submit($(this));
    });
  }
};
