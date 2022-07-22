import { formatMoney, formatValue } from '../../../utils/formats';

export const variants = {
  wrapperProduct: $('[data-section-product]'),
  config: {
    attributes: $('[data-product-attributes]'),
    attr1: '',
    attr1Name: '',
    attr2: '',
    attr2Name: '',
    attr3: '',
    attr3Name: '',
    qtdAttributes: 0,
    hasAttribute1: false,
    hasAttribute2: false,
    hasAttribute3: false,
  },
  setConfigDefault: function () {
    const attr1 = this.config.attributes.find(
      '[data-attribute="1"]:not(.hidden)'
    );
    const attr2 = this.config.attributes.find(
      '[data-attribute="2"]:not(.hidden)'
    );
    const attr3 = this.config.attributes.find(
      '[data-attribute="3"]:not(.hidden)'
    );

    let itensAttr1 = '';
    let itensAttr2 = '';
    let itensAttr3 = '';

    if (attr1.length > 0) {
      itensAttr1 = attr1.data('items');
      itensAttr1 = itensAttr1.split(' // ');
    }

    if (attr2.length > 0) {
      itensAttr2 = attr2.data('items');
      itensAttr2 = itensAttr2.split(' // ');
    }

    if (attr3.length > 0) {
      itensAttr3 = attr3.data('items');
      itensAttr3 = itensAttr3.split(' // ');
    }

    $.extend(true, this.config, {
      attr1: attr1,
      attr1Name: attr1.data('attribute-name'),
      itemsAttr1: itensAttr1,
      attr2: attr2,
      attr2Name: attr2.data('attribute-name'),
      itemsAttr2: itensAttr2,
      attr3: attr3,
      attr3Name: attr3.data('attribute-name'),
      itemsAttr3: itensAttr3,
    });
  },
  setQtdAttributes: function () {
    let qtdAttributes = 0;

    const attr1 = this.config.attr1;
    const attr2 = this.config.attr2;
    const attr3 = this.config.attr3;

    if (attr1.length > 0) {
      qtdAttributes++;
      this.config.hasAttribute1 = true;
    }

    if (attr2.length > 0) {
      qtdAttributes++;
      this.config.hasAttribute2 = true;
    }

    if (attr3.length > 0) {
      qtdAttributes++;
      this.config.hasAttribute3 = true;
    }

    this.config.qtdAttributes = qtdAttributes;
  },
  setDisponibility: function () {
    if (this.config.qtdAttributes > 1) {
      if (this.config.hasAttribute1 && this.config.hasAttribute2) {
        for (let i = 0; i < this.config.itemsAttr1.length; i++) {
          const color = this.config.itemsAttr1[i];
          const colorElement = this.config.attr1.find(
            '[data-attribute-value="' + color + '"]'
          );

          let objFind = {};
          let colorAvailable = false;

          objFind[this.config.attr1Name] = color;

          const results = vnda.variants.find(objFind);

          for (let y = 0; y < results.length; y++) {
            if (results[y].available) {
              colorAvailable = true;
            }
          }

          colorElement.data('available', colorAvailable);
          colorElement.attr('data-available', colorAvailable);

          if (colorAvailable) {
            colorElement.removeClass('unavailable');
            colorElement.addClass('available');
          } else {
            colorElement.removeClass('available');
            colorElement.addClass('unavailable');
          }
        }
      }
    }
  },
  toggleOptionsStyle: function (option) {
    const selection = option.data('selecao');
    const styleType = option.data('selecao-style');
    const optionList = option.find('[data-attribute-value]');
    const show = true;
    const showStatusList = [];

    optionList.each(function (index, el) {
      const value = $(el).data('attribute-value');

      if (selection != 'cor') {
        if (value.length > 4) {
          showStatusList[index] = true;
        } else {
          showStatusList[index] = false;
        }
      } else {
        if (value.indexOf('#') < 0) {
          showStatusList[index] = true;
        } else {
          showStatusList[index] = false;
        }
      }
    });

    if (showStatusList.indexOf(true) >= 0) {
      if (styleType == 'input') {
        show = false;
      } else if (styleType == 'dropdown') {
        show = true;
      }
    } else {
      if (styleType == 'input') {
        show = true;
      } else if (styleType == 'dropdown') {
        show = false;
      }
    }

    if (!show) {
      option.addClass('hidden');
    }
  },
  setAttributeValue: function (value, attribute) {
    const attrName = attribute.data('attribute-name');
    const input = attribute.find(
      'input[data-attribute-name="' + attrName + '"]'
    );

    input.val(value);
  },
  setAttributeValueSelected: function (value, attribute) {
    const selected = attribute.find('[data-selected]');
    selected.html(value);
  },
  markFirstOption: function () {
    const attr1 = this.config.attr1;
    const attr2 = this.config.attr2;

    if (
      attr1.find('[data-attribute-value][data-available=true]').first().length >
      0
    ) {
      attr1
        .find('[data-attribute-value][data-available=true]')
        .first()
        .trigger('click');
    } else {
      attr1.find('[data-attribute-value]').first().trigger('click');
    }

    if (
      attr2.find('[data-attribute-value][data-available=true]').first().length >
      0
    ) {
      attr2
        .find('[data-attribute-value][data-available=true]')
        .first()
        .trigger('click');
    } else {
      attr2.find('[data-attribute-value]').first().trigger('click');
    }
  },
  checkFirstAttribute: function () {
    const attributes = this.config.attributes;

    for (let i = 0; i < attributes.length; i++) {
      const obj = {};

      const attribute = attributes[i];
      const attrSize = $('[data-attribute-value="' + attribute + '"]');

      obj[variants.config.attr1Name] = String(attribute);

      const results = vnda.variants.find(obj);
      const available = results.some((el) => el.available);

      if (available) {
        attrSize.data('available', true);
        attrSize.attr('data-available', true);

        attrSize.removeClass('unavailable');
        attrSize.addClass('available');
      } else {
        attrSize.data('available', false);
        attrSize.attr('data-available', false);

        attrSize.removeClass('available');
        attrSize.addClass('unavailable');
      }
    }
  },
  getSkuAttributes: function () {
    let objFind = {};

    if (this.config.hasAttribute1) {
      const nameAttr1 = this.config.attr1Name;
      const valueAttr1 = this.config.attr1
        .find('input[data-attribute-name="' + nameAttr1 + '"]')
        .val();
      objFind[nameAttr1] = valueAttr1;
    }

    if (this.config.hasAttribute2) {
      const nameAttr2 = this.config.attr2Name;
      const valueAttr2 = this.config.attr2
        .find('input[data-attribute-name="' + nameAttr2 + '"]')
        .val();
      objFind[nameAttr2] = valueAttr2;
    }

    if (this.config.hasAttribute3) {
      const nameAttr3 = this.config.attr3Name;
      const valueAttr3 = this.config.attr3
        .find('input[data-attribute-name="' + nameAttr3 + '"]')
        .val();
      objFind[nameAttr3] = valueAttr3;
    }

    objFind = vnda.variants.find(objFind);

    return objFind;
  },
  setResultVariants: function () {
    const objFind = this.getSkuAttributes();

    if (objFind.length > 0) {
      this.wrapperProduct.find('input[name="sku"]').val(objFind[0].sku);

      if ($('[data-form-notify]').length > 0) {
        $('[data-form-notify] input[name="sku"]').val(objFind[0].sku);
      }

      if (!objFind[0].available) {
        this.setProductUnavailable(objFind[0]);
      } else {
        this.setProductAvailable(objFind[0]);
        this.setVariantDisplayedData(objFind[0]);
      }
    } else {
      this.setProductUnavailable(objFind[0]);
    }

    this.setImagesProduct(objFind[0] && objFind[0]?.sku);

    if (objFind.length > 0) {
      this.config.attributes
        .find('[data-variant-selected]')
        .html(objFind[0].name);
    }
  },
  setProductUnavailable: function (atrributes) {
    const button = this.wrapperProduct.find('[data-action="add-cart"]');
    const textUnavailable = button.attr('text-unavailable');
    const amountLeftLabel = $('[data-amount-action] .amount-left-label');

    button.data('available', 'false');
    button.removeClass('available');
    button.addClass('unavailable');
    button.html(textUnavailable || 'produto indisponível');

    amountLeftLabel.attr('style', 'display: none;');

    if (atrributes) {
      this.setFormNotify(atrributes);
    }
  },
  setFormNotify: function (atrributes) {
    const height = $('[data-form-notify]')
      .find('.form-wrapper')
      .outerHeight(true);

    $('[data-form-notify]').addClass('active').css('height', height);

    setTimeout(function () {
      $(document.body).trigger('sticky_kit:recalc');
    }, 500);

    if ($('[data-form-notify]').length > 0) {
      $('[data-form-notify] input[name="sku"]').val(atrributes.sku);
    }
  },
  checkCombinations: function (value, attributeName) {
    if (this.config.attr1Name == attributeName) {
      const sizes = this.config.itemsAttr2;
      const objFind = {};

      objFind[attributeName] = String(value);

      for (let i = 0; i < sizes.length; i++) {
        objFind[this.config.attr2Name] = String(sizes[i]);

        const colorSizeResults = vnda.variants.find(objFind);
        const size = sizes[i];

        const sizeElement = $('[data-attribute-value="' + size + '"]');

        if (colorSizeResults.length > 0) {
          const available = colorSizeResults.some((el) => el.available);

          sizeElement.removeClass('disable');

          if (available) {
            sizeElement.data('available', true);
            sizeElement.attr('data-available', true);

            sizeElement.removeClass('unavailable');
            sizeElement.addClass('available');
          } else {
            sizeElement.data('available', false);
            sizeElement.attr('data-available', false);

            sizeElement.removeClass('available');
            sizeElement.addClass('unavailable');
          }
        } else {
          sizeElement.addClass('disable');
        }
      }
    } else if (this.config.attr2Name == attributeName) {
      const itemsAttr3 = this.config.itemsAttr3;
      const objFind = {};

      objFind[this.config.attr1Name] = String(
        $(`[name="selected-attribute-${this.config.attr1Name}"]`).val()
      );

      objFind[this.config.attr2Name] = String(value);

      for (let i = 0; i < itemsAttr3.length; i++) {
        objFind[this.config.attr3Name] = String(itemsAttr3[i]);
        const allAttrResults = vnda.variants.find(objFind);

        const selected = itemsAttr3[i];
        const attr3El = $('[data-attribute-value="' + selected + '"]');

        if (allAttrResults.length > 0) {
          const variantResult = allAttrResults[0];
          attr3El.removeClass('disable');

          if (variantResult.available) {
            attr3El.data('available', true);
            attr3El.attr('data-available', true);

            attr3El.removeClass('unavailable');
            attr3El.addClass('available');
          } else {
            attr3El.data('available', false);
            attr3El.attr('data-available', false);

            attr3El.removeClass('available');
            attr3El.addClass('unavailable');
          }
        } else {
          attr3El.addClass('disable');
        }
      }
    }
  },
  setProductAvailable: function () {
    const button = this.wrapperProduct.find('[data-action="add-cart"]');
    const textAvailable = button.data('text-available');

    button.data('available', 'true');
    button.removeClass('unavailable');
    button.addClass('available');
    button.html(textAvailable);

    $('[data-form-notify]').removeClass('active').css('height', 0);
  },
  setImagesProduct: function (_sku = '') {
    const mainImages = $('[data-section-product]').find(
      '[data-product-images] [data-main-slider]'
    );
    const thumbsImages = $('[data-section-product]').find(
      '[data-product-images] [data-slider-thumbs]'
    );
    const slideProduct = mainImages[0];
    const imagesWithoutSkus = mainImages.find('[data-skus-image=","]');
    const thumbsWithoutSkus = thumbsImages.find('[data-skus-image=","]');

    mainImages
      .find('[data-image][data-skus-image]')
      .removeClass('active')
      .addClass('inactive');

    thumbsImages
      .find('[data-image-thumb][data-skus-image]')
      .removeClass('active')
      .addClass('inactive');

    mainImages
      .find('[data-image][data-skus-image*="' + _sku + ',"]')
      .addClass('active')
      .removeClass('inactive');

    thumbsImages
      .find('[data-image-thumb][data-skus-image*="' + _sku + ',"]')
      .addClass('active')
      .removeClass('inactive');

    imagesWithoutSkus.removeClass('inactive').addClass('active');
    thumbsWithoutSkus.removeClass('inactive').addClass('active');

    slideProduct.swiper.slideTo(
      $('[data-image-thumb].active').index('[data-image-thumb]:visible')
    );
  },
  execActionAttr: function (attrName) {
    if (this.config.attr1Name == attrName) {
      if (typeof attr1Action == 'function') {
        attr1Action();
      }
    } else if (this.config.attr2Name == attrName) {
      if (typeof attr2Action == 'function') {
        attr2Action();
      }
    }
  },
  attr1Action: function () {
    const attr2 = variants.config.attr2;

    if (
      attr2
        .find('[data-attribute-value][data-available=true]:not(.disable)')
        .first().length > 0
    ) {
      attr2
        .find('[data-attribute-value][data-available=true]:not(.disable)')
        .first()
        .trigger('click');
    } else if (
      attr2.find('[data-attribute-value][data-available=true]').first().length >
      0
    ) {
      attr2
        .find('[data-attribute-value][data-available=true]')
        .first()
        .trigger('click');
    } else {
      attr2.find('[data-attribute-value]').first().trigger('click');
    }
  },
  attr2Action: function () {
    const attr3 = variants.config.attr3;

    if (
      attr3
        .find('[data-attribute-value][data-available=true]:not(.disable)')
        .first().length > 0
    ) {
      attr3
        .find('[data-attribute-value][data-available=true]:not(.disable)')
        .first()
        .trigger('click');
    } else if (
      attr3.find('[data-attribute-value][data-available=true]').first().length >
      0
    ) {
      attr3
        .find('[data-attribute-value][data-available=true]')
        .first()
        .trigger('click');
    } else {
      attr3.find('[data-attribute-value]').first().trigger('click');
    }
  },
  handleVariantClick: function () {
    const functions = this;

    this.config.attributes.on(
      'click',
      '[data-prod-option]:not(.hidden) [data-attribute-value]',
      function (event) {
        if ($(this).is('a')) {
          event.preventDefault();
        }

        const wrapperAttribute = $(this).closest('[data-prod-option]');
        const attrName = wrapperAttribute.data('attribute-name');
        const value = $(this).data('attribute-value');

        functions.setAttributeValue(value, wrapperAttribute);
        functions.setAttributeValueSelected(value, wrapperAttribute);
        functions.checkCombinations(value, attrName);
        functions.execActionAttr(attrName);
        functions.setResultVariants();
      }
    );
  },
  handleVariantAttributesQuantity: function () {
    if (this.qtdAttributes == 0) {
      const variant = vnda.variants.all()[0];

      if (!variant.available) {
        this.setProductUnavailable(variant);
      } else {
        this.setProductAvailable(variant);
      }
    }
  },
  setProductPrice: function ({ price, sale_price, installments }) {
    const discountPercent = Math.round((sale_price * 100) / price);

    const discountPercentElements = $('[data-name-price] .discount-percent');
    for (let i = 0; i < discountPercentElements.length; i++) {
      discountPercentElements[i].innerHTML = `${discountPercent}%`;
    }

    const originalPriceElements = $('[data-name-price] .price-original span');
    for (let i = 0; i < originalPriceElements.length; i++) {
      originalPriceElements[i].innerHTML = formatMoney(price);
    }

    const currentPriceElements = $('[data-name-price] .current-price');
    for (let i = 0; i < currentPriceElements.length; i++) {
      currentPriceElements[i].innerHTML = formatMoney(sale_price);
    }

    for (let i = 0; i < installments.length; i++) {
      const installmentsElements = $(
        `[data-name-price] .installments .installment-${i + 1}`
      );

      for (let j = 0; j < installmentsElements.length; j++) {
        installmentsElements[j].innerHTML = `<span>${
          installments[i].number
        }x ${formatMoney(
          installments[i].price
        )}</span><span>Total: ${formatMoney(installments[i].total)}</span>`;
      }
    }
  },
  setProductQuantity: function ({ available_quantity }) {
    const amountLeftLabel = $('[data-amount-action] .amount-left-label');

    if (available_quantity > 0 && available_quantity <= 5) {
      amountLeftLabel[0].innerHTML = `apenas ${available_quantity} ${
        available_quantity === 1
          ? 'unidade disponível!'
          : 'unidades disponíveis!'
      }`;
      amountLeftLabel.attr('style', 'display: block;');
    } else {
      amountLeftLabel.attr('style', 'display: none;');
    }
  },
  setProductDimensions: function ({ height, width, length, weight }) {
    const dimensions = this.wrapperProduct.find('[data-product-dimensions]');
    const heightP = dimensions.find('.height p.dimension-value');
    const widthP = dimensions.find('.width p.dimension-value');
    const lengthP = dimensions.find('.length p.dimension-value');
    const weightP = dimensions.find('.weight p.dimension-value');

    heightP.html(`${formatValue(height)} cm`);
    widthP.html(`${formatValue(width)} cm`);
    lengthP.html(`${formatValue(length)} cm`);
    weightP.html(`${formatValue(weight)} kg`);
  },
  setVariantDisplayedData: function (variantData) {
    if (variantData) {
      const button = this.wrapperProduct.find('[data-action="add-cart"]');
      const textAvailable = button.attr('text-available');
      button.html(textAvailable || 'adicionar ao carrinho');

      const {
        price,
        sale_price,
        installments,
        available_quantity,
        height,
        width,
        length,
        weight,
      } = variantData;

      this.setProductPrice({ price, sale_price, installments });
      this.setProductQuantity({ available_quantity });
      this.setProductDimensions({ height, width, length, weight });
    }
  },
  init: function () {
    this.handleVariantClick();
    this.handleVariantAttributesQuantity();

    this.setConfigDefault();
    this.setQtdAttributes();
    this.setDisponibility();
    this.checkFirstAttribute();
    this.markFirstOption();
  },
};
