let app = null;

const parseRelationURL = (row, attributeName, urlDestinationName) => {
  if (row[attributeName] && row[attributeName].length > 0) {
    row[attributeName] = row[attributeName].split(',');
    row[attributeName].forEach((item, index, array) => {
      array[index] = `${app.config.constants.SWAPI_URL}${urlDestinationName}/${item}`;
    });
    row[attributeName] = row[attributeName].join(' - ');
  }
};

module.exports = function utilsService(application) {
  app = application;
  return {
    parseRelationURL,
  };
};
