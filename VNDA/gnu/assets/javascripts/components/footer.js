import { form as formUtilities } from '../utils/form.js';

export const footer = {
  validate: function (form) {
    let validated = true;
    const errors = [];

    if (form.find('[name="email-newsletter"]').val() == '') {
      validated = false;
      errors.push('Informe seu email');
    }

    return { validated, errors };
  },
  handleSubmit: function () {
    const _this = this;

    $('[data-webform]').on('submit', function (event) {      
      const form = $('[data-webform=newsletter]');

      event.preventDefault();
      
      const honeyPot = $(this).find('[name="vnda"]');

      if (honeyPot.length > 0) {
        if (honeyPot.val() != '') {
          console.info('ROBOT DETECTED');
          return false;
        }
      }

      const responseValidated = _this.validate(form);

      if (responseValidated.validated) {
        formUtilities.submit($(this), false, function () {
          formUtilities.messageResponse(false, 'clear', form);
        });
      } else {
        formUtilities.messageResponse(responseValidated.errors, 'error', form);
      }
    });
  },
  handleFooterCategories: function () {
    $('.footer .categories .category').each(function (_, element) {
      $(element).on('click', 'h3', function (event) {
        event.preventDefault();

        $(element).toggleClass('close');
      });
    });
  },
  init: function () {
    this.handleFooterCategories();
    this.handleSubmit();
  },
};
