import { pagination } from '../components/products/content/pagination.js';

const search = {
  handleOpen: (contentHeight) => {
    $('[data-action="open-filter"]').on('click', function (event) {
      event.preventDefault();

      $('.filters').toggleClass('open');

      const filterHeight = $('.filters').height();

      if ($('.filters').hasClass('open')) {
        $('main > .content').css({ 'min-height': `${filterHeight}px` });
      } else {
        $('main > .content').css({ 'min-height': `${contentHeight}px` });
      }
    });
  },
  handleGenericStyles: () => {
    $('.filters > form').find(':input').prop('disabled', false);

    $('.filters > form .color input').each(function (_, element) {
      $(element).on('change', function () {
        $(this).closest('li').toggleClass('selected', $(this).is(':checked'));
      });
    });

    return $('main > .content').height();
  },
  handleSubmit: () => {
    const form = $('.filters').find('form');

    $(form).on('submit', function () {
      $(this)
        .find('.price :input')
        .each(function (_, element) {
          $(element).val($(element).val().replace(',', '.'));
        });

      $(this)
        .find(':input')
        .filter(function () {
          return !this.value;
        })
        .attr('disabled', 'disabled');

      return true;
    });
  },
  handleLoadMore: () => {
    $('.filters > form :button:contains(+)').each(function (index, element) {
      $(element).on('click', function (event) {
        event.preventDefault();

        let number = 0;

        $(element)
          .parent()
          .children('ul')
          .children()
          .each(function (_, item) {
            const li = $(item);

            if (li.css('display') == 'none' && number < 3) {
              number++;

              li.css({ display: 'flex' });
            }
          });

        if (
          $(element)
            .parent()
            .children('ul')
            .children()
            .filter(function () {
              return $(this).css('display') == 'none';
            }).length === 0
        ) {
          $(element).css({ display: 'none' });
        }
      });
    });
  },
  setSelected: function () {
    const sPageURL = decodeURI(window.location.search.substring(1)),
      sURLVariables = sPageURL.split('&');
      
    let sParameterName;

    for (let i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i]
        .trim()
        .replaceAll('+', ' ')
        .replaceAll('%23', '#')
        .split('=');

      if (sParameterName.length > 1) {
        $(
          `.filters > form .color [name="${sParameterName[0]}"][value="${sParameterName[1]}"]`
        )
          .closest('li')
          .addClass('selected');

        $(
          `.filters > form .select option[value="${sParameterName[1]}"]`
        ).attr('selected', 'selected');

        $(
          `.filters > form [name="${sParameterName[0]}"][value="${sParameterName[1]}"]`
        ).attr('checked', true);

        $(`.filters > form .price [name="${sParameterName[0]}"]`).val(
          sParameterName[1].replace('.', ',')
        );
      }
    }
  },
  init: function () {
    const contentHeight = this.handleGenericStyles();

    this.handleSubmit();
    this.setSelected();
    this.handleLoadMore();
    this.handleOpen(contentHeight);
    this.setSelected();
    
    pagination.init();
  },
};

export default search;
