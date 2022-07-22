export const form = {
  submit: function (form, email, callback) {
    if (typeof email != 'undefined' && email != '') {
      form.find('[name="reply_to"]').val(email);
    } else {
      form.find('[name="reply_to"]').val(form.find('[name="email"]').val());
    }

    if (!form.hasClass('sending')) {
      $.ajax({
        url: '/webform',
        type: 'POST',
        data: form.serialize(),
        beforeSend: function () {
          form.removeClass('error');
          form.addClass('sending');
        },
      })
        .done(function () {
          form.addClass('sended');
          form.find('[data-msg-return] [data-msg-success]').addClass('visible');
          form
            .find('[data-msg-return] [data-msg-error]')
            .removeClass('visible');
          form.find('button[type=submit]').text('Enviado');

          setTimeout(function () {
            form.removeClass('sended');
            form.find('button[type=submit]').text('Enviar');
          }, 3500);

          form[0].reset();

          if (typeof callback == 'function') {
            callback('success');
          }
        })
        .fail(function () {
          form.addClass('error');
          form
            .find('[data-msg-return] [data-msg-success]')
            .removeClass('visible');

          form.find('[data-msg-return] [data-msg-error]').addClass('visible');

          setTimeout(function () {
            form.find('button[type=submit]').text('Enviar');
          }, 3500);

          if (typeof callback == 'function') {
            callback('error');
          }
        })
        .always(function () {
          form.removeClass('sending');
        });
    }
  },
  messageResponse: function (msg, type, form) {
    let message = msg;

    if (Array.isArray(msg)) {
      for (let i = msg.length - 1; i >= 0; i--) {
        message += '<span class="msg error">' + msg[i] + '</span>';
      }
    }

    form
      .find('[data-msg-return]')
      .removeClass('success')
      .removeClass('warning')
      .removeClass('error');

      form.find('[data-msg-return] [data-msg]').empty();

    if (type != 'clear') {
      form.find('[data-msg-return]').addClass(type);
      form.find('[data-msg-return] [data-msg]').html(message);
    }
  },
};
