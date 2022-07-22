// ===============================================================
// CART DRAWER
// ===============================================================
export function setCartDrawer() {
  window.addEventListener('load', () => {

    // Seleciona o elemento
    const root = document.querySelector('#component-cart-drawer-root');

    // Inicia o componente
    const componentCartDrawer = new Vnda.Component.CartDrawer({
      version: 'v16',
      display: 'list',
      startOpen: false,
      anchor: 'right',
      freeShipping: false,
      disableShippingCalculation: true,
    });

    // Renderiza o componente
    componentCartDrawer.render(root);

    // Adiciona o evento de abertura
    let open = document.querySelector('[data-toggle-cart]');
    if (open) open.addEventListener('click', componentCartDrawer.toggle);

    // Adiciona o componente ao escopo global
    window.componentCartDrawer = componentCartDrawer;

  });
}

// ===============================================================
// NEWSLETTER POPUP
// ===============================================================
export function setNewsletterPopup() {
  window.addEventListener('load', () => {

    // Seleciona o elemento
    const root = document.querySelector('#component-popup-newsletter-root');
    if (window.data_popup){
      // Define propriedades do componente
      let maxWidth = window.data_popup.maxWidth;
      let imageUrl = window.data_popup.imageUrl;
      let title = window.data_popup.title;
      let description = window.data_popup.description;
      let subdomain = window.data_popup.subdomain;
      let successMessage = window.data_popup.success;

      // Inicia o componente
      const componentNewsletterPopup = new Vnda.Component.NewsletterPopup({
        maxWidth: maxWidth,
        maxHeight: 500,
        imageUrl: imageUrl,
        imagePosition: 'left',
        popupPosition: 'center',
        title: title,
        description: description,
        textBtnSubmit: 'Enviar',
        classBtnSubmit: 'btn-newsletter',
        formKey: `${subdomain}-newsletter`,
        hasNameField: false,
        hasLastNameField: false,
        hasDateOfBirthField: false,
        hasPhoneField: false,
        successMessage: successMessage,
        delay: 500,
        frequency: '7',
        language: 'pt-BR'
      }); 

      // Renderiza o componente
      componentNewsletterPopup.render(root);
    }
  });
}

// ===============================================================
// FILTROS
// ===============================================================
export function setFilters() {
  window.addEventListener('load', () => {

    // Seleciona o elemento
    const root = document.querySelector('#component-products-filter-vertical-root');

    // Define filtros de categoria
    let tags = aggregations.types.categoria && [{
      title: "Categoria",
      type: "categoria",
      style: "list",
      options: aggregations.types.categoria
    }];

    // Define filtros do primeiro atributo
    let property1 = aggregations.properties.property1.length > 0 && {
      title: "Cor",
      property: "property1",
      style: "colors",
      colorsProps: {
        showTitle: true,
        showColor: true,
      },
      options: aggregations.properties.property1,
    };

    // Define filtros do segundo atributo
    let property2 = aggregations.properties.property2.length > 0 && {
      title: "Tamanho",
      property: "property2",
      style: "list",
      options: aggregations.properties.property2,
      gridProps: {
        columns: 4, 
      },
    };

    // Define filtros do terceiro atributo
    // let property3 = aggregations.properties.property3.length > 0 && {
    //   title: "Tecido",
    //   property: "property3",
    //   style: "list",
    //   options: aggregations.properties.property3,
    // };

    // Inicia o componente
    const componentFilters = new Vnda.Component.ProductsFilter({
      mode: "vertical",
      hasSort: true,
      filterOnClick: false,
      resetMode: "all",
      // tags type "categoria"
      tags: tags,
      // properties
      properties: [
        property1,
        property2,
        // property3,
      ],
      // price
      price: [aggregations.min_price, aggregations.max_price],
    });
    
    // Renderiza o componente
    componentFilters.render(root);

  });
}

// ===============================================================
// LOGIN
// ===============================================================
export function setLogin() {
  window.addEventListener('load', () => {

    // Seleciona o elemento
    const root = document.querySelector('#component-login-static-root');

    // Define link para o Facebook
    let facebook_connect_url = root.getAttribute('data-facebook');

    // Inicia o componente
    window.componentLogin = {}
    window.componentLogin['static'] = new Vnda.Component.Login({
      mode: 'static',
      formProps: {
        login: {
          buttons: {
            facebook: {
              link: facebook_connect_url,
            },
          },
          hasFacebook: false
        },
        register: {
          buttons: {
            facebook: {
              link: facebook_connect_url,
            },
          },
          hasFacebook: false
        }
      }
    });
    
    // Renderiza o componente
    componentLogin['static'].render(root);

  });
}
