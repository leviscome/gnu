const captureWebsite = require('../cadastros/node_modules/capture-website');

const options = {
  fullPage: true,
  overwrite: true,
  timeout: 25,
  delay: 10,
  scaleFactor: 1,
  disableAnimations: true,
  hideElements: ['[data-popup-newsletter]'],
  preloadFunction: 'setTimeout(() => lazyLoadInstance.loadAll(), 2000)',
  launchOptions: {
		args: [
			'--no-sandbox',
			'--disable-setuid-sandbox'
		]
	}
};

const storeUrl = 'https://basictemplate.vnda.dev/';

const items = [
  [storeUrl, '01-geral'],
  [storeUrl, '02-home'],
  [storeUrl + 'categoria-exemplo', '03-tag'],
  [storeUrl + 'produto/produto-exemplo-nao-excluir-6', '04-produto'],
  [storeUrl + 'p/sobre', '05-sobre'],
  [storeUrl + 'p/atendimento', '06-atendimento'],
  [storeUrl + 'p/onde-encontrar', '07-onde-encontrar'],
  [storeUrl + 'p/pagina-padrao', '08-default']
];

(async () => {
  await Promise.all(items.map(([url, filename]) => {
    return captureWebsite.file(url, `./assets/images/prints/${filename}.png`, options);
  }));
})();
