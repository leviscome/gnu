import { form as formUtilities } from '../../utils/form.js';

const contact = {
  validate: function (form) {
    let validated = true;
    const errors = [];

    if (form.find('[name="email"]').val() == '') {
      validated = false;
      errors.push('Informe seu email');
    }

    if (form.find('[name="name"]').val() == '') {
      validated = false;
      errors.push('Informe seu nome');
    }

    if (form.find('[name="phone"]').val() == '') {
      validated = false;
      errors.push('Informe seu telefone');
    }

    if (form.find('[name="subject"]').val() == '') {
      validated = false;
      errors.push('Informe o assunto');
    }

    if (form.find('[name="message"]').val() == '') {
      validated = false;
      errors.push('Informe uma mensagem');
    }

    return { validated, errors };
  },
  handleSubmit: function () {
    const validate = this.validate;

    $('[data-webform=contact]').on('submit', function (event) {
      const form = $('[data-webform=contact]');

      event.preventDefault();

      const honeyPot = form.find('[name="vnda"]');

      if (honeyPot.length > 0) {
        if (honeyPot.val() != '') {
          console.info('ROBOT DETECTED');
          return false;
        }
      }

      const responseValidated = validate(form);

      if (responseValidated.validated) {
        formUtilities.submit(form, false, function () {
          formUtilities.messageResponse(false, 'clear', form);
        });
      } else {
        formUtilities.messageResponse(responseValidated.errors, 'error', form);
      }
    });
  },
  init: function () {
    this.handleSubmit();
  },
};

export default contact;
