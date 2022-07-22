export const formatMoney = function (value = '') {
  return (
    'R$ ' +
    value
      .toFixed(2)
      .replace('.', ',')
      .replace(/(\d)(?=(\d{3})+\,)/g, '$1.')
  );
};

export const formatValue = function (value = '') {
  let parsedValue = value;
  if (typeof value === 'number') {
    parsedValue = value.toString();
  }
  return parsedValue.replace('.', ',');
};
