var statesInfo = [
  {
    name: 'Acre',
    value: 'AC',
    count: 0,
  },
  {
    name: 'Alagoas',
    value: 'AL',
    count: 0,
  },
  {
    name: 'Amazonas',
    value: 'AM',
    count: 0,
  },
  {
    name: 'Amapá',
    value: 'AP',
    count: 0,
  },
  {
    name: 'Bahia',
    value: 'BA',
    count: 0,
  },
  {
    name: 'Ceará',
    value: 'CE',
    count: 0,
  },
  {
    name: 'Distrito Federal',
    value: 'DF',
    count: 0,
  },
  {
    name: 'Espírito Santo',
    value: 'ES',
    count: 0,
  },
  {
    name: 'Goiás',
    value: 'GO',
    count: 0,
  },
  {
    name: 'Maranhão',
    value: 'MA',
    count: 0,
  },
  {
    name: 'Minas Gerais',
    value: 'MG',
    count: 0,
  },
  {
    name: 'Mato Grosso do Sul',
    value: 'MS',
    count: 0,
  },
  {
    name: 'Mato Grosso',
    value: 'MT',
    count: 0,
  },
  {
    name: 'Pará',
    value: 'PA',
    count: 0,
  },
  {
    name: 'Paraíba',
    value: 'PB',
    count: 0,
  },
  {
    name: 'Pernambuco',
    value: 'PE',
    count: 0,
  },
  {
    name: 'Piauí',
    value: 'PI',
    count: 0,
  },
  {
    name: 'Paraná',
    value: 'PR',
    count: 0,
  },
  {
    name: 'Rio de Janeiro',
    value: 'RJ',
    count: 0,
  },
  {
    name: 'Rio Grande do Norte',
    value: 'RN',
    count: 0,
  },
  {
    name: 'Rondônia',
    value: 'RO',
    count: 0,
  },
  {
    name: 'Roraima',
    value: 'RR',
    count: 0,
  },
  {
    name: 'Rio Grande do Sul',
    value: 'RS',
    count: 0,
  },
  {
    name: 'Santa Catarina',
    value: 'SC',
    count: 0,
  },
  {
    name: 'Sergipe',
    value: 'SE',
    count: 0,
  },
  {
    name: 'São Paulo',
    value: 'SP',
    count: 0,
  },
  {
    name: 'Tocantins',
    value: 'TO',
    count: 0,
  },
];

var whereToFind = {
  mapsApikey: 'AIzaSyB-FO3nhGeLqsNbe1xzwAp6AIXpTdXvVEw',
  places: [],
  states: {},
  cities: {},
  getPlaces: function (_callback) {
    const _THIS = this;

    $.ajax({
      url: '/locais',
      type: 'GET',
      dataType: 'json',
      beforeSend: function () {
        $('.results').addClass('adding');
      },
    })
      .done(function (_places) {
        if (typeof _callback == 'function') {
          _callback(_places);
        }
      })
      .fail(function (_) {})
      .always(function () {
        $('.results').removeClass('adding');
      });
  },
  init: function () {
    whereToFind.getPlaces(function (_places) {
      whereToFind.places = _places;
      vueInit();
    });
  },
};

function vueInit() {
  var app = new Vue({
    el: '#app',
    delimiters: ['<%', '%>'],
    data: {
      places: [],
      states: [],
      stateResults: [],
      cities: [],
      citiesResults: [],
      displayedData: [],
      onlineStores: [],
      stateSelected: '',
      citySelected: '',
    },
    methods: {
      fetchData: function (_places, _states) {
        /* Recebe os dados e passa para o app */
        this.$data.places = _places;
        this.$data.states = _states;
      },
      fetchOnlineStores: function () {
        /* Itera sobre as places para identificar quais são lojas online. Se o item for uma loja online, é salvo em outro array,
           e depois é guardada a posição dele no array placesToRemove para posterior remoção do array de places, com a função removeFromArray */
        var _this = this.$data;
        var placesToRemove = [];

        _this.places.forEach(function (place, index) {
          if (place.categories[0] === 'loja-online') {
            placesToRemove.push(index);
            _this.onlineStores.push(place);
          }
        });

        this.removeFromArray(_this.places, placesToRemove);
      },
      removeNullStates: function () {
        /* Itera sobre as places para identificar a quais estados pertence cada item. Para isso, é utilizada a função stateIncrementer, que é responsável
           por incrementar a contagem dos estados no array de states. Após isso, é verificado quais estados possuem 0 places, e são guardados os índices
           para remoção com a função removeFromArray */
        var _this = this;
        var statesToRemove = [];

        _this.$data.places.forEach(function (place) {
          _this.stateIncrementer(place.state.trim());
        });

        _this.states.forEach(function (state, index) {
          if (state.count === 0) {
            statesToRemove.push(index);
          }
        });

        this.removeFromArray(_this.states, statesToRemove);
      },
      stateIncrementer: function (state) {
        /* Função utilitária. Recebe a sigla do estado e é responsável por incrementar corretamente a contagem de estados no array states */
        var states = this.$data.states;

        switch (state) {
          case 'AC':
            return states[0].count++;
            break;
          case 'AL':
            return states[1].count++;
            break;
          case 'AM':
            return states[2].count++;
            break;
          case 'AP':
            return states[3].count++;
            break;
          case 'BA':
            return states[4].count++;
            break;
          case 'CE':
            return states[5].count++;
            break;
          case 'DF':
            return states[6].count++;
            break;
          case 'ES':
            return states[7].count++;
            break;
          case 'GO':
            return states[8].count++;
            break;
          case 'MA':
            return states[9].count++;
            break;
          case 'MG':
            return states[10].count++;
            break;
          case 'MS':
            return states[11].count++;
            break;
          case 'MT':
            return states[12].count++;
            break;
          case 'PA':
            return states[13].count++;
            break;
          case 'PB':
            return states[14].count++;
            break;
          case 'PE':
            return states[15].count++;
            break;
          case 'PI':
            return states[16].count++;
            break;
          case 'PR':
            return states[17].count++;
            break;
          case 'RJ':
            return states[18].count++;
            break;
          case 'RN':
            return states[19].count++;
            break;
          case 'RO':
            return states[20].count++;
            break;
          case 'RR':
            return states[21].count++;
            break;
          case 'RS':
            return states[22].count++;
            break;
          case 'SC':
            return states[23].count++;
            break;
          case 'SE':
            return states[24].count++;
            break;
          case 'SP':
            return states[25].count++;
            break;
          case 'TO':
            return states[26].count++;
            break;
        }
      },
      removeFromArray: function (arrayToRemove, indexesToRemove) {
        /* Função utilitária. Recebe um array para realizar remoções e um array de index com as posições a serem removidas */
        for (var i = indexesToRemove.length - 1; i >= 0; i--)
          arrayToRemove.splice(indexesToRemove[i], 1);
      },
      filterStates: function () {
        /* Filtra array de places conforme o estado que está selecionado (stateSelected). Os resultados são colocados no array stateResults,
        e a variável displayedData é atualizada. Ela é a responsável por mostrar os resultados na view */
        var self = this.$data;
        self.stateResults = self.places.filter(function (place) {
          return place['state'] === self.stateSelected;
        });
        self.displayedData = self.stateResults;

        /* Filtra array de resultados da filtragem anterior, para atualizar o array de cidades relativos a aqueles estados */
        self.citiesResults = [];
        self.cities = [];
        self.stateResults.forEach(function (result) {
          self.citiesResults.push(result);
          if (self.cities.indexOf(result.city) == -1) {
            self.cities.push(result.city);
          }
        });
      },
      filterCities: function () {
        /* Filtra array stateResults conforme a cidade que estiver selecionada (citySelected). O resultado da filtragem é colocado na variável displayedData */
        var self = this.$data;
        self.citiesResults = self.stateResults.filter(function (place) {
          return place['city'] === self.citySelected;
        });
        self.displayedData = self.citiesResults;
      },
    },
    mounted: function () {
      this.fetchData(whereToFind.places, statesInfo); // passa o array de places e estados para o app
      this.removeNullStates(); // remove estados do array que não possuírem nenhuma loja relacionada
      this.fetchOnlineStores(); // separa as lojas online do array principal
      this.$el.classList.add('loaded'); // após executar as operações nos arays, deixa o app visível
    },
  });
}

$(function () {
  whereToFind.init();
});
